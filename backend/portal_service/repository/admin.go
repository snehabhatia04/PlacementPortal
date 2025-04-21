package repository

import (
	"database/sql"
	"errors"
	"fmt"
	"log"

	"Placement-Portal/pkg/database"
	"Placement-Portal/pkg/model"

	"github.com/jmoiron/sqlx"
	"golang.org/x/crypto/bcrypt"
)

type AdminRepository struct {
	DB *sqlx.DB
}

// NewAdminRepository initializes an AdminRepository
func NewAdminRepository(db *sqlx.DB) *AdminRepository {
	return &AdminRepository{DB: db}
}

// CreateAdmin inserts a new admin into the database
func (repo *AdminRepository) CreateAdmin(admin model.Admin) (int, error) {
	query := `INSERT INTO admin (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id`
	var id int
	err := repo.DB.QueryRow(query, admin.Name, admin.Email, admin.PasswordHash).Scan(&id)
	if err != nil {
		log.Printf("Error creating admin: %v", err)
		return 0, err
	}
	return id, nil
}

// GetAdminByEmail fetches an admin by email
func (repo *AdminRepository) GetAdminByEmail(email string) (*model.Admin, error) {
	query := `SELECT id, name, email, password_hash FROM admin WHERE email = $1`
	var admin model.Admin
	err := repo.DB.QueryRow(query, email).Scan(&admin.ID, &admin.Name, &admin.Email, &admin.PasswordHash)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, errors.New("admin not found")
		}
		log.Printf("Error fetching admin by email: %v", err)
		return nil, err
	}
	return &admin, nil
}

// ValidateAdminCredentials checks if the provided email and password are correct
func (repo *AdminRepository) ValidateAdminCredentials(email, password string) (bool, error) {
	admin, err := repo.GetAdminByEmail(email)
	if err != nil {
		return false, err
	}

	err = bcrypt.CompareHashAndPassword([]byte(admin.PasswordHash), []byte(password))
	if err != nil {
		return false, errors.New("invalid credentials")
	}

	return true, nil
}

// UpdateAdmin updates admin details
func (repo *AdminRepository) UpdateAdmin(id int, name *string, password *string) error {
    db := database.GetDB()

    var admin model.Admin

    // Fetch the existing admin
    err := db.Get(&admin, "SELECT * FROM admin WHERE id = $1", id)
    if err != nil {
        return fmt.Errorf("admin not found: %v", err)
    }

    // Prepare the update query dynamically
    query := "UPDATE admin SET "
    args := []interface{}{}
    argIndex := 1

    if name != nil {
        query += fmt.Sprintf("name = $%d, ", argIndex)
        args = append(args, *name)
        argIndex++
    }
    if password != nil {
        query += fmt.Sprintf("password_hash = $%d, ", argIndex)
        args = append(args, *password)
        argIndex++
    }

    // Remove trailing comma and space
    query = query[:len(query)-2] + " WHERE id = $" + fmt.Sprintf("%d", argIndex)
    args = append(args, id)

    // Execute the update query
    _, err = db.Exec(query, args...)
    if err != nil {
        return fmt.Errorf("failed to update admin: %v", err)
    }

    return nil
}


// DeleteAdmin removes an admin from the database
func (repo *AdminRepository) DeleteAdmin(id int) error {
	query := `DELETE FROM admin WHERE id = $1`
	result, err := repo.DB.Exec(query, id)
	if err != nil {
		log.Printf("Error deleting admin: %v", err)
		return err
	}

	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		return errors.New("no admin found with the given ID")
	}

	return nil
}
