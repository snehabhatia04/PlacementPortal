package controller

import (
	"log"
	"net/http"
	"strings"

	"Placement-Portal/company_service/repository"
	"Placement-Portal/pkg/model"

	"github.com/gin-gonic/gin"
)

// CompanyController struct
type CompanyController struct {
	Repo *repository.CompanyRepository
}

// NewCompanyController creates a new instance of CompanyController
func NewCompanyController(repo *repository.CompanyRepository) *CompanyController {
	return &CompanyController{Repo: repo}
}

// GetAllCompanies handles fetching all companies
func (cc *CompanyController) GetAllCompanies(c *gin.Context) {
	companies, err := cc.Repo.GetAllCompanies(c.Request.Context())
	if err != nil {
		log.Printf("Repo error: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch companies"})
		return
	}
	c.JSON(http.StatusOK, companies)
}

// GetCompanyByName fetches a company by its name
func (cc *CompanyController) GetCompanyByName(c *gin.Context) {
	name := c.Param("name")
	if name == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Company name is required"})
		return
	}

	company, err := cc.Repo.GetCompanyByName(c.Request.Context(), name)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Company not found"})
		return
	}

	c.JSON(http.StatusOK, company)
}

// CreateCompany adds a new company
func (cc *CompanyController) CreateCompany(c *gin.Context) {
	var company model.Company
	if err := c.ShouldBindJSON(&company); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	if company.Name == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Company name cannot be empty"})
		return
	}

	if err := cc.Repo.CreateCompany(c.Request.Context(), &company); err != nil {
        log.Printf("Failed to insert company: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create company"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Company created successfully"})
}

// DeleteCompany removes a company and updates student records
func (cc *CompanyController) DeleteCompany(c *gin.Context) {
	name := c.Param("name")
	if name == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Company name is required"})
		return
	}

	if err := cc.Repo.DeleteCompany(c.Request.Context(), name); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete company"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Company deleted successfully"})
}

// AddStudentsToCompany assigns students to a company
func (c *CompanyController) AddStudentsToCompany(ctx *gin.Context) {
    companyName := ctx.Param("name")

    var payload struct {
        Students []model.CompanyStudent `json:"students"`
    }

    if err := ctx.ShouldBindJSON(&payload); err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input: " + err.Error()})
        return
    }

    err := c.Repo.AssignMultipleStudentsToCompany(ctx, companyName, payload.Students)
    if err != nil {
        // Check if the error is because the company does not exist
        if strings.Contains(err.Error(), "does not exist") {
            ctx.JSON(http.StatusBadRequest, gin.H{"error": "Company does not exist"})
        } else {
            ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to assign students"})
        }
        return
    }

    ctx.JSON(http.StatusCreated, gin.H{"message": "Students added to company successfully"})
}

// DeleteStudentsFromCompany removes students from a company
func (c *CompanyController) DeleteStudentsFromCompany(ctx *gin.Context) {
    companyName := ctx.Param("name")

    var payload struct {
        RegNos []string `json:"reg_nos"`
    }

    if err := ctx.ShouldBindJSON(&payload); err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input: " + err.Error()})
        return
    }

    for _, regNo := range payload.RegNos {
        err := c.Repo.RemoveStudentFromCompany(ctx, companyName, regNo)
        if err != nil {
            ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to remove student: " + regNo})
            return
        }
    }

    ctx.JSON(http.StatusOK, gin.H{"message": "Students removed from company successfully"})
}

// GetStudentsByCompany handles fetching students by company name
func (c *CompanyController) GetStudentsByCompany(ctx *gin.Context) {
    companyName := ctx.Param("name")

    // Fetch students by company name
    students, err := c.Repo.GetStudentsByCompany(ctx, companyName)
    if err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching students: " + err.Error()})
        return
    }

    if len(students) == 0 {
        ctx.JSON(http.StatusNotFound, gin.H{"message": "No students found for the company"})
        return
    }

    ctx.JSON(http.StatusOK, students)
}

//Update student info under company
func (cc *CompanyController) UpdateCompany(c *gin.Context) {
    companyName := c.Param("name")

    var req struct {
        AddStudents    []string `json:"add_students"`
        RemoveStudents []string `json:"remove_students"`
    }

    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
        return
    }

    if len(req.AddStudents) > 0 {
        students, err := cc.Repo.GetStudentsByRegNos(c.Request.Context(), req.AddStudents)
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch student details"})
            return
        }

        for _, student := range students {
            err = cc.Repo.AssignStudentToCompany(c.Request.Context(), companyName, student, 0, false, false, false)
            if err != nil {
                c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add student: " + student.RegNo})
                return
            }
        }
    }

    if len(req.RemoveStudents) > 0 {
        for _, regNo := range req.RemoveStudents {
            err := cc.Repo.RemoveStudentFromCompany(c.Request.Context(), companyName, regNo)
            if err != nil {
                c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to remove student: " + regNo})
                return
            }
        }
    }

    c.JSON(http.StatusOK, gin.H{"message": "Company updated successfully"})
}