// import { RolePermissions } from "../constants/permissions";
// import { getCurrentUser } from "./user";

// export function hasPermission(permission) {
//   const user = getCurrentUser();
//   if (!user || !user.role) return false;
//   const permissions = RolePermissions[user.role] || [];
//   return permissions.includes(permission);
// }
import { RolePermissions } from "../constants/permissions";
import { getCurrentUser } from "./user";

export function hasPermission(permission, targetDepartment = null) {
  const user = getCurrentUser();
  if (!user || !user.role) return false;

  const userPermissions = RolePermissions[user.role] || [];

  // 1. Full permission match
  if (userPermissions.includes(permission)) return true;

  // 2. Department-restricted logic
  if (
    permission === "view_own_department_students" &&
    targetDepartment &&
    user.department &&
    user.department === targetDepartment
  ) {
    return userPermissions.includes("view_own_department_students");
  }

  if (
    permission === "view_companywise_students_own_dept" &&
    targetDepartment &&
    user.department === targetDepartment
  ) {
    return userPermissions.includes("view_companywise_students_own_dept");
  }

  return false;
}
