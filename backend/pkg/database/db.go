package database

import (
	"fmt"
	"log"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

// DB is the global database connection
var DB *sqlx.DB

// ConfigInterface defines the method to retrieve the database URL
type ConfigInterface interface {
	GetDatabaseURL() string
}

// Connect initializes the database connection
func Connect(cfg ConfigInterface) {
    dsn := cfg.GetDatabaseURL()
    fmt.Println("DSN:", dsn) // Add this

    var err error
    DB, err = sqlx.Connect("postgres", dsn)
    if err != nil {
        log.Fatalf("Error connecting to the database: %v", err)
    }

    fmt.Println("Database connection established")
}


// GetDB returns the current database instance
func GetDB() *sqlx.DB {
	if DB == nil {
		log.Fatal("Database not initialized. Call Connect() first.")
	}
	return DB
}

// Close terminates the database connection
func Close() {
	if DB != nil {
		err := DB.Close()
		if err != nil {
			log.Fatalf("Error closing the database connection: %v", err)
		} else {
			fmt.Println("Database connection closed")
		}
	}
}
