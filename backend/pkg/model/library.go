package model

type Offer struct {
	Company string  `json:"company" db:"company_name"`
	Stipend float64 `json:"stipend" db:"stipend"`
	PPOI    bool    `json:"ppoI" db:"ppo_i"`
	PPO     bool    `json:"ppo" db:"ppo"`
	I       bool    `json:"i" db:"i"`
}

type Student struct {
	RegNo      string  `json:"regNo" db:"reg_no"`
	Name       string  `json:"name" db:"name"`
	Email      string  `json:"email" db:"email"`
	Department string  `json:"department" db:"department"`
	Offers     []Offer `json:"offers"`
}

type Department struct {
	ID   int    `json:"id" gorm:"primaryKey;autoIncrement"`
	Name string `json:"name"`
}

type Company struct {
	Name string `json:"name" gorm:"primarykey"`
}

// CompanyStudent represents a student assigned to a company
type CompanyStudent struct {
	ID          int     `db:"id" json:"id"`
	CompanyName string  `db:"company_name" json:"company_name"`
	RegNo       string  `db:"reg_no" json:"reg_no"`
	StudentName string  `db:"student_name" json:"student_name"`
	Email       string  `db:"email" json:"email"`
	Stipend     float64 `db:"stipend" json:"stipend"`
	PPO_I       bool    `db:"ppo_i" json:"ppo_i"`
	PPO         bool    `db:"ppo" json:"ppo"`
	I           bool    `db:"i" json:"i"`
	Department  string  `db:"department" json:"department"`
}

type Admin struct {
	ID           int    `json:"id" gorm:"primaryKey;autoIncrement"`
	Name         string `json:"name"`
	Email        string `json:"email" gorm:"unique"`
	PasswordHash string `json:"password_hash"`
	Dept         string `json:"dept" db:"dept"`
}

type Faculty struct {
	ID           int    `json:"id" db:"id" gorm:"primaryKey;autoIncrement"`
	Name         string `json:"name" db:"name"`
	Email        string `json:"email" db:"email" gorm:"unique"`
	PasswordHash string `json:"password_hash" db:"password_hash"`
	Dept         string `json:"dept" db:"dept"`
}