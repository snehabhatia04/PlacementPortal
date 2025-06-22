package middleware

import (
	"log"
	"net/http"
	"strings"
	"sync"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

var (
	blacklistedTokens = make(map[string]bool)
	blacklistMutex    sync.RWMutex
)

func BlacklistToken(token string) {
	token = strings.TrimPrefix(token, "Bearer ")
	blacklistMutex.Lock()
	defer blacklistMutex.Unlock()
	blacklistedTokens[token] = true
}

func IsTokenBlacklisted(token string) bool {
	token = strings.TrimPrefix(token, "Bearer ")
	blacklistMutex.RLock()
	defer blacklistMutex.RUnlock()
	return blacklistedTokens[token]
}

func AuthMiddleware(jwtSecretKey string, requiredRole string) gin.HandlerFunc {
	return func(c *gin.Context) {
		log.Println("Inside AuthMiddleware")
		log.Println("MIDDLEWARE SECRET:", jwtSecretKey)
		log.Println("MIDDLEWARE ROLE:", requiredRole)

		tokenString := c.GetHeader("Authorization")
		if tokenString == "" {
			log.Println("No token provided")
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization token required"})
			c.Abort()
			return
		}

		log.Println("Raw Token:", tokenString)

		tokenString = strings.TrimPrefix(tokenString, "Bearer ")
		if IsTokenBlacklisted(tokenString) {
			log.Println("Token is blacklisted")
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Token has been invalidated"})
			c.Abort()
			return
		}

		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			return []byte(jwtSecretKey), nil
		})

		if err != nil || !token.Valid {
			log.Println("Invalid token:", err)
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			log.Println("Token claims parsing failed")
			c.JSON(http.StatusForbidden, gin.H{"error": "Access denied"})
			c.Abort()
			return
		}

		// Extract role
		userRole, ok := claims["role"].(string)
		if !ok {
			log.Println("Role missing in token claims")
			c.JSON(http.StatusForbidden, gin.H{"error": "Access denied"})
			c.Abort()
			return
		}

		// Role check only if requiredRole is provided (non-empty)
		if requiredRole != "" && userRole != requiredRole {
			log.Println("Role mismatch")
			c.JSON(http.StatusForbidden, gin.H{"error": "Access denied: unauthorized role"})
			c.Abort()
			return
		}

		// Extract optional department
		var department string
		if deptVal, exists := claims["dept"]; exists {
			department, _ = deptVal.(string)
		}

		// SessionID extraction (must be present)
		sessionIDFloat, ok := claims["session_id"].(float64)
		if !ok {
			log.Println("Session ID missing in token claims")
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Session not selected. Please login again."})
			c.Abort()
			return
		}
		sessionID := int(sessionIDFloat)

		// Save claims to context
		c.Set("id", claims["id"])
		c.Set("email", claims["email"])
		c.Set("role", userRole)
		c.Set("department", department)
		c.Set("session_id", sessionID)

		log.Println("Token verified, continuing to handler")
		c.Next()
	}
}
