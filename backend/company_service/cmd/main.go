package main

import (
	"log"

	"Placement-Portal/company_service/config"
	"Placement-Portal/company_service/controller"
	"Placement-Portal/company_service/repository"
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

	// Company routes
	companyRoutes := router.Group("/companies")
	{
		companyRoutes.POST("/", companyController.CreateCompany)
		companyRoutes.GET("/", companyController.GetAllCompanies)
		companyRoutes.POST("/:name/students", companyController.AddStudentsToCompany)
		companyRoutes.GET("/:name/students", companyController.GetStudentsByCompany)
		companyRoutes.DELETE("/:name/students", companyController.DeleteStudentsFromCompany)
		companyRoutes.GET("/:name", companyController.GetCompanyByName)
		companyRoutes.PUT("/:name", companyController.UpdateCompany)
		companyRoutes.DELETE("/:name", companyController.DeleteCompany)
	}

	// Start server
	log.Printf("Company Service running on port %s", cfg.Port)
	if err := router.Run(":" + cfg.Port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
