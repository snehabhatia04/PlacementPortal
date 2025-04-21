package main

import (
	"Placement-Portal/pkg/client"
	"Placement-Portal/pkg/database"
	"Placement-Portal/pkg/middleware"
	"Placement-Portal/portal_service/config"
	"Placement-Portal/portal_service/controller"
	"Placement-Portal/portal_service/repository"
	"log"

	"github.com/gin-gonic/gin"
)

func main(){
    cfg, err := config.LoadConfig()
    if err != nil {
        log.Fatalf("Failed to load config: %v", err)
    }
    

    // Initialize Database Connection
    database.Connect(cfg) // Calls Connect() from database package
    db := database.GetDB() // Retrieves the database instance

    // Initialize Clients
    studentClient := client.NewStudentClient(cfg)
    companyClient := client.NewCompanyClient(cfg)
    departmentClient := client.NewDepartmentClient(cfg)

    // Initialize Repositories
    adminRepo := repository.NewAdminRepository(db)
    facultyRepo := repository.NewFacultyRepository(db)

    // Initialize Controllers
    adminController := controller.NewAdminController(adminRepo, studentClient, companyClient, departmentClient)
    facultyController := controller.NewFacultyController(facultyRepo, studentClient, companyClient, departmentClient)

    // Setup Router
    r := gin.Default()
    r.Use(middleware.CorsHandlerMiddleware())

    // Authentication Routes for Admin
    r.POST("/admin/login", adminController.LoginAdminHandler)
    r.POST("/admin/logout", adminController.LogoutAdminHandler)

    // Authentication Routes for Faculty
    r.POST("/faculty/login", facultyController.LoginFacultyHandler)
    r.POST("/faculty/logout", facultyController.LogoutFacultyHandler)

    // Admin Routes (Admin Can Modify Data)
    authAdmin := r.Group("/admin")
    authAdmin.Use(middleware.AuthMiddleware(cfg.JwtSecretKey, "admin"))
    {
        authAdmin.GET("/students", adminController.GetAllStudentsHandler)
        authAdmin.POST("/students", adminController.CreateStudentHandler)
        authAdmin.PUT("/students/:id", adminController.UpdateStudentHandler)
        authAdmin.DELETE("/students/:id", adminController.DeleteStudentHandler)
    }

    // Faculty Routes (Faculty Can Only View Data)
    authFaculty := r.Group("/faculty")
    authFaculty.Use(middleware.AuthMiddleware(cfg.JwtSecretKey, "faculty"))
    {
        authFaculty.GET("/students", facultyController.GetAllStudentsHandler)
        authFaculty.GET("/companies", facultyController.GetAllCompaniesHandler)
    }

    // Start Server
    log.Println("Starting portal service on", cfg.Port)
    if err := r.Run(cfg.Port); err != nil {
        log.Fatalf("Failed to start server: %v", err)
    }
}
