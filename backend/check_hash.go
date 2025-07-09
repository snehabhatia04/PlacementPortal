package main

import (
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

func main() {
	// Replace this with your hashed password copied from DB
	hashedPassword := "$2a$10$lpQ2gcoHFqW/5hAZDJ3YS.V.fTXfIkgHTZuCEMfGrp6H/hQOIyxGa"

	// Replace this with the plaintext password you want to check
	plaintextPassword := "admin123"

	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(plaintextPassword))
	if err != nil {
		fmt.Println("❌ Password does NOT match!")
	} else {
		fmt.Println("✅ Password matches!")
	}
}

