package controller

import (
	"Placement-Portal/pkg/model"
	"Placement-Portal/portal_service/config"
	"Placement-Portal/portal_service/repository"
	"math/rand"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

// UserController struct
type UserController struct {
    UserRepo *repository.UserRepository
}

// NewUserController initializes UserController
func NewUserController(userRepo *repository.UserRepository) *UserController {
    return &UserController{UserRepo: userRepo}
}

// GenerateRandomPassword creates a random 8-char alphanumeric password
func GenerateRandomPassword() string {
    charset := "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    b := make([]byte, 8)
    for i := range b {
        b[i] = charset[rand.Intn(len(charset))]
    }
    return string(b)
}

// CreateUserHandler - only Admin can create users and assign roles
func (uc *UserController) CreateUserHandler(c *gin.Context) {
    roleFromToken := c.GetString("role")
    if roleFromToken != "admin" {
        c.JSON(http.StatusForbidden, gin.H{"error": "Only admin can create users"})
        return
    }

    var user model.User
    if err := c.ShouldBindJSON(&user); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
        return
    }

    var password string
    // if password provided in body, use it — else generate one
    if user.PasswordHash != "" {
        password = user.PasswordHash
    } else {
        password = GenerateRandomPassword()
    }

    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
        return
    }
    user.PasswordHash = string(hashedPassword)

    // Set default status
    user.Status = "reset_required"

    // Create user
    id, err := uc.UserRepo.CreateUser(user)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
        return
    }

    c.JSON(http.StatusCreated, gin.H{
        "message":        "User created successfully",
        "user_id":        id,
        "generated_pass": password, // whatever was used (provided / generated)
    })
}

// LoginUserHandler - all users login by email-password
func (uc *UserController) LoginUserHandler(c *gin.Context) {
    var input struct {
        Email    string `json:"email" binding:"required,email"`
        Password string `json:"password" binding:"required,min=6"`
    }

    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
        return
    }

    user, err := uc.UserRepo.GetUserByEmail(input.Email)
    if err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
        return
    }

    if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(input.Password)); err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
        return
    }

    cfg, _ := config.LoadConfig()

    claims := jwt.MapClaims{
        "id":         user.ID,
        "email":      user.Email,
        "role":       user.Role,
        "session_id": user.SessionID,  // direct assignment here
        "exp":        time.Now().Add(time.Hour * 24).Unix(),
    }

    if user.Department != nil {
        claims["department"] = *user.Department
    }

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    tokenString, _ := token.SignedString([]byte(cfg.JwtSecretKey))

    c.JSON(http.StatusOK, gin.H{
        "message": "Login successful",
        "token":   tokenString,
        "status":  user.Status,
    })
}


// ResetPasswordHandler - allows user to reset their password
func (uc *UserController) ResetPasswordHandler(c *gin.Context) {
    var input struct {
        Email       string `json:"email" binding:"required,email"`
        OldPassword string `json:"old_password" binding:"required"`
        NewPassword string `json:"new_password" binding:"required,min=6"`
    }

    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
        return
    }

    user, err := uc.UserRepo.GetUserByEmail(input.Email)
    if err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
        return
    }

    // Verify old password
    if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(input.OldPassword)); err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Old password incorrect"})
        return
    }

    // Hash new password
    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.NewPassword), bcrypt.DefaultCost)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash new password"})
        return
    }

    // Update password and status
    err = uc.UserRepo.UpdatePasswordAndStatus(user.ID, string(hashedPassword), "active")
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update password"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Password reset successful. You can now login."})
}

// GetAllUsersHandler - admin only
func (uc *UserController) GetAllUsersHandler(c *gin.Context) {
    if c.GetString("role") != "admin" {
        c.JSON(http.StatusForbidden, gin.H{"error": "Only admin can view all users"})
        return
    }

    users, err := uc.UserRepo.GetAllUsers()
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch users"})
        return
    }

    c.JSON(http.StatusOK, users)
}

