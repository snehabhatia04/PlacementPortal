package repository

import (
	"errors"
	"log"
	"strconv"

	"Placement-Portal/pkg/model"

	"github.com/jmoiron/sqlx"
	"golang.org/x/crypto/bcrypt"
)

type UserRepository struct {
	DB *sqlx.DB
}

func NewUserRepository(db *sqlx.DB) *UserRepository {
	return &UserRepository{DB: db}
}

// CreateUser inserts a new user into the users table
func (repo *UserRepository) CreateUser(user model.User) (int, error) {
	query := `INSERT INTO users (name, email, password_hash, role, department, session_id, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`
	var id int
	err := repo.DB.QueryRow(query, user.Name, user.Email, user.PasswordHash, user.Role, user.Department, user.SessionID, user.Status).Scan(&id)
	if err != nil {
		log.Printf("Error creating user: %v", err)
		return 0, err
	}
	return id, nil
}

// GetUserByEmail fetches a user by email
func (repo *UserRepository) GetUserByEmail(email string) (*model.User, error) {
	var user model.User
	query := `SELECT id, name, email, password_hash, role, department, session_id, status FROM users WHERE email = $1`
	err := repo.DB.Get(&user, query, email)
	if err != nil {
		log.Printf("Error fetching user by email: %v", err)
		return nil, err
	}
	return &user, nil
}

// ValidateUserCredentials checks email-password pair validity
func (repo *UserRepository) ValidateUserCredentials(email, password string) (bool, error) {
	user, err := repo.GetUserByEmail(email)
	if err != nil {
		return false, err
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(password))
	if err != nil {
		return false, errors.New("invalid credentials")
	}

	return true, nil
}

// UpdateUser updates user details selectively
func (repo *UserRepository) UpdateUser(id int, name *string, password *string, department *string, role *string, status *bool) error {
	query := "UPDATE users SET updated_at = NOW()"
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
	if department != nil {
		query += ", department = $" + strconv.Itoa(argIndex)
		args = append(args, *department)
		argIndex++
	}
	if role != nil {
		query += ", role = $" + strconv.Itoa(argIndex)
		args = append(args, *role)
		argIndex++
	}
	if status != nil {
		query += ", status = $" + strconv.Itoa(argIndex)
		args = append(args, *status)
		argIndex++
	}

	if argIndex == 1 {
		return errors.New("no fields to update")
	}

	query += " WHERE id = $" + strconv.Itoa(argIndex)
	args = append(args, id)

	_, err := repo.DB.Exec(query, args...)
	if err != nil {
		log.Printf("Error updating user: %v", err)
		return err
	}

	return nil
}

func (ur *UserRepository) GetAllUsers() ([]model.User, error) {
	var users []model.User
	err := ur.DB.Select(&users, "SELECT * FROM users")
	if err != nil {
		return nil, err
	}
	return users, nil
}

// UpdateStatus updates the user's status field by ID
func (repo *UserRepository) UpdateStatus(userID int, newStatus string) error {
	query := `UPDATE users SET status = $1 WHERE id = $2`
	_, err := repo.DB.Exec(query, newStatus, userID)
	if err != nil {
		log.Printf("Error updating user status: %v", err)
	}
	return err
}

// UpdatePassword updates the user's password hash by ID
func (repo *UserRepository) UpdatePassword(userID int, newPassword string) error {
	query := `UPDATE users SET password_hash = $1 WHERE id = $2`
	_, err := repo.DB.Exec(query, newPassword, userID)
	if err != nil {
		log.Printf("Error updating user password: %v", err)
	}
	return err
}

func (repo *UserRepository) UpdatePasswordAndStatus(userID int, newPasswordHash, newStatus string) error {
    _, err := repo.DB.Exec(`
        UPDATE users
        SET password_hash = $1, status = $2
        WHERE id = $3
    `, newPasswordHash, newStatus, userID)
    return err
}


// DeleteUser removes a user from the users table
func (repo *UserRepository) DeleteUser(id int) error {
	query := `DELETE FROM users WHERE id = $1`
	result, err := repo.DB.Exec(query, id)
	if err != nil {
		log.Printf("Error deleting user: %v", err)
		return err
	}

	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		return errors.New("no user found with the given ID")
	}

	return nil
}

// GetUsersByRole fetches all users of a specific role (optional department filter)
func (repo *UserRepository) GetUsersByRole(role string, department *string) ([]model.User, error) {
	var users []model.User
	query := `SELECT id, name, email, role, department, session_id, status FROM users WHERE role = $1`
	args := []interface{}{role}

	if department != nil {
		query += " AND department = $2"
		args = append(args, *department)
	}

	err := repo.DB.Select(&users, query, args...)
	if err != nil {
		log.Printf("Error fetching users by role: %v", err)
		return nil, err
	}

	return users, nil
}
