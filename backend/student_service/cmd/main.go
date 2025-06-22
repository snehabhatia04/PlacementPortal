package main

import (
	"log"

	"Placement-Portal/pkg/middleware"
	"Placement-Portal/student_service/config"
	"Placement-Portal/student_service/controller"
	"Placement-Portal/student_service/repository"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func init() {
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: No .env file found. Using system environment variables.")
	}
}

func main() {
	// Load configuration
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("Failed to load config: %v", err)
	}

	// Initialize database connection
	db, err := config.InitDB(cfg.DB_URL)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Close()

	// Initialize repository and controller
	studentRepo := repository.NewStudentRepository(db)
	departmentRepo := repository.NewDepartmentRepository(db)
	studentController := controller.NewStudentController(studentRepo, departmentRepo)

	// Set up Gin router
	router := gin.Default()
	router.Use(middleware.CorsHandlerMiddleware())

	// Middleware to set department repository in context
	router.Use(func(c *gin.Context) {
		c.Set("deptRepo", departmentRepo)
		c.Next()
	})

	// Student routes
	studentRoutes := router.Group("/students")
	studentRoutes.Use(middleware.AuthMiddleware(cfg.JwtSecretKey, "")) // Auth for all student routes

	{
		studentRoutes.POST("/",
			middleware.PermissionMiddleware("create_student"),
			studentController.CreateStudentHandler)

		studentRoutes.GET("/",
			middleware.PermissionMiddleware("view_all_students"),
			studentController.GetAllStudentsHandler)

		studentRoutes.GET("/department",
			middleware.PermissionMiddleware("view_own_department_students"),
			studentController.GetStudentsByDepartment)

		studentRoutes.GET("/:reg_no",
			middleware.PermissionMiddleware("view_all_students"), // Assuming reg_no fetch is admin/placement_team-only
			studentController.GetStudentByRegNoHandler)

		studentRoutes.PUT("/",
			middleware.PermissionMiddleware("update_student"),
			studentController.UpdateStudentHandler)

		studentRoutes.DELETE("/:reg_no",
			middleware.PermissionMiddleware("delete_student"),
			studentController.DeleteStudentHandler)
	}

	// Start server
	log.Printf("Student Service running on port %s", cfg.Port)
	if err := router.Run(":" + cfg.Port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
