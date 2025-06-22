package main

import (
	"log"

	"Placement-Portal/company_service/config"
	"Placement-Portal/company_service/controller"
	"Placement-Portal/company_service/repository"
	"Placement-Portal/pkg/constants"
	"Placement-Portal/pkg/middleware"
	studentRepo "Placement-Portal/student_service/repository"

	"github.com/gin-gonic/gin"
)

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

	// Initialize repositories and controllers
	companyRepo := repository.NewCompanyRepository(db, studentRepo.NewStudentRepository(db))
	companyController := controller.NewCompanyController(companyRepo)

	// Set up Gin router
	router := gin.Default()
	router.Use(middleware.CorsHandlerMiddleware())

	// Protected company routes — JWT auth required
	companyRoutes := router.Group("/companies")
	companyRoutes.Use(middleware.AuthMiddleware(cfg.JwtSecretKey, "")) // all roles can access
	{
		companyRoutes.POST("/",
			middleware.PermissionMiddleware("create_company"),
			companyController.CreateCompany)

		companyRoutes.GET("/",
			middleware.PermissionMiddleware(constants.PermissionViewCompanies),
			companyController.GetAllCompanies)

		companyRoutes.POST("/:name/students",
			middleware.PermissionMiddleware("manage_company_students"),
			companyController.AddStudentsToCompany)

		companyRoutes.GET("/:name/students",
			middleware.PermissionMiddleware(constants.PermissionViewCompanywiseStudents),
			companyController.GetStudentsByCompany)

		companyRoutes.DELETE("/:name/students",
			middleware.PermissionMiddleware("manage_company_students"),
			companyController.DeleteStudentsFromCompany)

		companyRoutes.GET("/:name",
			middleware.PermissionMiddleware(constants.PermissionViewCompanies),
			companyController.GetCompanyByName)

		companyRoutes.PUT("/:name",
			middleware.PermissionMiddleware("update_company"),
			companyController.UpdateCompany)

		companyRoutes.DELETE("/:name",
			middleware.PermissionMiddleware("delete_company"),
			companyController.DeleteCompany)
	}

	// Start server
	log.Printf("Company Service running on port %s", cfg.Port)
	if err := router.Run(":" + cfg.Port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
