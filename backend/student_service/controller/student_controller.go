// package controller

// import (
// 	"Placement-Portal/pkg/model"
// 	"Placement-Portal/student_service/repository"
// 	"errors"
// 	"log"
// 	"net/http"
// 	"regexp"
// 	"sort"
// 	"strings"

// 	"github.com/gin-gonic/gin"
// )

// // StudentController struct
// type StudentController struct {
//     Repo *repository.StudentRepository
//     DeptRepo *repository.DepartmentRepository // Repository for fetching departments
// }

// // NewStudentController creates a new instance of StudentController
// func NewStudentController(repo *repository.StudentRepository, deptRepo *repository.DepartmentRepository) *StudentController {
//     return &StudentController{Repo: repo, DeptRepo: deptRepo}
// }

// // GetAllStudentsHandler handles fetching all students
// func (sc *StudentController) GetAllStudentsHandler(c *gin.Context) {
//     department, exists := c.Get("department")
//     deptStr := "admin" // default fallback

//     if exists {
//         if d, ok := department.(string); ok && d != "" {
//             deptStr = d
//         }
//     }

//     log.Println("Using Department:", deptStr)

//     students, err := sc.Repo.GetAllStudents(c.Request.Context(), deptStr)
//     if err != nil {
//         log.Println("Failed to fetch students:", err)
//         c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch students"})
//         return
//     }

//     c.JSON(http.StatusOK, students)
// }

// // GetStudentByRegNoHandler fetches a student by their registration number
// func (sc *StudentController) GetStudentByRegNoHandler(c *gin.Context) {
//     regNo := c.Param("reg_no")
//     if regNo == "" {
//         c.JSON(http.StatusBadRequest, gin.H{"error": "Registration number is required"})
//         return
//     }

//     student, err := sc.Repo.GetStudentByRegNo(c.Request.Context(), regNo)
//     if err != nil {
//         c.JSON(http.StatusNotFound, gin.H{"error": "Student not found"})
//         return
//     }

//     c.JSON(http.StatusOK, student)
// }

// // CreateStudentHandler handles creating a new student
// func (sc *StudentController) CreateStudentHandler(c *gin.Context) {
//     var student model.Student

//     log.Println("[INFO] Starting student creation process")

//     // 1. Bind JSON
//     if err := c.ShouldBindJSON(&student); err != nil {
//         log.Printf("[ERROR] JSON binding failed: %v", err)
//         c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
//         return
//     }
//     log.Printf("[DEBUG] Student data received: %+v", student)

//     // 2. Fetch the departmentRepo from context
//     departmentRepo, exists := c.Get("deptRepo")
//     if !exists {
//         log.Println("[ERROR] Department repository not found in context")
//         c.JSON(http.StatusInternalServerError, gin.H{"error": "Department repository not found"})
//         return
//     }

//     log.Println("[INFO] Department repository found in context")

//     // 3. Get all valid departments
//     validDepartments, err := departmentRepo.(*repository.DepartmentRepository).GetAllDepartments(c.Request.Context())
//     if err != nil {
//         log.Printf("[ERROR] Failed to fetch departments from DB: %v", err)
//         c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch departments"})
//         return
//     }
//     log.Printf("[DEBUG] Fetched departments: %+v", validDepartments)

//     // 4. Validate student's department
//     validDepartment := false
//     for _, dept := range validDepartments {
//         if dept.Name == student.Department {
//             validDepartment = true
//             break
//         }
//     }

//     if !validDepartment {
//         log.Printf("[ERROR] Invalid department provided: %s", student.Department)
//         c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid department"})
//         return
//     }

//     log.Println("[INFO] Department validated successfully")

//     // 5. Validate other fields
//     if err := validateStudent(student); err != nil {
//         log.Printf("[ERROR] Student validation failed: %v", err)
//         c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
//         return
//     }

//     log.Println("[INFO] Student field validation passed")

//     // 6. Create student in DB
//     if err := sc.Repo.CreateStudent(c.Request.Context(), &student); err != nil {
//         log.Printf("[ERROR] Failed to create student in DB: %v", err)
//         c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create student"})
//         return
//     }

//     log.Println("[INFO] Student created successfully in DB")

//     // 7. Respond with success
//     c.JSON(http.StatusCreated, gin.H{"message": "Student created successfully"})
// }

// // UpdateStudentHandler updates an existing student's details
// func (sc *StudentController) UpdateStudentHandler(c *gin.Context) {
//     var student model.Student
//     if err := c.ShouldBindJSON(&student); err != nil {
//         log.Printf("Bind error: %v", err)
//         c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
//         return
//     }

//     // Check if the email field is not empty
//     if student.Email == "" {
//         c.JSON(http.StatusBadRequest, gin.H{"error": "Email cannot be empty"})
//         return
//     }

//     // Validate student data (custom validation logic)
//     if err := validateStudent(student); err != nil {
//         c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
//         return
//     }

//     // Proceed with the update operation
//     if err := sc.Repo.UpdateStudent(c.Request.Context(), &student); err != nil {
//         c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update student"})
//         return
//     }

//     c.JSON(http.StatusOK, gin.H{"message": "Student updated successfully"})
// }

// // DeleteStudentHandler deletes a student by their registration number
// func (sc *StudentController) DeleteStudentHandler(c *gin.Context) {
//     regNo := c.Param("reg_no")
//     if regNo == "" {
//         c.JSON(http.StatusBadRequest, gin.H{"error": "Registration number is required"})
//         return
//     }

//     if err := sc.Repo.DeleteStudent(c.Request.Context(), regNo); err != nil {
//         c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete student"})
//         return
//     }

//     c.JSON(http.StatusOK, gin.H{"message": "Student deleted successfully"})
// }

// // validateStudent applies business rules for a student
// func validateStudent(student model.Student) error {
//     if student.RegNo == "" {
//         return errors.New("registration number cannot be empty")
//     }

//     if len(student.RegNo) != 9{
//         return errors.New("registration number must be exactly 9 characters")
//     }

//     if student.Name == "" {
//         return errors.New("student name cannot be empty")
//     }

//     if len(student.Name) < 3 {
//         return errors.New("student name must be at least 3 characters long")
//     }

//     if student.Email == "" {
//         return errors.New("email cannot be empty")
//     }

//     if !isValidEmail(student.Email) {
//         return errors.New("invalid email format")
//     }

//     if student.Department == "" {
//         return errors.New("department cannot be empty")
//     }

//     if len(student.Offers) > 3 {
//         return errors.New("a student cannot have more than 3 offers")
//     }

//     for _, offer := range student.Offers {
//         if offer.Company == "" {
//             return errors.New("each offer must have a company name")
//         }
//         if offer.Stipend < 0 {
//             return errors.New("stipend cannot be negative")
//         }
//     }

//     return nil
// }

// // Helper function to validate email format using regular expressions
// func isValidEmail(email string) bool {
//     re := regexp.MustCompile(`^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$`)
//     return re.MatchString(email)
// }

// func sortByMaxStipend(students []model.Student) []model.Student {
// 	sort.SliceStable(students, func(i, j int) bool {
// 		return maxStipend(students[i].Offers) > maxStipend(students[j].Offers)
// 	})
// 	return students
// }

// func maxStipend(offers []model.Offer) float64 {
// 	max := 0.0
// 	for _, o := range offers {
// 		if o.Stipend > max {
// 			max = o.Stipend
// 		}
// 	}
// 	return max
// }

// func filterPlaced(students []model.Student) []model.Student {
// 	var placed []model.Student
// 	for _, s := range students {
// 		for _, o := range s.Offers {
// 			if o.PPO || o.PPOI {
// 				placed = append(placed, s)
// 				break
// 			}
// 		}
// 	}
// 	return placed
// }

// func filterNotPlaced(students []model.Student) []model.Student {
// 	var notPlaced []model.Student
// 	for _, s := range students {
// 		placed := false
// 		for _, o := range s.Offers {
// 			if o.PPO || o.PPOI {
// 				placed = true
// 				break
// 			}
// 		}
// 		if !placed {
// 			notPlaced = append(notPlaced, s)
// 		}
// 	}
// 	return notPlaced
// }

// // GetStudentsByDepartment handles GET /students/department?dept=CSE
// func (sc *StudentController) GetStudentsByDepartment(c *gin.Context) {
// 	dept := c.Query("dept")
// 	filter := c.Query("filter") // e.g., "stipend", "placed", "notPlaced"
// 	log.Println("📥 Received department query:", dept, "with filter:", filter)

// 	if dept == "" {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Department is required"})
// 		return
// 	}
//     if strings.ToLower(dept) == "All" {
//         dept = "admin" // ✅ trigger full student fetch logic
//     }

// 	students, err := sc.Repo.GetStudentsByDepartment(c.Request.Context(), dept)
// 	if err != nil {
// 		log.Printf("Failed to fetch students by department: %v", err)
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 		return
// 	}

// 	// Apply filter logic
// 	switch filter {
// 	case "stipend":
// 		students = sortByMaxStipend(students)
// 	case "placed":
// 		students = filterPlaced(students)
// 	case "notPlaced":
// 		students = filterNotPlaced(students)
// 	}

// 	log.Printf("Fetched %d students", len(students))
// 	c.JSON(http.StatusOK, students)
// }

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