package controller

import (
	"Placement-Portal/pkg/client"
	"Placement-Portal/pkg/middleware"
	"Placement-Portal/pkg/model"
	"Placement-Portal/portal_service/config"
	"Placement-Portal/portal_service/repository"
	"fmt"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

// AdminController struct
type AdminController struct {
    AdminRepo *repository.AdminRepository
    StudentClient *client.StudentClient
    CompanyClient *client.CompanyClient
    DepartmentClient *client.DepartmentClient
    }
    
    // NewAdminController initializes AdminController with repository and clients
func NewAdminController(adminRepo *repository.AdminRepository, studentClient *client.StudentClient, companyClient *client.CompanyClient, departmentClient *client.DepartmentClient) *AdminController {
    return &AdminController{
        AdminRepo:        adminRepo,
        StudentClient:    studentClient,
        CompanyClient:    companyClient,
        DepartmentClient: departmentClient,
        }
    }
    

// CreateStudentHandler - Admin can create a student
func (ac *AdminController) CreateStudentHandler(c *gin.Context) {
    var student model.Student
    if err := c.ShouldBindJSON(&student); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
        return
    }


    if err := ac.StudentClient.CreateStudent(&student); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create student"})
        return
    }

    c.JSON(http.StatusCreated, gin.H{"message": "Student created successfully"})
}

// CreateCompanyHandler - Admin can create a company
func (ac *AdminController) CreateCompanyHandler(c *gin.Context) {
    var company model.Company
    if err := c.ShouldBindJSON(&company); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
        return
    }

    if err := ac.CompanyClient.CreateCompany(&company); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create company"})
        return
    }

    c.JSON(http.StatusCreated, gin.H{"message": "Company created successfully"})
}

// GetStudentByRegNoHandler - Admin fetches a student by Registration Number
func (ac *AdminController) GetStudentByRegNoHandler(c *gin.Context) {
    regNo := c.Param("regNo")
    if regNo == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Registration number is required"})
        return
    }

    student, err := ac.StudentClient.GetStudentByRegNo(regNo)
    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Student not found"})
        return
    }

    c.JSON(http.StatusOK, student)
}

// GetCompanyByNameHandler - Admin fetches a company by Name
func (ac *AdminController) GetCompanyByNameHandler(c *gin.Context) {
    name := c.Param("name")
    if name == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Company name is required"})
        return
    }

    company, err := ac.CompanyClient.GetCompanyByName(name)
    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Company not found"})
        return
    }

    c.JSON(http.StatusOK, company)
}

func (ac *AdminController) GetAllStudentsHandler(c *gin.Context) {
    log.Println("Inside GetAllStudentsHandler")
    departmentRaw, exists := c.Get("department")
    department := "admin"
    if exists {
        if depStr, ok := departmentRaw.(string); ok && depStr != "" {
            department = depStr
        }
    }
    log.Println("Using Department:", department)

    students, err := ac.StudentClient.GetAllStudents(department)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch students"})
        return
    }

    c.JSON(http.StatusOK, students)
}

// GetAllCompaniesHandler - Admin fetches all companies
func (ac *AdminController) GetAllCompaniesHandler(c *gin.Context) {
    companies, err := ac.CompanyClient.GetAllCompanies()
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch companies"})
        return
    }

    c.JSON(http.StatusOK, companies)
}

// GetAllDepartmentsHandler - Admin fetches all departments
func (ac *AdminController) GetAllDepartmentsHandler(c *gin.Context) {
    departments, err := ac.DepartmentClient.GetAllDepartments() // Fetch departments
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch departments"})
        return
    }

    c.JSON(http.StatusOK, departments) // Return departments as JSON response
}

// UpdateStudentHandler - Admin updates student details
func (ac *AdminController) UpdateStudentHandler(c *gin.Context) {
    var input struct {
        Name      *string        `json:"name"`
        Mail      *string        `json:"mail"`
        Dept      *string        `json:"dept"`
        Offers    *[]model.Offer `json:"offers"`
    }

    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
        return
    }

    regNo := c.Query("reg_no")
    if regNo == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Registration number is required"})
        return
    }

    // Fetch existing student
    student, err := ac.StudentClient.GetStudentByRegNo(regNo)
    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Student not found"})
        return
    }

    // Update fields if provided
    if input.Name != nil {
        student.Name = *input.Name
    }
    if input.Mail != nil {
        student.Email = *input.Mail
    }
    if input.Dept != nil {
        student.Department = *input.Dept
    }
    if input.Offers != nil {
        student.Offers = *input.Offers

        // Optionally: Update company_student table too
        for _, offer := range student.Offers {
            cs := model.CompanyStudent{
                CompanyName: offer.Company,
                RegNo:       student.RegNo,
                StudentName: student.Name,
                Email:       student.Email,
                Stipend:     offer.Stipend,
                PPO:         offer.PPO,
                PPO_I:       offer.PPOI,
                I:           offer.I,
                Department:  student.Department,
            }

            // Save offer in company_student table
            err := ac.StudentClient.SaveCompanyStudent(cs)
            if err != nil {
                c.JSON(http.StatusInternalServerError, gin.H{
                    "error": fmt.Sprintf("Failed to update offer for company: %s", offer.Company),
                })
                return
            }
        }
    }

    // Update student in main student table
    err = ac.StudentClient.UpdateStudent(*student)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update student"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Student updated successfully"})
}


// DeleteCompanyHandler - Admin deletes a company
func (ac *AdminController) DeleteCompanyHandler(c *gin.Context) {
    name := c.Param("name")
    if name == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Company name is required"})
        return
    }

    if err := ac.CompanyClient.DeleteCompany(name); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete company"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Company deleted successfully"})
}

func (ac *AdminController) DeleteStudentHandler(c *gin.Context) {
    regNo := c.Param("reg_no")

    if regNo == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "registration number is required"})
        return
    }

    err := ac.StudentClient.DeleteStudent(regNo)
    if err != nil {
        log.Println("Failed to delete student:", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to delete student"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Student deleted successfully"})
}

// LoginAdminHandler handles admin authentication
func (ac *AdminController) LoginAdminHandler(c *gin.Context) {
    var input struct {
        Email    string `json:"email" binding:"required,email"`
        Password string `json:"password" binding:"required,min=6"`
    }

    if err := c.ShouldBindJSON(&input); err != nil {
        fmt.Println("Binding error:", err)
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
        return
    }

    fmt.Println("Incoming Email:", input.Email)
    fmt.Println("Incoming Password:", input.Password)

    admin, err := ac.AdminRepo.GetAdminByEmail(input.Email)
    if err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
        return
    }

    if err := bcrypt.CompareHashAndPassword([]byte(admin.PasswordHash), []byte(input.Password)); err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
        return
    }

    cfg, _ := config.LoadConfig()
    role := "admin"

    claims := jwt.MapClaims{
        "id":    admin.ID,
        "email": admin.Email,
        "role":  role,
        "exp":   time.Now().Add(time.Hour * 24).Unix(), // 1-day expiration
    }

    // Ensure Dept is always present and non-empty
    dept := strings.TrimSpace(admin.Dept)
    if dept != "" {
        claims["dept"] = dept
        log.Println("Dept set in claims from DB:", dept)
    } else if role == "admin" {
        claims["dept"] = "admin"
        log.Println("Dept defaulted to 'admin' for admin role")
    } else {
        log.Println("Dept is missing for faculty!")
    }

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    tokenString, err := token.SignedString([]byte(cfg.JwtSecretKey))
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
        return
    }

    c.JSON(http.StatusOK, gin.H{
        "message": "Login successful",
        "token":   tokenString,
    })

    log.Println("Admin Dept from DB:", admin.Dept)
}

// LogoutAdminHandler invalidates the admin's token
func (ac *AdminController) LogoutAdminHandler(c *gin.Context) { 
    tokenString := c.GetHeader("Authorization")
    if tokenString == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "No token provided"})
        return
    }

    middleware.BlacklistToken(tokenString)
    c.JSON(http.StatusOK, gin.H{"message": "Admin logged out successfully"})
}
