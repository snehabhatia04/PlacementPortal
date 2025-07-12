// import { RolePermissions } from "../constants/permissions";
// import { getCurrentUser } from "./user";

// export function hasPermission(permission, targetDepartment = null) {
//   const user = getCurrentUser();
//   if (!user || !user.role) return false;

//   const userPermissions = RolePermissions[user.role] || [];

//   // Exact permission match
//   if (userPermissions.includes(permission)) return true;

//   // Department-scoped logic
//   if (
//     permission === "view_own_department_students" &&
//     targetDepartment &&
//     user.department === targetDepartment
//   ) {
//     return userPermissions.includes("view_own_department_students");
//   }

//   if (
//     permission === "view_companywise_students_own_dept" &&
//     targetDepartment &&
//     user.department === targetDepartment
//   ) {
//     return userPermissions.includes("view_companywise_students_own_dept");
//   }

//   return false;
// }
import { RolePermissions } from "../constants/permissions";

// ✅ Add this function export
export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch (e) {
    return null;
  }
}

export function hasPermission(permission, targetDepartment = null) {
  const user = getCurrentUser();
  if (!user || !user.role) return false;

  const userPermissions = RolePermissions[user.role] || [];

  // Exact match
  if (userPermissions.includes(permission)) return true;

  // Department-scoped fallback logic
  if (
    permission === "view_own_department_students" &&
    targetDepartment &&
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
