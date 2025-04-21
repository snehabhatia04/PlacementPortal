package repository

import (
	"errors"
	"log"
	"strconv"

	"Placement-Portal/pkg/database"
	"Placement-Portal/pkg/model"

	"github.com/jmoiron/sqlx"
	"golang.org/x/crypto/bcrypt"
)

// FacultyRepository manages faculty-related operations
type FacultyRepository struct{
    DB *sqlx.DB
}

func NewFacultyRepository(db *sqlx.DB) *FacultyRepository {
    return &FacultyRepository{DB: db}
}

// CreateFaculty inserts a new placement faculty into the database
func (repo *FacultyRepository) CreateFaculty(faculty model.Faculty) (int, error) {
    db := database.GetDB()
    
    query := `INSERT INTO faculty (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id`
    var id int
    err := db.QueryRow(query, faculty.Name, faculty.Email, faculty.PasswordHash).Scan(&id)
    if err != nil {
        log.Printf("Error creating faculty: %v", err)
        return 0, err
    }
    return id, nil
}


func (repo *FacultyRepository) GetFacultyByEmail(email string) (*model.Faculty, error) {
    var faculty model.Faculty

    query := `SELECT id, name, email, password_hash FROM faculty WHERE email = $1`
    log.Printf("Query: %s", query)
    log.Printf("Email Param: %s", email)

    err := repo.DB.Get(&faculty, query, email)
    if err != nil {
        log.Printf("Error fetching faculty by email: %v", err)
        return nil, err
    }

    log.Printf("Faculty fetched: %+v", faculty)

    return &faculty, nil
}


// ValidateFacultyCredentials checks if the provided email and password are correct
func (repo *FacultyRepository) ValidateFacultyCredentials(email, password string) (bool, error) {
    faculty, err := repo.GetFacultyByEmail(email)
    if err != nil {
        return false, err
    }

    err = bcrypt.CompareHashAndPassword([]byte(faculty.PasswordHash), []byte(password))
    if err != nil {
        return false, errors.New("invalid credentials")
    }

    return true, nil
}

// UpdateFaculty updates placement faculty details
func (repo *FacultyRepository) UpdateFaculty(id int, name *string, password *string) error {
    db := database.GetDB()
    
    query := "UPDATE faculty SET updated_at = NOW()"
    var args []interface{}
    argIndex := 1

    if name != nil {
        query += ", name = $" + strconv.Itoa(argIndex)
        args = append(args, *name)
        argIndex++
    }

    if password != nil {
        query += ", password_hash = $" + strconv.Itoa(argIndex)
        args = append(args, *password)
        argIndex++
    }

    query += " WHERE id = $" + strconv.Itoa(argIndex)
    args = append(args, id)

    _, err := db.Exec(query, args...)
    return err
}

// DeleteFaculty removes a placement faculty from the database
func (repo *FacultyRepository) DeleteFaculty(id int) error {
    db := database.GetDB()

    query := `DELETE FROM faculty WHERE id = $1`
    result, err := db.Exec(query, id)
    if err != nil {
        log.Printf("Error deleting faculty: %v", err)
        return err
    }

    rowsAffected, _ := result.RowsAffected()
    if rowsAffected == 0 {
        return errors.New("no faculty found with the given ID")
    }

    return nil
}
