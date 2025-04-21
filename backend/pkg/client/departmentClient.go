package client

import (
	"Placement-Portal/pkg/model"
	"Placement-Portal/portal_service/config"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
)

// DepartmentClient struct holds the HTTP client and the base URL for the department service.
type DepartmentClient struct {
    BaseURL string
    Client  *http.Client
}

// NewDepartmentClient initializes and returns a new DepartmentClient.
func NewDepartmentClient(cfg *config.Config) *DepartmentClient {
    return &DepartmentClient{
        BaseURL: cfg.DepartmentServiceURL,
        Client:  &http.Client{},
    }
}

// GetAllDepartments retrieves all departments from the department service.
func (dc *DepartmentClient) GetAllDepartments() ([]model.Department, error) {
    url := fmt.Sprintf("%s/departments", dc.BaseURL) 
    // Making a GET request to fetch all departments
    resp, err := dc.Client.Get(url)
    if err != nil {
        return nil, fmt.Errorf("failed to make GET request: %v", err)
    }
    defer resp.Body.Close()

    // Check if the status code is 200 OK
    if resp.StatusCode != http.StatusOK {
        return nil, errors.New("failed to fetch departments, received non-200 status code")
    }

    // Decode the response body into a slice of Department structs
    var departments []model.Department
    if err := json.NewDecoder(resp.Body).Decode(&departments); err != nil {
        return nil, fmt.Errorf("failed to decode response: %v", err)
    }

    return departments, nil
}
