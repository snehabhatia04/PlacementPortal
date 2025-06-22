package middleware

import (
	"Placement-Portal/pkg/constants"
	"net/http"

	"github.com/gin-gonic/gin"
)

func PermissionMiddleware(permission string) gin.HandlerFunc {
    return func(c *gin.Context) {
        roleI, exists := c.Get("role")
        if !exists {
            c.JSON(http.StatusForbidden, gin.H{"error": "Unauthorized — role missing in token"})
            c.Abort()
            return
        }

        role := roleI.(string)

        // Admin bypass
        if role == "admin" {
            c.Next()
            return
        }

        perms, exists := constants.RolePermissions[role]
        if !exists {
            c.JSON(http.StatusForbidden, gin.H{"error": "Unauthorized role"})
            c.Abort()
            return
        }

        for _, p := range perms {
            if p == permission {
                c.Next()
                return
            }
        }

        c.JSON(http.StatusForbidden, gin.H{"error": "Permission denied"})
        c.Abort()
    }
}
