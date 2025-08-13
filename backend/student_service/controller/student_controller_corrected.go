package controller

import (
	"Placement-Portal/pkg/model"
	"Placement-Portal/student_service/repository"
	"errors"
	"log"
	"net/http"
	"regexp"
	"sort"
	"strings"

	"github.com/gin-gonic/gin"
)

// StudentController struct
type StudentController struct {
    Repo     *repository.StudentRepository
    DeptRepo *repository.DepartmentRepository
}

// NewStudentController creates a new instance of StudentController
func NewStudentController(repo *repository.StudentRepository, deptRepo *repository.DepartmentRepository) *StudentController {
    return &StudentController{Repo: repo, DeptRepo: deptRepo}
}

// Department validation helper
func (sc *StudentController) validateDepartmentExists(ctx *gin.Context, department string) error {
    if department == "" {
        return errors.New("department is required")
    }

    departments, err := sc.DeptRepo.GetAllDepartments(ctx.Request.Context())
    if err != nil {
        return errors.New("failed to fetch valid departments")
    }

    for _, dept := range departments {
        if strings.EqualFold(strings.TrimSpace(dept.Name), strings.TrimSpace(department)) {
            return nil
        }
    }

    return errors.New("invalid department provided")
}

// GetAllStudentsHandler handles fetching all students
func (sc *StudentController) GetAllStudentsHandler(c *gin.Context) {
    department, exists := c.Get("department")
    deptStr := "admin"
    
    if exists {
        if d, ok := department.(string); ok && d != "" {
            deptStr = strings.ToLower(strings.TrimSpace(d))
        }
    }

    students, err := sc.Repo.GetAllStudents(c.Request.Context(), deptStr)
    if err != nil {
        log.Printf("Failed to fetch students: %v", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch students"})
        return
    }

    c.JSON(http.StatusOK, students)
}

// CreateStudentHandler handles creating a new student
func (sc *StudentController) CreateStudentHandler(c *gin.Context) {
    var student model.Student

    if err := c.ShouldBindJSON(&student); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
        return
    }

    // Validate department
    if err := sc.validateDepartmentExists(c, student.Department); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // Validate student data
    if err := validateStudent(student); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    if err := sc.Repo.CreateStudent(c.Request.Context(), &student); err != nil {
        log.Printf("Failed to create student: %v", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create student"})
        return
    }

    c.JSON(http.StatusCreated, gin.H{"message": "Student created successfully"})
}

// GetStudentsByDepartment handles GET /students/department?dept=CSE
func (sc *StudentController) GetStudentsByDepartment(c *gin.Context) {
    dept := strings.TrimSpace(c.Query("dept"))
    filter := strings.ToLower(strings.TrimSpace(c.Query("filter")))

    if dept == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Department is required"})
        return
    }

    // Normalize department
    normalizedDept := strings.ToUpper(dept)
    if normalizedDept == "ALL" {
        normalizedDept = "admin"
    }

    students, err := sc.Repo.GetStudentsByDepartment(c.Request.Context(), normalizedDept)
    if err != nil {
        log.Printf("Failed to fetch students by department: %v", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch students"})
        return
    }

    // Apply filters
    switch filter {
    case "stipend":
        students = sortByMaxStipend(students)
    case "placed":
        students = filterPlaced(students)
    case "notplaced":
        students = filterNotPlaced(students)
    }

    c.JSON(http.StatusOK, students)
}

// validateStudent applies business rules for a student
func validateStudent(student model.Student) error {
    if student.RegNo == "" {
        return errors.New("registration number cannot be empty")
    }

    if len(student.RegNo) != 9 {
        return errors.New("registration number must be exactly 9 characters")
    }

    if student.Name == "" {
        return errors.New("student name cannot be empty")
    }

    if len(student.Name) < 3 {
        return errors.New("student name must be at least 3 characters long")
    }

    if student.Email == "" {
        return errors.New("email cannot be empty")
    }

    if !isValidEmail(student.Email) {
        return errors.New("invalid email format")
    }

    if student.Department == "" {
        return errors.New("department cannot be empty")
    }

    if len(student.Offers) > 3 {
        return errors.New("a student cannot have more than 3 offers")
    }

    for _, offer := range student.Offers {
        if offer.Company == "" {
            return errors.New("each offer must have a company name")
        }
        if offer.Stipend < 0 {
            return errors.New("stipend cannot be negative")
        }
    }

    return nil
}

// Helper function to validate email format
func isValidEmail(email string) bool {
    re := regexp.MustCompile(`^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$`)
    return re.MatchString(email)
}

// Sorting and filtering functions
func sortByMaxStipend(students []model.Student) []model.Student {
    sort.SliceStable(students, func(i, j int) bool {
        return maxStipend(students[i].Offers) > maxStipend(students[j].Offers)
    })
    return students
}

func maxStipend(offers []model.Offer) float64 {
    max := 0.0
    for _, o := range offers {
        if o.Stipend > max {
            max = o.Stipend
        }
    }
    return max
}

func filterPlaced(students []model.Student) []model.Student {
    var placed []model.Student
    for _, s := range students {
        for _, o := range s.Offers {
            if o.PPO || o.PPOI {
                placed = append(placed, s)
                break
            }
        }
    }
    return placed
}

func filterNotPlaced(students []model.Student) []model.Student {
    var notPlaced []model.Student
    for _, s := range students {
        placed := false
        for _, o := range s.Offers {
            if o.PPO || o.PPOI {
                placed = true
                break
            }
        }
        if !placed {
            notPlaced = append(notPlaced, s)
        }
    }
    return notPlaced
}

// Additional handlers...
func (sc *StudentController) GetStudentByRegNoHandler(c *gin.Context) {
    regNo := c.Param("reg_no")
    if regNo == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Registration number is required"})
        return
    }

    student, err := sc.Repo.GetStudentByRegNo(c.Request.Context(), regNo)
    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Student not found"})
        return
    }

    c.JSON(http.StatusOK, student)
}

func (sc *StudentController) UpdateStudentHandler(c *gin.Context) {
    var student model.Student
    if err := c.ShouldBindJSON(&student); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
        return
    }

    if err := validateStudent(student); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    if err := sc.Repo.UpdateStudent(c.Request.Context(), &student); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update student"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Student updated successfully"})
}

func (sc *StudentController) DeleteStudentHandler(c *gin.Context) {
    regNo := c.Param("reg_no")
    if regNo == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Registration number is required"})
        return
    }

    if err := sc.Repo.DeleteStudent(c.Request.Context(), regNo); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete student"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Student deleted successfully"})
}
