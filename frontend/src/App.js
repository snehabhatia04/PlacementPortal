import {
  Box,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

// Components
import BatchSelectionPage from "./components/BatchSelectionPage";
import BranchDetails from "./components/BranchDetails";
import BranchSummary from "./components/BranchSummary";
import CompanyPage from "./components/CompanyPage";
import CreateUserPage from "./components/CreateUserPage";
import Dashboard from "./components/Dashboard";
import LoginPage from "./components/LoginPage";
import OffCampusPage from "./components/OffCampusPage";
import PlacementTable from "./components/PlacementTable";
import ResetPasswordPage from "./components/ResetPasswordPage";
import Sidebar from "./components/Sidebar";

// Context
import { PlacementProvider } from "./MainTable/MainPlacementTable";

const AppRoutes = ({
  isAuthenticated,
  token,
  handleLoginSuccess,
  handleLogout,
  darkMode,
  setDarkMode,
  selectedBatch,
  setSelectedBatch,
  userStatus,
}) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  let currentUser = { role: "" };
  try {
    const userRaw = localStorage.getItem("user");
    if (userRaw) currentUser = JSON.parse(userRaw);
  } catch (e) {
    console.error("Failed to parse user from localStorage:", e);
  }

  const ProtectedRoute = ({ children, roles }) => {
    if (!roles.includes(currentUser.role)) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <Box display="flex">
      {!isLoginPage && isAuthenticated && selectedBatch && (
        <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
      )}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route
            path="/login"
            element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          <Route
            path="/"
            element={
              isAuthenticated ? (
                userStatus === "reset_required" ? (
                  <Navigate to="/reset-password" />
                ) : selectedBatch ? (
                  <Dashboard token={token} handleLogout={handleLogout} />
                ) : (
                  <Navigate to="/select-batch" />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/select-batch"
            element={
              isAuthenticated ? (
                <BatchSelectionPage setSelectedBatch={setSelectedBatch} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/placements"
            element={
              isAuthenticated ? <PlacementTable /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/off"
            element={
              isAuthenticated ? <OffCampusPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/students/:branch"
            element={
              isAuthenticated && selectedBatch ? (
                <BranchDetails />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/create-user"
            element={
              isAuthenticated ? (
                <ProtectedRoute roles={["admin"]}>
                  <CreateUserPage />
                </ProtectedRoute>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/company/:companyName"
            element={
              isAuthenticated ? <CompanyPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/summary/:branch"
            element={
              isAuthenticated && selectedBatch ? (
                <BranchSummary />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Box>
    </Box>
  );
};

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [userStatus, setUserStatus] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Load from localStorage on initial mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const batch = localStorage.getItem("selectedBatch");

    if (storedToken && user) {
      setIsAuthenticated(true);
      setToken(storedToken);

      try {
        const parsedUser = JSON.parse(user);
        if (parsedUser.status) {
          setUserStatus(parsedUser.status);
        }
      } catch (e) {
        console.error("Error parsing user from localStorage", e);
      }
    }

    if (batch) {
      setSelectedBatch(batch);
    }
  }, []);

  // Auto logout if token vanishes from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      setIsAuthenticated(false);
      setToken(null);
      setUserStatus(null);
      setSelectedBatch(null);
      navigate("/login");
    }
  }, [location, navigate]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: { main: "#E87722" },
          background: { default: darkMode ? "#121212" : "#f9f9f9" },
        },
        typography: {
          fontFamily: "'Poppins', 'Segoe UI', sans-serif",
        },
      }),
    [darkMode]
  );

  const handleLoginSuccess = ({ token, user, status }) => {
    setIsAuthenticated(true);
    setToken(token);
    setUserStatus(status);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.removeItem("selectedBatch");
    setSelectedBatch(null);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setToken(null);
    setUserStatus(null);
    setSelectedBatch(null);
    localStorage.clear();
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PlacementProvider>
        <AppRoutes
          isAuthenticated={isAuthenticated}
          token={token}
          handleLoginSuccess={handleLoginSuccess}
          handleLogout={handleLogout}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          selectedBatch={selectedBatch}
          setSelectedBatch={setSelectedBatch}
          userStatus={userStatus}
        />
      </PlacementProvider>
    </ThemeProvider>
  );
};

export default App;
