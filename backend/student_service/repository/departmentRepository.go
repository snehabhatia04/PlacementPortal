package repository

import (
	"Placement-Portal/pkg/model"
	"context"
	"fmt"

	"github.com/jmoiron/sqlx"
)

// DepartmentRepository struct for department related queries
type DepartmentRepository struct {
	DB *sqlx.DB
}

// NewDepartmentRepository creates a new instance of DepartmentRepository
func NewDepartmentRepository(db *sqlx.DB) *DepartmentRepository {
	return &DepartmentRepository{DB: db}
}

// GetAllDepartments fetches all department records from the database
func (r *DepartmentRepository) GetAllDepartments(ctx context.Context) ([]model.Department, error) {
	var departments []model.Department
	query := `SELECT id, name FROM department ORDER BY name`
	if err := r.DB.SelectContext(ctx, &departments, query); err != nil {
		return nil, fmt.Errorf("error fetching departments: %w", err)
	}
	return departments, nil
}

// GetDepartmentByID fetches a department by its ID
func (r *DepartmentRepository) GetDepartmentByID(ctx context.Context, id int) (*model.Department, error) {
	var dept model.Department
	query := `SELECT id, name FROM department WHERE id = $1`
	if err := r.DB.GetContext(ctx, &dept, query, id); err != nil {
		return nil, fmt.Errorf("department not found: %w", err)
	}
	return &dept, nil
}

