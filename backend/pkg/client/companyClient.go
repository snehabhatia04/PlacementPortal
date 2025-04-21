package client

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"

	"Placement-Portal/pkg/model"
	"Placement-Portal/portal_service/config"
)

// CompanyClient struct
type CompanyClient struct {
	BaseURL string
}

// NewCompanyClient initializes a new CompanyClient
func NewCompanyClient(cfg *config.Config) *CompanyClient {
    return &CompanyClient{
        BaseURL: cfg.CompanyServiceURL,
    }
}

// Fetch all companies
func (cc *CompanyClient) GetAllCompanies() ([]model.Company, error) {
	url := fmt.Sprintf("%s/companies", cc.BaseURL)

	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("failed to fetch companies, status code: %d", resp.StatusCode)
	}

	var companies []model.Company
	if err := json.NewDecoder(resp.Body).Decode(&companies); err != nil {
		return nil, err
	}

	return companies, nil
}

// Fetch company by Name
func (cc *CompanyClient) GetCompanyByName(name string) (*model.Company, error) {
	url := fmt.Sprintf("%s/companies/%s", cc.BaseURL, name)

	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusNotFound {
		return nil, errors.New("company not found")
	} else if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("failed to fetch company, status code: %d", resp.StatusCode)
	}

	var company model.Company
	if err := json.NewDecoder(resp.Body).Decode(&company); err != nil {
		return nil, err
	}

	return &company, nil
}

// Create a new company
func (cc *CompanyClient) CreateCompany(company *model.Company) error {
	url := fmt.Sprintf("%s/companies", cc.BaseURL)

	jsonData, err := json.Marshal(company)
	if err != nil {
		return err
	}

	resp, err := http.Post(url, "application/json", bytes.NewBuffer(jsonData))
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusCreated {
		body, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("failed to create company: %s", string(body))
	}

	return nil
}

// Update company details
func (cc *CompanyClient) UpdateCompany(company model.Company) error {
	url := fmt.Sprintf("%s/companies", cc.BaseURL)

	jsonData, err := json.Marshal(company)
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
		return fmt.Errorf("failed to update company: %s", string(body))
	}

	return nil
}

// Delete a company by Name
func (cc *CompanyClient) DeleteCompany(name string) error {
	url := fmt.Sprintf("%s/companies/%s", cc.BaseURL, name)

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
		return fmt.Errorf("failed to delete company: %s", string(body))
	}

	return nil
}
