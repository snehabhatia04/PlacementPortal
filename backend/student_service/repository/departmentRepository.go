package repository

import (
	"Placement-Portal/pkg/model"
	"context"
	"fmt"

	"github.com/jmoiron/sqlx"
)

// DepartmentRepository struct
type DepartmentRepository struct {
    DB *sqlx.DB
}

// NewDepartmentRepository creates a new instance of DepartmentRepository
func NewDepartmentRepository(db *sqlx.DB) *DepartmentRepository {
    return &DepartmentRepository{DB: db}
}

// GetAllDepartments fetches all department names from the database
func (r *DepartmentRepository) GetAllDepartments(ctx context.Context) ([]model.Department, error) {
    var departments []model.Department
    query := "SELECT * FROM department"
    err := r.DB.SelectContext(ctx, &departments, query)
    if err != nil {
        return nil, fmt.Errorf("error fetching departments: %w", err)
    }
    return departments, nil
}
