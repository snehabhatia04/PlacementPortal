package repository

import (
	"context"
	"errors"
	"fmt"
	"log"
	"strings"

	"Placement-Portal/pkg/model"
	"Placement-Portal/student_service/repository"

	"github.com/jmoiron/sqlx"
)

type CompanyRepository struct {
    DB          *sqlx.DB
    StudentRepo *repository.StudentRepository
}

func NewCompanyRepository(db *sqlx.DB, studentRepo *repository.StudentRepository) *CompanyRepository {
    return &CompanyRepository{
        DB:          db,
        StudentRepo: studentRepo,
    }
}

func (r *CompanyRepository) CreateCompany(ctx context.Context, company *model.Company) error {
    query := `INSERT INTO company (name) VALUES ($1)`
    _, err := r.DB.ExecContext(ctx, query, company.Name)
    return err
}

func (r *CompanyRepository) DeleteCompany(ctx context.Context, name string) error {
    name = strings.ToLower(name)

    tx, err := r.DB.BeginTx(ctx, nil)
    if err != nil {
        return err
    }

    deleteQuery := `DELETE FROM company_student WHERE LOWER(company_name) = LOWER($1)`
    _, err = tx.ExecContext(ctx, deleteQuery, name)
    if err != nil {
        tx.Rollback()
        return err
    }

    deleteCompanyQuery := `DELETE FROM company WHERE LOWER(name) = LOWER($1)`
    _, err = tx.ExecContext(ctx, deleteCompanyQuery, name)
    if err != nil {
        tx.Rollback()
        return err
    }

    return tx.Commit()
}

func (r *CompanyRepository) GetCompanyByName(ctx context.Context, name string) (*model.Company, error) {
    name = strings.ToLower(name)

    var company model.Company
    query := `SELECT name FROM company WHERE LOWER(name) = LOWER($1)`
    err := r.DB.QueryRowContext(ctx, query, name).Scan(&company.Name)
    if err != nil {
        return nil, err
    }
    return &company, nil
}

func (r *CompanyRepository) GetAllCompanies(ctx context.Context) ([]model.Company, error) {
    query := `SELECT name FROM company`
    rows, err := r.DB.QueryContext(ctx, query)
    if err != nil {
        log.Printf("Error fetching companies: %v", err)
        return nil, err
    }
    defer rows.Close()

    var companies []model.Company
    for rows.Next() {
        var company model.Company
        if err := rows.Scan(&company.Name); err != nil {
            return nil, err
        }
        companies = append(companies, company)
    }

    return companies, nil
}

func (r *CompanyRepository) GetStudentsByRegNos(ctx context.Context, regNos []string) ([]model.Student, error) {
    if len(regNos) == 0 {
        return nil, errors.New("no student reg_nos provided")
    }

    query := `SELECT s.reg_no, s.name, s.email FROM student s WHERE s.reg_no = ANY($1)`
    rows, err := r.DB.QueryContext(ctx, query, regNos)
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var students []model.Student
    for rows.Next() {
        var student model.Student
        if err := rows.Scan(&student.RegNo, &student.Name, &student.Email); err != nil {
            return nil, err
        }
        students = append(students, student)
    }
    return students, nil
}

func (r *CompanyRepository) AssignStudentToCompany(ctx context.Context, companyName string, student model.Student, stipend float64, ppo_i, ppo, i bool) error {
    companyName = strings.ToLower(companyName)

    tx, err := r.DB.BeginTx(ctx, nil)
    if err != nil {
        return err
    }

    insertQuery := `INSERT INTO company_student (company_name, reg_no, student_name, email, stipend, ppo_i, ppo, i, department)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`
    _, err = tx.ExecContext(ctx, insertQuery, companyName, student.RegNo, student.Name, student.Email, stipend, ppo_i, ppo, i, student.Department)
    if err != nil {
        tx.Rollback()
        return err
    }

    updateStudentQuery := `UPDATE student SET
        company_1 = COALESCE(company_1, $1),
        company_2 = CASE WHEN company_1 IS NOT NULL AND company_2 IS NULL THEN $1 ELSE company_2 END,
        company_3 = CASE WHEN company_1 IS NOT NULL AND company_2 IS NOT NULL AND company_3 IS NULL THEN $1 ELSE company_3 END
        WHERE reg_no = $2`
    _, err = tx.ExecContext(ctx, updateStudentQuery, companyName, student.RegNo)
    if err != nil {
        tx.Rollback()
        return err
    }

    return tx.Commit()
}

func (r *CompanyRepository) AssignMultipleStudentsToCompany(ctx context.Context, companyName string, students []model.CompanyStudent) error {
    companyName = strings.ToLower(companyName)

    var companyExists bool
    err := r.DB.QueryRowContext(ctx, `SELECT EXISTS(SELECT 1 FROM company WHERE LOWER(name) = LOWER($1))`, companyName).Scan(&companyExists)
    if err != nil {
        return fmt.Errorf("error checking company existence: %v", err)
    }

    if !companyExists {
        return fmt.Errorf("company %s does not exist", companyName)
    }

    tx, err := r.DB.BeginTx(ctx, nil)
    if err != nil {
        log.Printf("Error starting transaction: %v", err)
        return err
    }

    for _, student := range students {
        insertQuery := `INSERT INTO company_student (company_name, reg_no, student_name, email, stipend, ppo_i, ppo, i, department) 
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`
        _, err := tx.ExecContext(ctx, insertQuery, companyName, student.RegNo, student.StudentName, student.Email, student.Stipend, student.PPO_I, student.PPO, student.I, student.Department)
        if err != nil {
            log.Printf("Error inserting student %s: %v", student.RegNo, err)
            tx.Rollback()
            return err
        }

        updateStudentQuery := `UPDATE student SET 
            company_1 = COALESCE(company_1, $1),
            company_2 = CASE WHEN company_1 IS NOT NULL AND company_2 IS NULL THEN $1 ELSE company_2 END,
            company_3 = CASE WHEN company_1 IS NOT NULL AND company_2 IS NOT NULL AND company_3 IS NULL THEN $1 ELSE company_3 END
            WHERE reg_no = $2`
        _, err = tx.ExecContext(ctx, updateStudentQuery, companyName, student.RegNo)
        if err != nil {
            log.Printf("Error updating student %s: %v", student.RegNo, err)
            tx.Rollback()
            return err
        }
    }

    err = tx.Commit()
    if err != nil {
        log.Printf("Error committing transaction: %v", err)
        return err
    }

    return nil
}

func (r *CompanyRepository) RemoveStudentFromCompany(ctx context.Context, companyName string, regNo string) error {
    companyName = strings.ToLower(companyName)

    tx, err := r.DB.BeginTx(ctx, nil)
    if err != nil {
        return err
    }

    deleteQuery := `DELETE FROM company_student WHERE LOWER(company_name) = LOWER($1) AND reg_no = $2`
    _, err = tx.ExecContext(ctx, deleteQuery, companyName, regNo)
    if err != nil {
        tx.Rollback()
        return err
    }

    updateStudentQuery := `UPDATE student SET
        company_1 = CASE WHEN LOWER(company_1) = LOWER($1) THEN NULL ELSE company_1 END,
        company_2 = CASE WHEN LOWER(company_2) = LOWER($1) THEN NULL ELSE company_2 END,
        company_3 = CASE WHEN LOWER(company_3) = LOWER($1) THEN NULL ELSE company_3 END
        WHERE reg_no = $2`
    _, err = tx.ExecContext(ctx, updateStudentQuery, companyName, regNo)
    if err != nil {
        tx.Rollback()
        return err
    }

    return tx.Commit()
}

func (r *CompanyRepository) RemoveMultipleStudentsFromCompany(ctx context.Context, companyName string, regNos []string) error {
    companyName = strings.ToLower(companyName)

    tx, err := r.DB.BeginTx(ctx, nil)
    if err != nil {
        return err
    }

    deleteQuery := `DELETE FROM company_student WHERE LOWER(company_name) = LOWER($1) AND reg_no = $2`
    updateStudentQuery := `UPDATE student SET
        company_1 = CASE WHEN LOWER(company_1) = LOWER($1) THEN NULL ELSE company_1 END,
        company_2 = CASE WHEN LOWER(company_2) = LOWER($1) THEN NULL ELSE company_2 END,
        company_3 = CASE WHEN LOWER(company_3) = LOWER($1) THEN NULL ELSE company_3 END
        WHERE reg_no = $2`

    for _, regNo := range regNos {
        _, err := tx.ExecContext(ctx, deleteQuery, companyName, regNo)
        if err != nil {
            tx.Rollback()
            return err
        }

        _, err = tx.ExecContext(ctx, updateStudentQuery, companyName, regNo)
        if err != nil {
            tx.Rollback()
            return err
        }
    }

    return tx.Commit()
}

func (r *CompanyRepository) GetStudentsByCompany(ctx context.Context, companyName string) ([]model.CompanyStudent, error) {
    companyName = strings.ToLower(companyName)

    query := `SELECT id, company_name, reg_no, student_name, email, stipend, ppo_i, ppo, i, department
    FROM company_student WHERE LOWER(company_name) = LOWER($1)`

    rows, err := r.DB.QueryContext(ctx, query, companyName)
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var students []model.CompanyStudent
    for rows.Next() {
        var student model.CompanyStudent
        if err := rows.Scan(&student.ID, &student.CompanyName, &student.RegNo, &student.StudentName, &student.Email, &student.Stipend, &student.PPO_I, &student.PPO, &student.I, &student.Department); err != nil {
            return nil, err
        }
        students = append(students, student)
    }

    if err := rows.Err(); err != nil {
        return nil, err
    }

    return students, nil
}