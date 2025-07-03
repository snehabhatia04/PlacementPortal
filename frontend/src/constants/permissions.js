export const RolePermissions = {
  admin: [
    "create_student", "delete_student", "update_student",
    "view_all_students", "view_companies",
    "view_companywise_students", "create_user", "create_company",
    "manage_company_students",
  ],
  faculty: [
    "view_own_department_students", "view_companies",
    "view_companywise_students_own_dept",
  ],
  fpc: [
    "view_own_department_students", "add_off_campus_data",
    "view_companies", "view_companywise_students_own_dept",
  ],
  placement_team: [
    "view_all_students", "enter_on_campus_data",
    "view_companies", "view_companywise_students",
  ],
  dean: [
    "view_all_students", "view_companies",
    "view_companywise_students",
  ],
  assistant_dean: [
    "view_all_students", "view_companies",
    "view_companywise_students",
  ],
  vc: [
    "view_all_students", "view_companies",
    "view_companywise_students",
  ],
};
