package controller

import (
	"placementportal/backend/pkg/model"
	"placementportal/backend/student_service/repository"

	"errors"
	"log"
	"net/http"
	"regexp"
	"sort"
	"strings"

	"github.com/gin-gonic/gin"
)

type StudentController struct {
	Repo     *repository.StudentRepository
	DeptRepo *repository.DepartmentRepository
}

func NewStudentController(repo *repository.StudentRepository, deptRepo *repository.DepartmentRepository) *StudentController {
	return &StudentController{Repo: repo, DeptRepo: deptRepo}
}

func (sc *StudentController) GetAllStudentsHandler(c *gin.Context) {
	department, exists := c.Get("department")
	deptStr := "admin"
	if exists {
		if d, ok := department.(string); ok && d != "" {
			deptStr = d
		}
	}
	log.Println("Using Department:", deptStr)
	students, err := sc.Repo.GetAllStudents(c.Request.Context(), deptStr)
	if err != nil {
		log.Println("Failed to fetch students:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch students"})
		return
	}
	c.JSON(http.StatusOK, students)
}

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

func (sc *StudentController) CreateStudentHandler(c *gin.Context) {
	var student model.Student
	if err := c.ShouldBindJSON(&student); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}
	departmentRepo, exists := c.Get("deptRepo")
	if !exists {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Department repository not found"})
		return
	}
	validDepartments, err := departmentRepo.(*repository.DepartmentRepository).GetAllDepartments(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch departments"})
		return
	}
	validDepartment := false
	for _, dept := range validDepartments {
		if dept.Name == student.Department {
			validDepartment = true
			break
		}
	}
	if !validDepartment {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid department"})
		return
	}
	if err := validateStudent(student); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := sc.Repo.CreateStudent(c.Request.Context(), &student); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create student"})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"message": "Student created successfully"})
}

func (sc *StudentController) UpdateStudentHandler(c *gin.Context) {
	var student model.Student
	if err := c.ShouldBindJSON(&student); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}
	if student.Email == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email cannot be empty"})
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

func (sc *StudentController) GetStudentsByDepartment(c *gin.Context) {
	dept := c.Query("dept")
	filter := c.Query("filter")
	log.Println("Received department query:", dept, "with filter:", filter)
	if dept == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Department is required"})
		return
	}
	if strings.ToLower(dept) == "all" {
		dept = "admin"
	}
	students, err := sc.Repo.GetStudentsByDepartment(c.Request.Context(), dept)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	switch filter {
	case "maxpackage":
		sort.SliceStable(students, func(i, j int) bool {
			return maxPackage(students[i].Companies) > maxPackage(students[j].Companies)
		})
	case "placed":
		students = filterByPlacementStatus(students, "placed")
	case "entrepreneur":
		students = filterByPlacementStatus(students, "entrepreneur")
	case "higherstudy":
		students = filterByPlacementStatus(students, "higherstudy")
	case "familybusiness":
		students = filterByPlacementStatus(students, "familybusiness")
	case "notplaced":
		students = filterByPlacementStatus(students, "notplaced")
	}
	c.JSON(http.StatusOK, students)
}

func filterByPlacementStatus(students []model.Student, status string) []model.Student {
	var result []model.Student
	for _, s := range students {
		if len(s.Companies) == 0 && status == "notplaced" {
			result = append(result, s)
			continue
		}
		for _, c := range s.Companies {
			if status == "placed" && (c.PPO || c.PPOI) {
				result = append(result, s)
				break
			}
		}
	}
	return result
}

func maxPackage(companies []model.CompanyStudent) float64 {
	var max float64
	for _, c := range companies {
		if c.Package > max {
			max = c.Package
		}
	}
	return max
}

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
	return nil
}

func isValidEmail(email string) bool {
	re := regexp.MustCompile(`^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$`)
	return re.MatchString(email)
}