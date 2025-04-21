package client

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"

	"log"
	"net/http"

	"Placement-Portal/pkg/model"
	"Placement-Portal/portal_service/config"
)

// StudentClient struct
type StudentClient struct {
	BaseURL string
}

// NewStudentClient initializes a new StudentClient
func NewStudentClient(cfg *config.Config) *StudentClient {
	return &StudentClient{
		BaseURL: cfg.StudentServiceURL,
	}
}
	
//fetch all students
func (sc *StudentClient) GetAllStudents(department string) ([]model.Student, error) {
    url := fmt.Sprintf("%s/students?department=%s", sc.BaseURL, department)
    log.Println("📡 Calling:", url)

    resp, err := http.Get(url)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        return nil, fmt.Errorf("failed to fetch students, status code: %d", resp.StatusCode)
    }

    var students []model.Student
    if err := json.NewDecoder(resp.Body).Decode(&students); err != nil {
        return nil, err
    }

    return students, nil
}

// Fetch student by Registration Number
func (sc *StudentClient) GetStudentByRegNo(regNo string) (*model.Student, error) {
	url := fmt.Sprintf("%s/students?reg_no=%s", sc.BaseURL, regNo)

	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusNotFound {
		return nil, errors.New("student not found")
	} else if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("failed to fetch student, status code: %d", resp.StatusCode)
	}

	var student model.Student
	if err := json.NewDecoder(resp.Body).Decode(&student); err != nil {
		return nil, err
	}

	return &student, nil
}

// Create a new student
func (sc *StudentClient) CreateStudent(student *model.Student) error {
	url := fmt.Sprintf("%s/students/", sc.BaseURL)

	jsonData, err := json.Marshal(student)
	if err != nil {
		return err
	}

	resp, err := http.Post(url, "application/json", bytes.NewBuffer(jsonData))
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusCreated{
		body, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("failed to create student: %s", string(body))
	}

	return nil
}

// Update student
func (sc *StudentClient) UpdateStudent(student model.Student) error {
	url := fmt.Sprintf("%s/students", sc.BaseURL)

	jsonData, err := json.Marshal(student)
	if err != nil {
		return err
	}

	req, err := http.NewRequest(http.MethodPut, url, bytes.NewBuffer(jsonData))
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("failed to update student: %s", string(body))
	}

	return nil
}

// Delete a student
func (sc *StudentClient) DeleteStudent(regNo string) error {
	url := fmt.Sprintf("%s/students/%s", sc.BaseURL, regNo)

	req, err := http.NewRequest(http.MethodDelete, url, nil)
	if err != nil {
		return err
	}

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("failed to delete student: %s", string(body))
	}

	return nil
}

// SaveCompanyStudent sends a new offer to the student service
func (sc *StudentClient) SaveCompanyStudent(offer model.CompanyStudent) error {
    url := fmt.Sprintf("%s/students/offer", sc.BaseURL)

    jsonData, err := json.Marshal(offer)
    if err != nil {
        return fmt.Errorf("failed to marshal offer: %w", err)
    }

    resp, err := http.Post(url, "application/json", bytes.NewBuffer(jsonData))
    if err != nil {
        return fmt.Errorf("request failed: %w", err)
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusCreated && resp.StatusCode != http.StatusOK {
        body, _ := io.ReadAll(resp.Body)
        return fmt.Errorf("failed to save offer: %s", string(body))
    }

    return nil
}