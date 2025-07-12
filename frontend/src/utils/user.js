export const getCurrentUser = () => {
  try {
    const userRaw = localStorage.getItem("user");
    return userRaw ? JSON.parse(userRaw) : null;
  } catch (err) {
    console.error("Failed to parse user from localStorage:", err);
    return null;
  }
};
