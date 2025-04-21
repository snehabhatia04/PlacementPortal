package controller

import (
	"Placement-Portal/pkg/client"
	"Placement-Portal/pkg/middleware"
	"Placement-Portal/portal_service/repository"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

// FacultyController struct
type FacultyController struct {
    repo             *repository.FacultyRepository
    StudentClient    *client.StudentClient
    CompanyClient    *client.CompanyClient
    DepartmentClient *client.DepartmentClient
}

// NewFacultyController initializes FacultyController with clients
func NewFacultyController(repo *repository.FacultyRepository, studentClient *client.StudentClient, companyClient *client.CompanyClient, departmentClient *client.DepartmentClient) *FacultyController {
    return &FacultyController{
        repo:             repo,
        StudentClient:    studentClient,
        CompanyClient:    companyClient,
        DepartmentClient: departmentClient,
    }
}

// GetStudentByRegNoHandler - Faculty fetches a student by Registration Number (Read Access)
func (fc *FacultyController) GetStudentByRegNoHandler(c *gin.Context) {
    regNo := c.Param("regNo")
    if regNo == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Registration number is required"})
        return
    }

    student, err := fc.StudentClient.GetStudentByRegNo(regNo)
    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Student not found"})
        return
    }

    c.JSON(http.StatusOK, student)
}

// GetCompanyByNameHandler - Faculty fetches a company by Name (Read Access)
func (fc *FacultyController) GetCompanyByNameHandler(c *gin.Context) {
    name := c.Param("name")
    if name == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Company name is required"})
        return
    }

    company, err := fc.CompanyClient.GetCompanyByName(name)
    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Company not found"})
        return
    }

    c.JSON(http.StatusOK, company)
}

func (fc *FacultyController) GetAllStudentsHandler(c *gin.Context) {
    departmentVal, exists := c.Get("department")
    if !exists {
        log.Println("Department not found in context, defaulting to 'admin'")
        departmentVal = "admin"
    }

    department := departmentVal.(string)
    log.Println("Faculty fetching students from department:", department)

    students, err := fc.StudentClient.GetAllStudents(department)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch students"})
        return
    }

    c.JSON(http.StatusOK, students)
}


// GetAllCompaniesHandler - Faculty fetches all companies (Read Access)
func (fc *FacultyController) GetAllCompaniesHandler(c *gin.Context) {
    companies, err := fc.CompanyClient.GetAllCompanies()
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch companies"})
        return
    }

    c.JSON(http.StatusOK, companies)
}

// GetAllDepartmentsHandler - Faculty fetches all departments (Read Access)
func (fc *FacultyController) GetAllDepartmentsHandler(c *gin.Context) {
    departments, err := fc.DepartmentClient.GetAllDepartments() // Fetch departments
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch departments"})
        return
    }

    c.JSON(http.StatusOK, departments) // Return departments as JSON response
}


// LoginFacultyHandler handles faculty authentication
func (fc *FacultyController) LoginFacultyHandler(c *gin.Context) {
	var input struct {
		Email    string `json:"email" binding:"required,email"`
		Password string `json:"password" binding:"required,min=6"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	faculty, err := fc.repo.GetFacultyByEmail(input.Email)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(faculty.PasswordHash), []byte(input.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":    faculty.ID,
		"email": faculty.Email,
		"role":  "faculty",
		"exp":   time.Now().Add(time.Hour * 24).Unix(), // Token expires in 1 day
	})

	tokenString, err := token.SignedString([]byte("your_secret_key"))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Login successful",
		"token":   tokenString,
	})
}

// LogoutFacultyHandler invalidates the faculty's token
func (fc *FacultyController) LogoutFacultyHandler(c *gin.Context) { 
    tokenString := c.GetHeader("Authorization")
    if tokenString == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "No token provided"})
        return
    }

    middleware.BlacklistToken(tokenString)
    c.JSON(http.StatusOK, gin.H{"message": "Faculty logged out successfully"})
}
