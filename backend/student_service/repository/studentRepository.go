package repository

import (
	"Placement-Portal/pkg/model"
	"context"
	"fmt"
	"log"

	"github.com/huandu/go-sqlbuilder"
	"github.com/jmoiron/sqlx"
)

type StudentRepository struct {
    DB *sqlx.DB
}

func NewStudentRepository(db *sqlx.DB) *StudentRepository {
    return &StudentRepository{DB: db}
}

// Fetch all students by department
// func (r *StudentRepository) GetAllStudents(ctx context.Context, department string) ([]model.Student, error) {
//     var students []model.Student
//     studentQuery := `
//         SELECT reg_no, name, email, department
//         FROM student
//     `
//     var args []interface{}
//     if strings.ToLower(department) != "admin" && strings.ToLower(department) != "all" {
//         studentQuery += " WHERE department = $1"
//         args = append(args, department)
//     }
//     log.Printf("Final query: %s, args: %+v", studentQuery, args)

//     err := r.DB.SelectContext(ctx, &students, studentQuery, args...)
//     if err != nil {
//         return nil, fmt.Errorf("error fetching students: %w", err)
//     }

//     for i, s := range students {
//         offers, err := r.getOffersForStudent(ctx, s.RegNo)
//         if err != nil {
//             return nil, err
//         }
//         students[i].Offers = offers
//     }

//     return students, nil
// }
func (r *StudentRepository) GetAllStudents(ctx context.Context, department string) ([]model.Student, error) {
    var students []model.Student

    studentQuery := `SELECT reg_no, name, email, department FROM student`
    var args []interface{}

    // if strings.ToLower(department) != "all" {
    //     studentQuery += " WHERE department = $1"
    //     args = append(args, department)
    // }
    if department != "admin" && department != "all" {
        studentQuery += " WHERE LOWER(department) = LOWER($1)"
        args = append(args, department)
    }

    log.Printf("🌀 Final query: %s | args: %v", studentQuery, args)

    err := r.DB.SelectContext(ctx, &students, studentQuery, args...)
    if err != nil {
        return nil, fmt.Errorf("error fetching students: %w", err)
    }

    // Attach offers
    for i, s := range students {
        offers, err := r.getOffersForStudent(ctx, s.RegNo)
        if err != nil {
            return nil, err
        }
        students[i].Offers = offers
    }

    return students, nil
}

// Fetch student by registration number
func (r *StudentRepository) GetStudentByRegNo(ctx context.Context, regNo string) (*model.Student, error) {
    var student model.Student

    query := "SELECT reg_no, name, email, department FROM student WHERE reg_no = $1"
    err := r.DB.GetContext(ctx, &student, query, regNo)
    if err != nil {
        return nil, fmt.Errorf("error fetching student: %w", err)
    }

    student.Offers, err = r.getOffersForStudent(ctx, student.RegNo)
    if err != nil {
        return nil, err
    }

    return &student, nil
}

// Helper to fetch offers for a student
func (r *StudentRepository) getOffersForStudent(ctx context.Context, regNo string) ([]model.Offer, error) {
    var offers []model.Offer
    query := `
        SELECT company_name AS company, stipend, ppo_i AS "ppoI", ppo, i
        FROM company_student
        WHERE reg_no = $1
    `
    err := r.DB.SelectContext(ctx, &offers, query, regNo)
    if err != nil {
        return nil, fmt.Errorf("error fetching offers: %w", err)
    }
    return offers, nil
}

// Create student (without offers)
func (r *StudentRepository) CreateStudent(ctx context.Context, student *model.Student) error {
    query := `
        INSERT INTO student (reg_no, name, email, department)
        VALUES ($1, $2, $3, $4)
    `
    _, err := r.DB.ExecContext(ctx, query, student.RegNo, student.Name, student.Email, student.Department)
    if err != nil {
        return fmt.Errorf("error inserting student: %w", err)
    }

    for _, offer := range student.Offers {
        err := r.insertOffer(ctx, student.RegNo, student, offer)
        if err != nil {
            return err
        }
    }

    return nil
}

// Update student and replace offers
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

    log.Println("Executing student update query:", query)
    log.Println("With args:", args)

    _, err := r.DB.ExecContext(ctx, query, args...)
    if err != nil {
        return fmt.Errorf("error updating student: %w", err)
    }

    // Refresh offers
    _, err = r.DB.ExecContext(ctx, "DELETE FROM company_student WHERE reg_no = $1", student.RegNo)
    if err != nil {
        return fmt.Errorf("error clearing old offers: %w", err)
    }

    for _, offer := range student.Offers {
        err := r.insertOffer(ctx, student.RegNo, student, offer)
        if err != nil {
            return err
        }
    }

    return nil
}

// Insert offer helper
func (r *StudentRepository) insertOffer(ctx context.Context, regNo string, student *model.Student, offer model.Offer) error {
    query := `
        INSERT INTO company_student (
            company_name, reg_no, student_name, email,
            stipend, ppo_i, ppo, i, department
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `
    _, err := r.DB.ExecContext(ctx, query,
        offer.Company,
        regNo,
        student.Name,
        student.Email,
        offer.Stipend,
        offer.PPOI,
        offer.PPO,
        offer.I,
        student.Department,
    )
    if err != nil {
        return fmt.Errorf("error inserting offer for %s: %w", regNo, err)
    }
    return nil
}

// Delete student
func (r *StudentRepository) DeleteStudent(ctx context.Context, regNo string) error {
    _, err := r.DB.ExecContext(ctx, "DELETE FROM student WHERE reg_no = $1", regNo)
    if err != nil {
        return fmt.Errorf("error deleting student: %w", err)
    }
    return nil
}

// Get students by department
func (r *StudentRepository) GetStudentsByDepartment(ctx context.Context, dept string) ([]model.Student, error) {
    // 1. Get students in department
    studentQuery := `
        SELECT reg_no, name, email, department
        FROM student
        WHERE department = $1
    `
    var students []model.Student
    if err := r.DB.SelectContext(ctx, &students, studentQuery, dept); err != nil {
        return nil, fmt.Errorf("error fetching students: %w", err)
    }

    // 2. Map for fast lookup
    studentMap := make(map[string]*model.Student)
    for i := range students {
        studentMap[students[i].RegNo] = &students[i]
    }

    // 3. Get offers for all students in this department
    offerQuery := `
        SELECT reg_no, company_name, stipend, ppo_i, ppo, i
        FROM company_student
        WHERE department = $1
    `
    var offers []struct {
        RegNo    string         `db:"reg_no"`
        model.Offer
    }
    if err := r.DB.SelectContext(ctx, &offers, offerQuery, dept); err != nil {
        return nil, fmt.Errorf("error fetching offers: %w", err)
    }

    // 4. Attach offers to respective students
    for _, offer := range offers {
        if student, exists := studentMap[offer.RegNo]; exists {
            student.Offers = append(student.Offers, offer.Offer)
        }
    }

    return students, nil
}