package config

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Port              string
	StudentServiceURL string
	CompanyServiceURL string
	JwtSecretKey      string
	DepartmentServiceURL string
	DBUrl             string
}

func LoadConfig() (*Config, error) {
	err := godotenv.Load("portal_service/.env")
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
		return nil, err
	}
	fmt.Println("DATABASE_URL from env:", os.Getenv("DATABASE_URL"))

	config := &Config{
		Port:              os.Getenv("PORTAL_SERVICE_PORT"),
		StudentServiceURL: os.Getenv("STUDENT_SERVICE_URL"),
		CompanyServiceURL: os.Getenv("COMPANY_SERVICE_URL"),
		JwtSecretKey:      os.Getenv("JWT_SECRET_KEY"),
		DepartmentServiceURL: os.Getenv("DEPARTMENT_SERVICE_URL"),
		DBUrl:             os.Getenv("DATABASE_URL"),
	}

		
	if config.JwtSecretKey == "" {
		return nil, fmt.Errorf("JWT secret key is required")
	}

	return config, nil
}

// func (c *Config) GetDatabaseURL() string {
// 	return c.DBUrl
// }
func (c *Config) GetDatabaseURL() string {
    return os.Getenv("DATABASE_URL")
}
