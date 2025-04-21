package config

import (
	"fmt"
	"log"
	"os"

	"github.com/jmoiron/sqlx"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

// Config struct holds application configuration
type Config struct {
	Port   string
	DB_URL string
}

// LoadConfig loads configuration from environment variables
func LoadConfig() (*Config, error) {
	// Load environment variables from .env file
	err := godotenv.Load("company_service/.env")
	if err != nil {
		log.Println("Warning: No .env file found. Using system environment variables.")
	}

	// Retrieve config values
	config := &Config{
		Port:   os.Getenv("COMPANY_SERVICE_PORT"),
		DB_URL: os.Getenv("DATABASE_URL"),
	}

	// Ensure required values are set
	if config.Port == "" {
		return nil, fmt.Errorf("server port is required")
	}
	if config.DB_URL == "" {
		return nil, fmt.Errorf("database URL is required")
	}

	return config, nil
}

// InitDB initializes a PostgreSQL database connection
func InitDB(dbURL string) (*sqlx.DB, error) {
	db, err := sqlx.Connect("postgres", dbURL)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}
	log.Println("Connected to the database successfully!")
	return db, nil
}
