export const getCurrentUser = () => {
  try {
    const userRaw = localStorage.getItem("user");
    return userRaw ? JSON.parse(userRaw) : null;
  } catch (err) {
    console.error("Failed to parse user from localStorage:", err);
    return null;
  }
};

export const hasPermission = (permission) => {
  const user = getCurrentUser();
  if (!user) return false;

  const rolePermissions = {
    admin: ["create_user", "view_all", "add_company"],
    faculty: ["view_department"],
    fpc: ["view_department", "add_student"],
    placement_team: ["view_department"],
    dean: ["view_all"],
    assistant_dean: ["view_all"],
    vc: ["view_all"],
  };

  return (rolePermissions[user.role] || []).includes(permission);
};
