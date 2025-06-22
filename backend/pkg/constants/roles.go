// roles.go
package constants

const (
	RoleAdmin          = "admin"
	RoleFaculty        = "faculty"
	RoleFPC            = "fpc"
	RolePlacementTeam  = "placement_team"
	RoleDean           = "dean"
	RoleAssistantDean  = "assistant_dean"
	RoleVC             = "vc"
)
const (
	PermissionViewCompanies             = "view_companies"
	PermissionViewCompanywiseStudents   = "view_companywise_students"
	PermissionCreateCompany             = "create_company"
	PermissionUpdateCompany             = "update_company"
	PermissionDeleteCompany             = "delete_company"
	PermissionManageCompanyStudents     = "manage_company_students"
)

var RolePermissions = map[string][]string{
	RoleAdmin: {
		"create_student", "delete_student", "update_student",
		"view_all_students", "view_companies",
		"view_companywise_students", "create_user","create_company",
		"manage_company_students",
	},
	RoleFaculty: {
		"view_own_department_students", "view_companies",
		"view_companywise_students_own_dept",
	},
	RoleFPC: {
		"view_own_department_students", "add_off_campus_data",
		"view_companies", "view_companywise_students_own_dept",
	},
	RolePlacementTeam: {
		"view_all_students", "enter_on_campus_data",
		"view_companies", "view_companywise_students",
	},
	RoleDean: {
		"view_all_students", "view_companies",
		"view_companywise_students",
	},
	RoleAssistantDean: {
		"view_all_students", "view_companies",
		"view_companywise_students",
	},
	RoleVC: {
		"view_all_students", "view_companies",
		"view_companywise_students",
	},
}
