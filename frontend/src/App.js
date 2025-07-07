// import {
//   Box,
//   createTheme,
//   CssBaseline,
//   ThemeProvider,
// } from "@mui/material";
// import React, { useEffect, useMemo, useState } from "react";
// import {
//   Navigate,
//   Route,
//   BrowserRouter as Router,
//   Routes,
//   useLocation,
//   useParams,
// } from "react-router-dom";

// import BranchDetails from "./components/BranchDetails";
// import CompanyDetails from "./components/CompanyDetails";
// import CompanyPage from "./components/CompanyPage";
// import Dashboard from "./components/Dashboard";
// import LoginPage from "./components/LoginPage";
// import Sidebar from "./components/Sidebar";
// import StudentsByDepartment from "./components/StudentByDepartment";
// import StudentDetails from "./components/StudentDetails";

// import { PlacementProvider } from "./MainTable/MainPlacementTable";

// // 👇 Wrapper to provide Placement context for department-based routes
// const DepartmentProviderWrapper = () => {
//   const { department } = useParams();

//   return (
//     <PlacementProvider initialDepartment={department}>
//       <StudentsByDepartment />
//     </PlacementProvider>
//   );
// };

// const AppRoutes = ({
//   isAuthenticated,
//   token,
//   handleLoginSuccess,
//   handleLogout,
//   darkMode,
//   setDarkMode,
// }) => {
//   const location = useLocation();
//   const isLoginPage = location.pathname === "/login";

//   return (
//     <Box sx={{ display: "flex" }}>
//       {/* 👇 Hide sidebar on login */}
//       {!isLoginPage && isAuthenticated && (
//         <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
//       )}
//       <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
//         <Routes>
//           <Route
//             path="/login"
//             element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
//           />
//           <Route
//             path="/"
//             element={
//               isAuthenticated ? (
//                 <Dashboard token={token} onLogout={handleLogout} />
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />
//           <Route
//             path="/student-details"
//             element={isAuthenticated ? <StudentDetails /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/students/:department"
//             element={
//               isAuthenticated ? (
//                 <DepartmentProviderWrapper />
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />
//           <Route
//             path="/company-details"
//             element={isAuthenticated ? <CompanyDetails /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/branch-details"
//             element={isAuthenticated ? <BranchDetails /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/company/:companyName"
//             element={
//               isAuthenticated ? (
//                 <CompanyPage key={location.pathname} />
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />
//         </Routes>
//       </Box>
//     </Box>
//   );
// };

// function App() {
//   const [darkMode, setDarkMode] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [token, setToken] = useState(null);
//   const [loading, setLoading] = useState(true); // ✅ Fix loading on app mount

//   // useEffect(() => {
//   //   const savedToken = localStorage.getItem("token");
//   //   if (savedToken) {
//   //     setIsAuthenticated(true);
//   //     setToken(savedToken);
//   //   }
//   //   setLoading(false); // ✅ Prevent premature rendering
//   // }, []);

//   useEffect(() => {
//     const savedToken = localStorage.getItem("token");
//     if (savedToken) {
//       setIsAuthenticated(true);
//       setToken(savedToken);
//     }
//   }, []);

//   const theme = useMemo(() =>
//     createTheme({
//       palette: {
//         mode: darkMode ? "dark" : "light",
//       },
//     }), [darkMode]
//   );

//   const handleLoginSuccess = (receivedToken) => {
//     setIsAuthenticated(true);
//     setToken(receivedToken);
//     localStorage.setItem("token", receivedToken);
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     setToken(null);
//     localStorage.removeItem("token");
//   };

//   //if (loading) return null; // ⛔️ Wait until token check completes

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Router>
//         <AppRoutes
//           isAuthenticated={isAuthenticated}
//           token={token}
//           handleLoginSuccess={handleLoginSuccess}
//           handleLogout={handleLogout}
//           darkMode={darkMode}
//           setDarkMode={setDarkMode}
//         />
//       </Router>
//     </ThemeProvider>
//   );
// }

// export default App;


// import {
//   Box,
//   CssBaseline,
//   ThemeProvider,
//   createTheme,
// } from "@mui/material";
// import React, { useEffect, useMemo, useState } from "react";
// import {
//   Navigate,
//   Route,
//   BrowserRouter as Router,
//   Routes,
//   useLocation,
// } from "react-router-dom";
  
//   import BranchDetails from "./components/BranchDetails";
// import BranchSummary from "./components/BranchSummary";
// import CompanyDetails from "./components/CompanyDetails";
// import CompanyPage from "./components/CompanyPage";
// import Dashboard from "./components/Dashboard";
// import LoginPage from "./components/LoginPage";
// import Sidebar from "./components/Sidebar";
// import StudentDetails from "./components/StudentDetails";
  
//   import { PlacementProvider } from "./MainTable/MainPlacementTable";
  
//   // Wrapper to control sidebar visibility and routes
//   const AppRoutes = ({
//     isAuthenticated,
//     token,
//     handleLoginSuccess,
//     handleLogout,
//     darkMode,
//     setDarkMode,
//   }) => {
//     const location = useLocation();
//     const isLoginPage = location.pathname === "/login";
  
//     return (
//       <Box sx={{ display: "flex" }}>
//         {!isLoginPage && isAuthenticated && (
//           <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
//         )}
//         <Box sx={{ flexGrow: 1 }}>
//           <Routes>
//             <Route
//               path="/login"
//               element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
//             />
//             <Route
//               path="/"
//               element={
//                 isAuthenticated ? (
//                   <Dashboard token={token} />
//                 ) : (
//                   <Navigate to="/login" />
//                 )
//               }
//             />
//             <Route
//               path="/students"
//               element={
//                 isAuthenticated ? <StudentDetails /> : <Navigate to="/login" />
//               }
//             />
//             <Route
//               path="/students/:branch"
//               element={
//                 isAuthenticated ? <BranchDetails /> : <Navigate to="/login" />
//               }
//             />
//             <Route
//               path="/company/:companyName"
//               element={
//                 isAuthenticated ? <CompanyPage /> : <Navigate to="/login" />
//               }
//             />
//             <Route
//               path="/companies"
//               element={
//                 isAuthenticated ? <CompanyDetails /> : <Navigate to="/login" />
//               }
//             />
//             <Route
//               path="/summary/:branch"
//               element={
//                 isAuthenticated ? <BranchSummary /> : <Navigate to="/login" />
//               }
//             />
//           </Routes>
//         </Box>
//       </Box>
//     );
//   };
  
//   function App() {
//     const [darkMode, setDarkMode] = useState(false);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [token, setToken] = useState(null);
//     const [loading, setLoading] = useState(true); // For auth check
  
//     useEffect(() => {
//       const savedToken = localStorage.getItem("token");
//       if (savedToken) {
//         setIsAuthenticated(true);
//         setToken(savedToken);
//       }
//       setLoading(false); // ✅ Done loading
//     }, []);
  
//     const theme = useMemo(
//       () =>
//         createTheme({
//           palette: {
//             mode: darkMode ? "dark" : "light",
//             background: {
//               default: darkMode ? "#121212" : "#f9f9f9",
//             },
//             primary: {
//               main: "#E87722",
//             },
//           },
//           typography: {
//             fontFamily: "'Poppins', 'Segoe UI', sans-serif",
//           },
//         }),
//       [darkMode]
//     );
  
//     const handleLoginSuccess = (receivedToken) => {
//       setIsAuthenticated(true);
//       setToken(receivedToken);
//       localStorage.setItem("token", receivedToken);
//     };
  
//     const handleLogout = () => {
//       setIsAuthenticated(false);
//       setToken(null);
//       localStorage.removeItem("token");
//     };
  
//     if (loading) return null; // Prevent flash before token check
  
//     return (
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <PlacementProvider>
//           <Router>
//             <AppRoutes
//               isAuthenticated={isAuthenticated}
//               token={token}
//               handleLoginSuccess={handleLoginSuccess}
//               handleLogout={handleLogout}
//               darkMode={darkMode}
//               setDarkMode={setDarkMode}
//             />
//           </Router>
//         </PlacementProvider>
//       </ThemeProvider>
//     );
//   }
  
//   export default App;
  


// import {
//   Box,
//   createTheme,
//   CssBaseline,
//   ThemeProvider,
// } from "@mui/material";
// import React, { useEffect, useMemo, useState } from "react";
// import {
//   Navigate,
//   Route,
//   BrowserRouter as Router,
//   Routes,
//   useLocation,
//   useParams,
// } from "react-router-dom";

// import BranchDetails from "./components/BranchDetails";
// import BranchSummary from "./components/BranchSummary";
// import CompanyDetails from "./components/CompanyDetails";
// import CompanyPage from "./components/CompanyPage";
// import Dashboard from "./components/Dashboard";
// import LoginPage from "./components/LoginPage";
// import Sidebar from "./components/Sidebar";
// import StudentDetails from "./components/StudentDetails";

// import { PlacementProvider } from "./MainTable/MainPlacementTable";

// const DepartmentProviderWrapper = () => {
//   const { branch } = useParams();

//   return (
//     <PlacementProvider initialDepartment={branch}>
//       <BranchDetails />
//     </PlacementProvider>
//   );
// };

// const AppRoutes = ({
//   isAuthenticated,
//   token,
//   handleLoginSuccess,
//   handleLogout,
//   darkMode,
//   setDarkMode,
// }) => {
//   const location = useLocation();
//   const isLoginPage = location.pathname === "/login";

//   return (
//     <Box sx={{ display: "flex" }}>
//       {!isLoginPage && isAuthenticated && (
//         <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
//       )}
//       <Box sx={{ flexGrow: 1 }}>
//         <Routes>
//           <Route
//             path="/login"
//             element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
//           />
//           <Route
//             path="/"
//             element={
//               isAuthenticated ? (
//                 <Dashboard token={token} onLogout={handleLogout} />
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />
//           <Route
//             path="/students"
//             element={isAuthenticated ? <StudentDetails /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/students/:branch"
//             element={
//               isAuthenticated ? <DepartmentProviderWrapper /> : <Navigate to="/login" />
//             }
//           />
//           <Route
//             path="/companies"
//             element={isAuthenticated ? <CompanyDetails /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/company/:companyName"
//             element={
//               isAuthenticated ? <CompanyPage key={location.pathname} /> : <Navigate to="/login" />
//             }
//           />
//           <Route
//             path="/summary/:branch"
//             element={
//               isAuthenticated ? <BranchSummary /> : <Navigate to="/login" />
//             }
//           />
//         </Routes>
//       </Box>
//     </Box>
//   );
// };

// function App() {
//   const [darkMode, setDarkMode] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [token, setToken] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const savedToken = localStorage.getItem("token");
//     if (savedToken) {
//       setIsAuthenticated(true);
//       setToken(savedToken);
//     }
//     setLoading(false);
//   }, []);

//   const theme = useMemo(() =>
//     createTheme({
//       palette: {
//         mode: darkMode ? "dark" : "light",
//         background: {
//           default: darkMode ? "#121212" : "#f9f9f9",
//         },
//         primary: {
//           main: "#E87722",
//         },
//       },
//       typography: {
//         fontFamily: "'Poppins', 'Segoe UI', sans-serif",
//       },
//     }), [darkMode]
//   );

//   const handleLoginSuccess = (receivedToken) => {
//     setIsAuthenticated(true);
//     setToken(receivedToken);
//     localStorage.setItem("token", receivedToken);
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     setToken(null);
//     localStorage.removeItem("token");
//   };

//   if (loading) return null;

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Router>
//         <AppRoutes
//           isAuthenticated={isAuthenticated}
//           token={token}
//           handleLoginSuccess={handleLoginSuccess}
//           handleLogout={handleLogout}
//           darkMode={darkMode}
//           setDarkMode={setDarkMode}
//         />
//       </Router>
//     </ThemeProvider>
//   );
// }

// export default App;




// import {
//   Box,
//   createTheme,
//   CssBaseline,
//   ThemeProvider,
// } from "@mui/material";
// import React, { useEffect, useMemo, useState } from "react";
// import {
//   Navigate,
//   Route,
//   BrowserRouter as Router,
//   Routes,
//   useLocation
// } from "react-router-dom";

// import BranchDetails from "./components/BranchDetails";
// import BranchSummary from "./components/BranchSummary";
// import CompanyDetails from "./components/CompanyDetails";
// import CompanyPage from "./components/CompanyPage";
// import Dashboard from "./components/Dashboard";
// import LoginPage from "./components/LoginPage";
// import Sidebar from "./components/Sidebar";
// import StudentDetails from "./components/StudentDetails";

// import { PlacementProvider } from "./MainTable/MainPlacementTable";

// // ✅ Just use route params inside components now
// const AppRoutes = ({
//   isAuthenticated,
//   token,
//   handleLoginSuccess,
//   handleLogout,
//   darkMode,
//   setDarkMode,
// }) => {
//   const location = useLocation();
//   const isLoginPage = location.pathname === "/login";

//   return (
//     <Box sx={{ display: "flex" }}>
//       {!isLoginPage && isAuthenticated && (
//         <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
//       )}
//       <Box sx={{ flexGrow: 1 }}>
//         <Routes>
//           <Route
//             path="/login"
//             element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
//           />
//           <Route
//   path="/"
//   element={
//     isAuthenticated ? (
//       <Dashboard token={token} handleLogout={handleLogout} />
//     ) : (
//       <Navigate to="/login" />
//     )
//   }
// />
//           <Route
//             path="/students"
//             element={
//               isAuthenticated ? <StudentDetails /> : <Navigate to="/login" />
//             }
//           />
//           <Route
//             path="/students/:branch"
//             element={
//               isAuthenticated ? <BranchDetails /> : <Navigate to="/login" />
//             }
//           />
//           <Route
//             path="/companies"
//             element={
//               isAuthenticated ? <CompanyDetails /> : <Navigate to="/login" />
//             }
//           />
//           <Route
//             path="/company/:companyName"
//             element={
//               isAuthenticated ? (
//                 <CompanyPage key={location.pathname} />
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />
//           <Route
//             path="/summary/:branch"
//             element={
//               isAuthenticated ? <BranchSummary /> : <Navigate to="/login" />
//             }
//           />
//         </Routes>
//       </Box>
//     </Box>
//   );
// };

// function App() {
//   const [darkMode, setDarkMode] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [token, setToken] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const savedToken = localStorage.getItem("token");
//     if (savedToken) {
//       setIsAuthenticated(true);
//       setToken(savedToken);
//     }
//     setLoading(false);
//   }, []);

//   const theme = useMemo(() =>
//     createTheme({
//       palette: {
//         mode: darkMode ? "dark" : "light",
//         background: {
//           default: darkMode ? "#121212" : "#f9f9f9",
//         },
//         primary: {
//           main: "#E87722",
//         },
//       },
//       typography: {
//         fontFamily: "'Poppins', 'Segoe UI', sans-serif",
//       },
//     }), [darkMode]);

//   const handleLoginSuccess = (receivedToken) => {
//     setIsAuthenticated(true);
//     setToken(receivedToken);
//     localStorage.setItem("token", receivedToken);
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     setToken(null);
//     localStorage.removeItem("token");
//   };

//   //if (loading) return null;

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Router>
//         {/* ✅ Provide context for all pages */}
//         <PlacementProvider>
//           <AppRoutes
//             isAuthenticated={isAuthenticated}
//             token={token}
//             handleLoginSuccess={handleLoginSuccess}
//             handleLogout={handleLogout}
//             darkMode={darkMode}
//             setDarkMode={setDarkMode}
//           />
//         </PlacementProvider>
//       </Router>
//     </ThemeProvider>
//   );
// }

// export default App;

// import React, { useState } from "react";
// import {
//   AppBar,
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Grid,
//   IconButton,
//   InputBase,
//   Menu,
//   MenuItem,
//   Paper,
//   Toolbar,
//   Typography,
// } from "@mui/material";
// import { styled } from "@mui/system";
// import LogoutIcon from "@mui/icons-material/Logout";
// import MenuIcon from "@mui/icons-material/Menu";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import SearchIcon from "@mui/icons-material/Search";

// // Styled components
// const Content = styled(Box)(({ theme }) => ({
//   padding: theme.spacing(3),
//   marginTop: "64px",
//   minHeight: "calc(100vh - 64px)",
//   backgroundColor: theme.palette.background.default,
// }));

// const LogoutButton = styled(Button)({
//   backgroundColor: "white",
//   color: "#E87722",
//   fontWeight: "bold",
//   borderRadius: "12px",
//   padding: "6px 12px",
//   '&:hover': {
//     backgroundColor: "#cf6b1b",
//     color: "white",
//   },
// });

// const SearchBar = styled(Paper)(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   padding: "4px 10px",
//   borderRadius: "20px",
//   width: "100%",
//   maxWidth: 300,
//   marginLeft: "auto",
//   backgroundColor: "#fff2e6",
// }));

// const SummaryCard = styled(Card)({
//   backgroundColor: "#fff8f1",
//   borderRadius: "16px",
//   boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//   minWidth: 160,
// });

// const App = () => {
//   const user = "User";
//   const batch = "2021-2025";
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleNotificationClick = (event) => setAnchorEl(event.currentTarget);
//   const handleNotificationClose = () => setAnchorEl(null);
//   const handleLogout = () => alert("Logged out!");

//   return (
//     <>
//       <AppBar position="fixed" sx={{ backgroundColor: "#E87722", padding: "0.5rem" }}>
//         <Toolbar>
//           <IconButton edge="start" sx={{ color: "white", mr: 2 }}>
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
//             Dashboard
//           </Typography>
//           <SearchBar>
//             <SearchIcon />
//             <InputBase placeholder="Search…" sx={{ ml: 1, flex: 1 }} />
//           </SearchBar>
//           <IconButton color="inherit" onClick={handleNotificationClick}>
//             <NotificationsIcon />
//           </IconButton>
//           <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleNotificationClose}>
//             <MenuItem onClick={handleNotificationClose}>New Placement Drive</MenuItem>
//             <MenuItem onClick={handleNotificationClose}>Internship Fair</MenuItem>
//           </Menu>
//           <Typography variant="body1" sx={{ mx: 2, fontWeight: 500 }}>
//             229301245 :: {user.toUpperCase()}
//           </Typography>
//           <LogoutButton startIcon={<LogoutIcon />} onClick={handleLogout}>
//             Logout
//           </LogoutButton>
//         </Toolbar>
//       </AppBar>

//       <Content>
//         <Typography variant="h5" fontWeight="bold" color="#E87722" gutterBottom>
//           Batch: {batch}
//         </Typography>

//         <Grid container spacing={3} mt={1}>
//           {[
//             { label: "Total Students", value: 120 },
//             { label: "Placed", value: 85 },
//             { label: "On Campus", value: 60 },
//             { label: "Off Campus", value: 25 },
//             { label: "Higher Studies", value: 15 },
//             { label: "Entrepreneurship", value: 5 },
//             { label: "Business", value: 3 },
//           ].map(({ label, value }) => (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={label}>
//               <SummaryCard>
//                 <CardContent>
//                   <Typography variant="h6" color="#E87722" fontWeight="bold">
//                     {value}
//                   </Typography>
//                   <Typography variant="body1">{label}</Typography>
//                 </CardContent>
//               </SummaryCard>
//             </Grid>
//           ))}
//         </Grid>
//       </Content>
//     </>
//   );
// };

// export default App;
// // src/App.js //for fpc
// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Sidebar from "./components/Sidebar";
// import OffCampusPage from "./components/OffCampusPage";
// import { PlacementProvider } from "./MainTable/MainPlacementTable";
// import { Snackbar, Alert } from "@mui/material";

// // Mock authentication or role fetch (replace with real logic or context)
// const currentUser = {
//   name: "FPC User",
//   role: "fpc", // Change this to simulate other roles (e.g., "admin", "faculty", etc.)
// };

// const PermissionDenied = ({ open, onClose }) => (
//   <Snackbar open={open} autoHideDuration={4000} onClose={onClose}>
//     <Alert severity="error" sx={{ width: '100%' }}>
//       Permission denied: You are not authorized to view this page.
//     </Alert>
//   </Snackbar>
// );

// const App = () => {
//   const [showDenied, setShowDenied] = React.useState(false);

//   const ProtectedRoute = ({ children, roles }) => {
//     if (!roles.includes(currentUser.role)) {
//       setShowDenied(true);
//       return <Navigate to="/" replace />;
//     }
//     return children;
//   };

//   return (
//     <PlacementProvider>
//       <div style={{ display: "flex" }}>
//         <Sidebar />
//         <main style={{ flexGrow: 1, padding: 24 }}>
//           <Routes>
//             <Route path="/" element={<h1>Welcome to the Dashboard</h1>} />
//             <Route
//               path="/off-campus"
//               element={
//                 <ProtectedRoute roles={["fpc"]}>
//                   <OffCampusPage />
//                 </ProtectedRoute>
//               }
//             />
//           </Routes>
//         </main>
//         <PermissionDenied open={showDenied} onClose={() => setShowDenied(false)} />
//       </div>
//     </PlacementProvider>
//   );
// };

// export default App;
// // src/App.js

// import React, { useEffect, useMemo, useState } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   useLocation,
// } from "react-router-dom";
// import {
//   Box,
//   CssBaseline,
//   createTheme,
//   ThemeProvider,
// } from "@mui/material";

// // Components
// import Sidebar from "./components/Sidebar";
// import LoginPage from "./components/LoginPage";
// import Dashboard from "./components/Dashboard";
// import BatchSelectionPage from "./components/BatchSelectionPage";
// import OffCampusPage from "./components/OffCampusPage";
// import PlacementTable from "./components/PlacementTable";
// import CreateUserPage from "./components/CreateUserPage";

// // Context
// import { PlacementProvider } from "./MainTable/MainPlacementTable";

// // ----------------------
// // AppRoutes component
// // ----------------------
// const AppRoutes = ({
//   isAuthenticated,
//   token,
//   handleLoginSuccess,
//   handleLogout,
//   darkMode,
//   setDarkMode,
//   selectedBatch
// }) => {
//   const location = useLocation();
//   const isLoginPage = location.pathname === "/login";

//   let currentUser = { role: "" };
//   try {
//     const userRaw = localStorage.getItem("user");
//     if (userRaw) currentUser = JSON.parse(userRaw);
//   } catch (e) {
//     console.error("Failed to parse user from localStorage:", e);
//   }

//   const ProtectedRoute = ({ children, roles }) => {
//     if (!roles.includes(currentUser.role)) {
//       return <Navigate to="/" replace />;
//     }
//     return children;
//   };

//   return (
//     <Box display="flex">
//       {!isLoginPage && isAuthenticated && selectedBatch && (
//         <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
//       )}
//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <Routes>
//           <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />

//           <Route
//             path="/"
//             element={
//               isAuthenticated ? (
//                 selectedBatch ? (
//                   <Dashboard token={token} handleLogout={handleLogout} />
//                 ) : (
//                   <Navigate to="/select-batch" />
//                 )
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />

//           <Route
//             path="/select-batch"
//             element={
//               isAuthenticated ? <BatchSelectionPage /> : <Navigate to="/login" />
//             }
//           />

//           <Route
//             path="/placements"
//             element={
//               isAuthenticated ? <PlacementTable /> : <Navigate to="/login" />
//             }
//           />

//           <Route
//             path="/off"
//             element={
//               isAuthenticated ? <OffCampusPage /> : <Navigate to="/login" />
//             }
//           />

//           <Route
//             path="/create-user"
//             element={
//               isAuthenticated ? (
//                 <ProtectedRoute roles={["admin"]}>
//                   <CreateUserPage />
//                 </ProtectedRoute>
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />
//         </Routes>
//       </Box>
//     </Box>
//   );
// };

// // ----------------------
// // Main App component
// // ----------------------
// const App = () => {
//   const [darkMode, setDarkMode] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [token, setToken] = useState(null);
//   const [selectedBatch, setSelectedBatch] = useState(null);

//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     const user = localStorage.getItem("user");
//     const batch = localStorage.getItem("selectedBatch");

//     if (storedToken && user) {
//       setIsAuthenticated(true);
//       setToken(storedToken);
//     }

//     if (batch) {
//       setSelectedBatch(batch);
//     }
//   }, []);

//   const theme = useMemo(
//     () =>
//       createTheme({
//         palette: {
//           mode: darkMode ? "dark" : "light",
//           primary: { main: "#E87722" },
//           background: { default: darkMode ? "#121212" : "#f9f9f9" },
//         },
//         typography: {
//           fontFamily: "'Poppins', 'Segoe UI', sans-serif",
//         },
//       }),
//     [darkMode]
//   );

//   const handleLoginSuccess = ({ token, user }) => {
//     setIsAuthenticated(true);
//     setToken(token);
//     localStorage.setItem("token", token);

//     const fallbackUser = {
//       email: user?.email || "admin@muj.ac.in",
//       role: user?.role || "admin",
//     };

//     localStorage.setItem("user", JSON.stringify(user || fallbackUser));
//     setSelectedBatch(localStorage.getItem("selectedBatch")); // Refresh after login
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     setToken(null);
//     setSelectedBatch(null);
//     localStorage.clear();
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <PlacementProvider>
//         <Router>
//           <AppRoutes
//             isAuthenticated={isAuthenticated}
//             token={token}
//             handleLoginSuccess={handleLoginSuccess}
//             handleLogout={handleLogout}
//             darkMode={darkMode}
//             setDarkMode={setDarkMode}
//             selectedBatch={selectedBatch}
//           />
//         </Router>
//       </PlacementProvider>
//     </ThemeProvider>
//   );
// };

// export default App;

// import React, { useEffect, useMemo, useState } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   useLocation,
// } from "react-router-dom";
// import {
//   Box,
//   CssBaseline,
//   createTheme,
//   ThemeProvider,
// } from "@mui/material";

// // Components
// import Sidebar from "./components/Sidebar";
// import LoginPage from "./components/LoginPage";
// import Dashboard from "./components/Dashboard";
// import BatchSelectionPage from "./components/BatchSelectionPage";
// import OffCampusPage from "./components/OffCampusPage";
// import PlacementTable from "./components/PlacementTable";
// import CreateUserPage from "./components/CreateUserPage";

// // Context
// import { PlacementProvider } from "./MainTable/MainPlacementTable";

// // ----------------------
// // AppRoutes component
// // ----------------------
// const AppRoutes = ({
//   isAuthenticated,
//   token,
//   handleLoginSuccess,
//   handleLogout,
//   darkMode,
//   setDarkMode,
//   selectedBatch,
//   setSelectedBatch
// }) => {
//   const location = useLocation();
//   const isLoginPage = location.pathname === "/login";

//   let currentUser = { role: "" };
//   try {
//     const userRaw = localStorage.getItem("user");
//     if (userRaw) currentUser = JSON.parse(userRaw);
//   } catch (e) {
//     console.error("Failed to parse user from localStorage:", e);
//   }

//   const ProtectedRoute = ({ children, roles }) => {
//     if (!roles.includes(currentUser.role)) {
//       return <Navigate to="/" replace />;
//     }
//     return children;
//   };

//   return (
//     <Box display="flex">
//       {!isLoginPage && isAuthenticated && selectedBatch && (
//         <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
//       )}
//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <Routes>
//           <Route
//             path="/login"
//             element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
//           />

//           <Route
//             path="/"
//             element={
//               isAuthenticated ? (
//                 selectedBatch ? (
//                   <Dashboard token={token} handleLogout={handleLogout} />
//                 ) : (
//                   <Navigate to="/select-batch" />
//                 )
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />

//           <Route
//             path="/select-batch"
//             element={
//               isAuthenticated ? (
//                 <BatchSelectionPage setSelectedBatch={setSelectedBatch} />
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />

//           <Route
//             path="/placements"
//             element={
//               isAuthenticated ? <PlacementTable /> : <Navigate to="/login" />
//             }
//           />

//           <Route
//             path="/off"
//             element={
//               isAuthenticated ? <OffCampusPage /> : <Navigate to="/login" />
//             }
//           />

//           <Route
//             path="/create-user"
//             element={
//               isAuthenticated ? (
//                 <ProtectedRoute roles={["admin"]}>
//                   <CreateUserPage />
//                 </ProtectedRoute>
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />
//         </Routes>
//       </Box>
//     </Box>
//   );
// };

// // ----------------------
// // Main App component
// // ----------------------
// const App = () => {
//   const [darkMode, setDarkMode] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [token, setToken] = useState(null);
//   const [selectedBatch, setSelectedBatch] = useState(null);

//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     const user = localStorage.getItem("user");
//     const batch = localStorage.getItem("selectedBatch");

//     if (storedToken && user) {
//       setIsAuthenticated(true);
//       setToken(storedToken);
//     }

//     if (batch) {
//       setSelectedBatch(batch);
//     }
//   }, []);

//   const theme = useMemo(
//     () =>
//       createTheme({
//         palette: {
//           mode: darkMode ? "dark" : "light",
//           primary: { main: "#E87722" },
//           background: { default: darkMode ? "#121212" : "#f9f9f9" },
//         },
//         typography: {
//           fontFamily: "'Poppins', 'Segoe UI', sans-serif",
//         },
//       }),
//     [darkMode]
//   );

//   const handleLoginSuccess = ({ token, user }) => {
//     setIsAuthenticated(true);
//     setToken(token);
//     localStorage.setItem("token", token);

//     const fallbackUser = {
//       email: user?.email || "admin@muj.ac.in",
//       role: user?.role || "admin",
//     };

//     localStorage.setItem("user", JSON.stringify(user || fallbackUser));
//     setSelectedBatch(localStorage.getItem("selectedBatch"));
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     setToken(null);
//     setSelectedBatch(null);
//     localStorage.clear();
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <PlacementProvider>
//         <Router>
//           <AppRoutes
//             isAuthenticated={isAuthenticated}
//             token={token}
//             handleLoginSuccess={handleLoginSuccess}
//             handleLogout={handleLogout}
//             darkMode={darkMode}
//             setDarkMode={setDarkMode}
//             selectedBatch={selectedBatch}
//             setSelectedBatch={setSelectedBatch}
//           />
//         </Router>
//       </PlacementProvider>
//     </ThemeProvider>
//   );
// };

// export default App;

import React, { useEffect, useMemo, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import {
  Box,
  CssBaseline,
  createTheme,
  ThemeProvider,
} from "@mui/material";

// Components
import Sidebar from "./components/Sidebar";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import BatchSelectionPage from "./components/BatchSelectionPage";
import OffCampusPage from "./components/OffCampusPage";
import PlacementTable from "./components/PlacementTable";
import CreateUserPage from "./components/CreateUserPage";
import BranchDetails from "./components/BranchDetails";
import StudentDetails from "./components/StudentDetails"; 


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
  setSelectedBatch
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
          <Route
            path="/"
            element={
              isAuthenticated ? (
                selectedBatch ? (
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

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const batch = localStorage.getItem("selectedBatch");

    if (storedToken && user) {
      setIsAuthenticated(true);
      setToken(storedToken);
    }

    if (batch) {
      setSelectedBatch(batch);
    }
  }, []);

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

  const handleLoginSuccess = ({ token, user }) => {
    setIsAuthenticated(true);
    setToken(token);
    localStorage.setItem("token", token);

    const fallbackUser = {
      email: user?.email || "admin@muj.ac.in",
      role: user?.role || "admin",
    };

    localStorage.setItem("user", JSON.stringify(user || fallbackUser));
    setSelectedBatch(localStorage.getItem("selectedBatch"));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setToken(null);
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
        />
      </PlacementProvider>
    </ThemeProvider>
  );
};

export default App;
