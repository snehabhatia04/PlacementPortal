package middleware

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func CorsHandlerMiddleware() gin.HandlerFunc {
	return cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},                   // Frontend origin
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}, // HTTP methods
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"}, // Request headers
		ExposeHeaders:    []string{"Content-Length", "Content-Type"},          // Response headers exposed to frontend
		AllowCredentials: true,                                                // Allow cookies, auth headers
		MaxAge:           12 * time.Hour,                                      // Cache duration for preflight (OPTIONS)
	})
}