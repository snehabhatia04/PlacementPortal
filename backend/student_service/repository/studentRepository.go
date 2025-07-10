package repository

import (
	"context"
	"fmt"
	"log"
	"placementportal/backend/pkg/model"
	"strings"

	"github.com/huandu/go-sqlbuilder"
	"github.com/jmoiron/sqlx"
)

type StudentRepository struct {
	DB *sqlx.DB
}

func NewStudentRepository(db *sqlx.DB) *StudentRepository {
	return &StudentRepository{DB: db}
}

// Get all students with mapped company placements
func (r *StudentRepository) GetAllStudents(ctx context.Context, department string, sessionId int) ([]model.Student, error) {
	var students []model.Student
	studentQuery := `SELECT reg_no, name, email, department FROM student WHERE session_id = $1`
	args := []interface{}{sessionId}

	if strings.ToLower(department) != "admin" && strings.ToLower(department) != "all" {
		studentQuery += " AND LOWER(department) = LOWER($2)"
		args = append(args, department)
	}

	log.Printf("🌀 Final query: %s | args: %v", studentQuery, args)

	err := r.DB.SelectContext(ctx, &students, studentQuery, args...)
	if err != nil {
		return nil, fmt.Errorf("error fetching students: %w", err)
	}

	for i, s := range students {
		mappings, err := r.getCompanyMappingsForStudent(ctx, s.RegNo)
		if err != nil {
			return nil, err
		}
		students[i].Companies = mappings
	}

	return students, nil
}

func (r *StudentRepository) GetPlacementsByRegNo(ctx context.Context, regNo string, sessionId int) ([]model.StudentPlacement, error) {
	query := `SELECT id, reg_no, placement_status, company_name, offer_type, stipend, package, higher_study_college, firm_name
			FROM student_placements
			WHERE reg_no = $1 AND session_id = $2`
	rows, err := r.DB.QueryContext(ctx, query, regNo, sessionId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var placements []model.StudentPlacement
	for rows.Next() {
		var p model.StudentPlacement
		err := rows.Scan(&p.ID, &p.RegNo, &p.PlacementStatus, &p.CompanyName, &p.OfferType, &p.Stipend, &p.Package, &p.HigherStudyCollege, &p.FirmName)
		if err != nil {
			return nil, err
		}
		placements = append(placements, p)
	}
	return placements, nil
}

func (r *StudentRepository) GetStudentByRegNo(ctx context.Context, regNo string, sessionId int) (*model.Student, error) {
	var student model.Student

	// Fetch core student details
	query := "SELECT reg_no, name, email, department, mobile_no, session_id FROM student WHERE reg_no = $1"
	err := r.DB.GetContext(ctx, &student, query, regNo)
	if err != nil {
		return nil, fmt.Errorf("error fetching student: %w", err)
	}

	// Fetch company mappings
	student.Companies, err = r.getCompanyMappingsForStudent(ctx, student.RegNo)
	if err != nil {
		return nil, err
	}

	// Fetch placement records for this student (for given session)
	student.Placements, err = r.GetPlacementsByRegNo(ctx, student.RegNo, sessionId)
	if err != nil {
		return nil, err
	}

	return &student, nil
}


// Helper: Fetch company mappings for a student
func (r *StudentRepository) getCompanyMappingsForStudent(ctx context.Context, regNo string) ([]model.CompanyStudent, error) {
	var mappings []model.CompanyStudent
	query := `
		SELECT id, company_name, stipend, package, ppo_i, ppo, i, department
		FROM company_student
		WHERE reg_no = $1
	`
	err := r.DB.SelectContext(ctx, &mappings, query, regNo)
	if err != nil {
		return nil, fmt.Errorf("error fetching company mappings: %w", err)
	}
	return mappings, nil
}

// Create student record, plus optional company mappings
func (r *StudentRepository) CreateStudent(ctx context.Context, student *model.Student) error {
	query := `
		INSERT INTO student (reg_no, name, email, department, session_id)
		VALUES ($1, $2, $3, $4, $5)
	`
	_, err := r.DB.ExecContext(ctx, query, student.RegNo, student.Name, student.Email, student.Department, student.SessionID)
	if err != nil {
		return fmt.Errorf("error inserting student: %w", err)
	}

	for _, mapping := range student.Companies {
		err := r.insertCompanyMapping(ctx, student.RegNo, student, mapping)
		if err != nil {
			return err
		}
	}

	return nil
}

// Update student record and replace all company mappings
func (r *StudentRepository) UpdateStudent(ctx context.Context, student *model.Student) error {
	sb := sqlbuilder.NewUpdateBuilder()
	sb.Update("student")
	sb.Set(
		sb.Assign("name", student.Name),
		sb.Assign("email", student.Email),
		sb.Assign("department", student.Department),
	)
	sb.Where(sb.Equal("reg_no", student.RegNo))

	query, args := sb.BuildWithFlavor(sqlbuilder.PostgreSQL)

	log.Println("Updating student query:", query)
	log.Println("Args:", args)

	_, err := r.DB.ExecContext(ctx, query, args...)
	if err != nil {
		return fmt.Errorf("error updating student: %w", err)
	}

	// Clear existing company mappings
	_, err = r.DB.ExecContext(ctx, "DELETE FROM company_student WHERE reg_no = $1", student.RegNo)
	if err != nil {
		return fmt.Errorf("error clearing old mappings: %w", err)
	}

	for _, mapping := range student.Companies {
		err := r.insertCompanyMapping(ctx, student.RegNo, student, mapping)
		if err != nil {
			return err
		}
	}

	return nil
}

// Insert a company mapping for a student
func (r *StudentRepository) insertCompanyMapping(ctx context.Context, regNo string, student *model.Student, mapping model.CompanyStudent) error {
	query := `
		INSERT INTO company_student
			(company_name, reg_no, student_name, email, stipend, package, ppo_i, ppo, i, department)
		VALUES
			($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
	`
	_, err := r.DB.ExecContext(ctx, query,
		mapping.CompanyName,
		regNo,
		student.Name,
		student.Email,
		mapping.Stipend,
		mapping.Package,
		mapping.PPOI,
		mapping.PPO,
		mapping.I,
		student.Department,
	)
	if err != nil {
		return fmt.Errorf("error inserting company mapping for %s: %w", regNo, err)
	}
	return nil
}

// Delete a student
func (r *StudentRepository) DeleteStudent(ctx context.Context, regNo string) error {
	_, err := r.DB.ExecContext(ctx, "DELETE FROM student WHERE reg_no = $1", regNo)
	if err != nil {
		return fmt.Errorf("error deleting student: %w", err)
	}
	return nil
}

// Fetch all students within a department for a specific session with their company mappings
func (r *StudentRepository) GetStudentsByDepartment(ctx context.Context, dept string, sessionId int) ([]model.Student, error) {
	var students []model.Student
	studentQuery := `
		SELECT reg_no, name, email, department
		FROM student
		WHERE department = $1 AND session_id = $2
	`
	args := []interface{}{dept, sessionId}

	if err := r.DB.SelectContext(ctx, &students, studentQuery, args...); err != nil {
		return nil, fmt.Errorf("error fetching students: %w", err)
	}

	studentMap := make(map[string]*model.Student)
	for i := range students {
		studentMap[students[i].RegNo] = &students[i]
	}

	mappingQuery := `
		SELECT reg_no, company_name, stipend, package, ppo_i, ppo, i, department
		FROM company_student
		WHERE department = $1
	`
	var mappings []struct {
		RegNo string `db:"reg_no"`
		model.CompanyStudent
	}
	if err := r.DB.SelectContext(ctx, &mappings, mappingQuery, dept); err != nil {
		return nil, fmt.Errorf("error fetching company mappings: %w", err)
	}

	for _, m := range mappings {
		if student, exists := studentMap[m.RegNo]; exists {
			student.Companies = append(student.Companies, m.CompanyStudent)
		}
	}

	return students, nil
}


func (r *StudentRepository) CreateCompanyStudent(ctx context.Context, offer *model.CompanyStudent) error {
	query := `INSERT INTO company_student
(company_name, reg_no, student_name, email, stipend, package, ppo, ppo_i, i, department)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`
_, err := r.DB.ExecContext(ctx, query,
	offer.CompanyName,
	offer.RegNo,
	offer.StudentName,
	offer.Email,
	offer.Stipend,
	offer.Package,
	offer.PPO,
	offer.PPOI,
	offer.I,
	offer.Department)

	return err
}