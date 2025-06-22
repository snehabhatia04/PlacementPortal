// type Offer struct {
// 	Company string  `json:"company" db:"company_name"`
// 	Stipend float64 `json:"stipend" db:"stipend"`
// 	PPOI    bool    `json:"ppoI" db:"ppo_i"`
// 	PPO     bool    `json:"ppo" db:"ppo"`
// 	I       bool    `json:"i" db:"i"`
// }

// type Admin struct {
// 	ID           int    `json:"id" gorm:"primaryKey;autoIncrement"`
// 	Name         string `json:"name"`
// 	Email        string `json:"email" gorm:"unique"`
// 	PasswordHash string `json:"password_hash"`
// 	Dept         string `json:"dept" db:"dept"`
// }

// type Faculty struct {
// 	ID           int    `json:"id" db:"id" gorm:"primaryKey;autoIncrement"`
// 	Name         string `json:"name" db:"name"`
// 	Email        string `json:"email" db:"email" gorm:"unique"`
// 	PasswordHash string `json:"password_hash" db:"password_hash"`
// 	Dept         string `json:"dept" db:"dept"`
// }

package model

// Session table model
type Session struct {
	ID   int    `json:"id" db:"id"`
	Name string `json:"name" db:"name"`
}

// User table model (replaces Admin + Faculty)
type User struct {
	ID           int     `json:"id" db:"id"`
	Name         string  `json:"name" db:"name"`
	Email        string  `json:"email" db:"email"`
	PasswordHash string  `json:"-" db:"password_hash"`
	Role         string  `json:"role" db:"role"`
	Department   *string `json:"department,omitempty" db:"department"`
	SessionID    int     `json:"session_id" db:"session_id"`
	Status       string  `json:"status" db:"status"`  // New field
    CreatedAt    string   `json:"created_at" db:"created_at"` // Optional
    UpdatedAt    string   `json:"updated_at" db:"updated_at"` // Optional
}

// Department table model
type Department struct {
	ID   int    `json:"id" db:"id"`
	Name string `json:"name" db:"name"`
}

// Company table model
type Company struct {
	Name string `json:"name" db:"name"`
}

// Student core data (before placement outcomes)
type Student struct {
	RegNo      string `json:"reg_no" db:"reg_no"`
	Name       string `json:"name" db:"name"`
	Email      string `json:"email" db:"email"`
	Department string `json:"department" db:"department"`
	MobileNo   string `json:"mobile_no" db:"mobile_no"`
	SessionID  int    `json:"session_id" db:"session_id"`
	Companies  []CompanyStudent  `json:"companies,omitempty"`
}

// Mapping students selected by companies
type CompanyStudent struct {
	ID          int     `json:"id" db:"id"`
	CompanyName string  `json:"company_name" db:"company_name"`
	RegNo       string  `json:"reg_no" db:"reg_no"`
	StudentName string  `json:"student_name" db:"student_name"`
	Email       string  `json:"email" db:"email"`
	Stipend     float64 `json:"stipend" db:"stipend"`
	Package     float64 `json:"package" db:"package"`
	PPOI        bool    `json:"ppo_i" db:"ppo_i"`
	PPO         bool    `json:"ppo" db:"ppo"`
	I           bool    `json:"i" db:"i"`
	Department  string  `json:"department" db:"department"`
}

// StudentPlacement final outcome record
type StudentPlacement struct {
	ID                 int      `json:"id" db:"id"`
	RegNo              string   `json:"reg_no" db:"reg_no"`
	Name               string   `json:"name" db:"name"`
	Department         string   `json:"department" db:"department"`
	Email              string   `json:"email" db:"email"`
	MobileNo           string   `json:"mobile_no" db:"mobile_no"`
	SessionID          int      `json:"session_id" db:"session_id"`
	PlacementStatus    string   `json:"placement_status" db:"placement_status"`
	CompanyName        *string  `json:"company_name,omitempty" db:"company_name"`
	OnCampus           *bool    `json:"on_campus,omitempty" db:"on_campus"`
	OfferType          *string  `json:"offer_type,omitempty" db:"offer_type"`
	Stipend            *float64 `json:"stipend,omitempty" db:"stipend"`
	Package            *float64 `json:"package,omitempty" db:"package"`
	HigherStudyCollege *string  `json:"higher_study_college,omitempty" db:"higher_study_college"`
	HigherStudyDegree  *string  `json:"higher_study_degree,omitempty" db:"higher_study_degree"`
	HigherStudyCountry *string  `json:"higher_study_country,omitempty" db:"higher_study_country"`
	FirmName           *string  `json:"firm_name,omitempty" db:"firm_name"`
	FirmRegNo          *string  `json:"firm_reg_no,omitempty" db:"firm_reg_no"`
	GstNo              *string  `json:"gst_no,omitempty" db:"gst_no"`
	RoleInFirm         *string  `json:"role_in_firm,omitempty" db:"role_in_firm"`
	CreatedAt          string   `json:"created_at" db:"created_at"`
}
