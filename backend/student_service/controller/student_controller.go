package controller

import (
	"fmt"
	"placementportal/backend/pkg/model"
	"placementportal/backend/student_service/repository"
	"strconv"

	"errors"
	"log"
	"net/http"
	"regexp"
	"sort"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/xuri/excelize/v2"
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

	sessionIDStr := c.Query("session_id")
	if sessionIDStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Session ID is required"})
		return
	}

	sessionID, err := strconv.Atoi(sessionIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid session ID"})
		return
	}

	students, err := sc.Repo.GetAllStudents(c.Request.Context(), deptStr, sessionID)
	if err != nil {
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

	sessionIDStr := c.Query("session_id")
	if sessionIDStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Session ID is required"})
		return
	}

	sessionID, err := strconv.Atoi(sessionIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid session ID"})
		return
	}

	student, err := sc.Repo.GetStudentByRegNo(c.Request.Context(), regNo, sessionID)
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

	// Validate department
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

	// Validate session_id
	if student.SessionID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Session ID is required"})
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
	sessionIDStr := c.Query("session_id")

	log.Println("Received department query:", dept, "with filter:", filter, "and session:", sessionIDStr)

	if dept == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Department is required"})
		return
	}
	if strings.ToLower(dept) == "all" {
		dept = "admin"
	}

	if sessionIDStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Session ID is required"})
		return
	}
	sessionID, err := strconv.Atoi(sessionIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid session ID"})
		return
	}

	// Fetch students from repo
	students, err := sc.Repo.GetStudentsByDepartment(c.Request.Context(), dept, sessionID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Attach placements to each student
	for i, s := range students {
	placements, err := sc.Repo.GetPlacementsByRegNo(c.Request.Context(), s.RegNo, sessionID)
	if err != nil {
		log.Println("Error fetching placements for student:", s.RegNo, err)
		placements = []model.StudentPlacement{}
	}
	students[i].Placements = placements
}


	// Apply filter if any
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
		// If no placement records
		if len(s.Placements) == 0 && status == "notplaced" {
			result = append(result, s)
			continue
		}

		for _, p := range s.Placements {
			switch status {
			case "placed":
				if p.PlacementStatus == "Placed" {
					result = append(result, s)
					break
				}
			case "higherstudy":
				if p.PlacementStatus == "Higher Study" {
					result = append(result, s)
					break
				}
			case "entrepreneur":
				if p.PlacementStatus == "Entrepreneur" {
					result = append(result, s)
					break
				}
			case "familybusiness":
				if p.PlacementStatus == "Family Business" {
					result = append(result, s)
					break
				}
			case "notplaced":
				if p.PlacementStatus == "" {
					result = append(result, s)
					break
				}
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

func cleanValue(val string) string {
	return strings.TrimSpace(strings.ReplaceAll(strings.ReplaceAll(val, "\n", ""), "\r", ""))
}

func parseOfferTypeFlags(offerType string) (ppo, ppoi, i bool) {
	switch strings.ToUpper(strings.TrimSpace(offerType)) {
	case "PPO+I":
		return true, true, true
	case "PPO":
		return true, false, false
	case "I":
		return false, false, true
	default:
		return false, false, false
	}
}

func isInternshipOffer(offerType string) bool {
	offerType = strings.ToUpper(strings.TrimSpace(offerType))
	return offerType == "PPO+I" || offerType == "I"
}

func (sc *StudentController) ImportStudentsFromExcelHandler(c *gin.Context) {
	fmt.Println("==== ImportStudentsFromExcelHandler hit ====")

	sessionIdStr := c.PostForm("session_id")
	if sessionIdStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "session_id is required"})
		return
	}
	sessionId, err := strconv.Atoi(sessionIdStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid session_id"})
		return
	}

	fileHeader, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to get uploaded file"})
		return
	}
	file, _ := fileHeader.Open()
	defer file.Close()

	f, err := excelize.OpenReader(file)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Excel file"})
		return
	}

	rows, err := f.GetRows("Sheet1")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read Excel rows"})
		return
	}

	// Load valid departments
	validDepartments, err := sc.DeptRepo.GetAllDepartments(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch departments"})
		return
	}
	deptMap := make(map[string]bool)
	for _, dept := range validDepartments {
		deptMap[dept.Name] = true
	}

	successCount, failCount := 0, 0
	for i, row := range rows {
		if i == 0 {
			continue // skip header
		}
		if len(row) < 5 {
			failCount++
			continue
		}

		student := model.Student{
			RegNo:      cleanValue(row[1]),
			Name:       cleanValue(row[2]),
			Email:      cleanValue(row[3]),
			Department: cleanValue(row[4]),
			SessionID:  sessionId, // attach here
		}

		if err := validateStudent(student); err != nil {
			failCount++
			continue
		}
		if !deptMap[student.Department] {
			failCount++
			continue
		}

		if err := sc.Repo.CreateStudent(c.Request.Context(), &student); err != nil {
			failCount++
			continue
		}

		if len(row) >= 9 && cleanValue(row[5]) != "" {
			stipendFloat, _ := strconv.ParseFloat(cleanValue(row[7]), 64)
			packageFloat, _ := strconv.ParseFloat(cleanValue(row[8]), 64)

			ppo, ppoi, iFlag := parseOfferTypeFlags(cleanValue(row[6]))

			offer := model.CompanyStudent{
				RegNo:       student.RegNo,
				CompanyName: cleanValue(row[5]),
				Stipend:     stipendFloat,
				Package:     packageFloat,
				PPO:         ppo,
				PPOI:        ppoi,
				I:           iFlag,
				Department:  student.Department,
				StudentName: student.Name,
				Email:       student.Email,
				SessionID:   sessionId,
			}

			_ = sc.Repo.CreateCompanyStudent(c.Request.Context(), &offer)
		}
		successCount++
	}

	c.JSON(http.StatusOK, gin.H{
		"message":      "Excel import completed",
		"successCount": successCount,
		"failCount":    failCount,
	})
}


func isValidEmail(email string) bool {
	email = strings.TrimSpace(email)
	re := regexp.MustCompile(`(?i)^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$`)
	return re.MatchString(email)
}


func validateStudent(student model.Student) error {
	student.RegNo = cleanValue(student.RegNo)
	student.Name = cleanValue(student.Name)
	student.Email = cleanValue(student.Email)
	student.Department = cleanValue(student.Department)

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


