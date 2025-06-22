package main

import (
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

func main() {
	// Replace this with your hashed password copied from DB
	hashedPassword := "$2a$10$5zew8JAI7CGPB3X75GZjB.i9vpDFDiGmuBGh.Ws57Z.3LKLrKb3l6"

	// Replace this with the plaintext password you want to check
	plaintextPassword := "fpc123"

	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(plaintextPassword))
	if err != nil {
		fmt.Println("❌ Password does NOT match!")
	} else {
		fmt.Println("✅ Password matches!")
	}
}

