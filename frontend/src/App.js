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




import {
  Box,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation
} from "react-router-dom";

import BranchDetails from "./components/BranchDetails";
import BranchSummary from "./components/BranchSummary";
import CompanyDetails from "./components/CompanyDetails";
import CompanyPage from "./components/CompanyPage";
import Dashboard from "./components/Dashboard";
import LoginPage from "./components/LoginPage";
import Sidebar from "./components/Sidebar";
import StudentDetails from "./components/StudentDetails";

import { PlacementProvider } from "./MainTable/MainPlacementTable";

// ✅ Just use route params inside components now
const AppRoutes = ({
  isAuthenticated,
  token,
  handleLoginSuccess,
  handleLogout,
  darkMode,
  setDarkMode,
}) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <Box sx={{ display: "flex" }}>
      {!isLoginPage && isAuthenticated && (
        <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
      )}
      <Box sx={{ flexGrow: 1 }}>
        <Routes>
          <Route
            path="/login"
            element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
          />
          <Route
  path="/"
  element={
    isAuthenticated ? (
      <Dashboard token={token} handleLogout={handleLogout} />
    ) : (
      <Navigate to="/login" />
    )
  }
/>
          <Route
            path="/students"
            element={
              isAuthenticated ? <StudentDetails /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/students/:branch"
            element={
              isAuthenticated ? <BranchDetails /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/companies"
            element={
              isAuthenticated ? <CompanyDetails /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/company/:companyName"
            element={
              isAuthenticated ? (
                <CompanyPage key={location.pathname} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/summary/:branch"
            element={
              isAuthenticated ? <BranchSummary /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </Box>
    </Box>
  );
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setIsAuthenticated(true);
      setToken(savedToken);
    }
    setLoading(false);
  }, []);

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode: darkMode ? "dark" : "light",
        background: {
          default: darkMode ? "#121212" : "#f9f9f9",
        },
        primary: {
          main: "#E87722",
        },
      },
      typography: {
        fontFamily: "'Poppins', 'Segoe UI', sans-serif",
      },
    }), [darkMode]);

  const handleLoginSuccess = (receivedToken) => {
    setIsAuthenticated(true);
    setToken(receivedToken);
    localStorage.setItem("token", receivedToken);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setToken(null);
    localStorage.removeItem("token");
  };

  //if (loading) return null;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {/* ✅ Provide context for all pages */}
        <PlacementProvider>
          <AppRoutes
            isAuthenticated={isAuthenticated}
            token={token}
            handleLoginSuccess={handleLoginSuccess}
            handleLogout={handleLogout}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        </PlacementProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;

