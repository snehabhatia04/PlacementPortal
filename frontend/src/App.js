// import { useEffect, useState } from "react";
// import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import BatchSelectionPage from "./components/BatchSelectionPage";
// import Dashboard from "./components/Dashboard";
// import Layout from "./components/Layout";
// import LoginPage from "./components/LoginPage";

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const savedUser = localStorage.getItem("user");
//     if (savedUser) {
//       setIsAuthenticated(true);
//       setUser(savedUser);
//     }
//   }, []);

//   const handleLoginSuccess = (userData) => {
//     setIsAuthenticated(true);
//     setUser(userData);
//     localStorage.setItem("user", userData);
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/login"
//           element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
//         />
//         <Route
//           path="/"
//           element={
//             isAuthenticated ? <Navigate to="/select-batch" /> : <Navigate to="/login" />
//           }
//         />
//         <Route
//           path="/select-batch"
//           element={
//             isAuthenticated ? <BatchSelectionPage /> : <Navigate to="/login" />
//           }
//         />

//         {/* Dashboard routes with Sidebar */}
//         <Route
//           path="/"
//           element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}
//         >
//           <Route
//             path="dashboard/:batch"
//             element={<Dashboard user={user} handleLogout={handleLogout} />}
//           />
//           {/* Add other authenticated routes here */}
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import { useEffect, useState } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import BatchSelectionPage from "./components/BatchSelectionPage";
import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";
import LoginPage from "./components/LoginPage";
import StudentDetails from "./components/StudentDetails";
import { PlacementProvider } from "./MainTable/MainPlacementTable";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setIsAuthenticated(true);
      setUser(savedUser);
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem("user", userData);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <Router>
  <Routes>
    <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
    <Route path="/" element={isAuthenticated ? <Navigate to="/select-batch" /> : <Navigate to="/login" />} />
    <Route path="/select-batch" element={isAuthenticated ? <BatchSelectionPage /> : <Navigate to="/login" />} />

    {/* Routes inside layout (with sidebar etc) */}
    <Route
      path="/"
      element={
        isAuthenticated ? (
          <PlacementProvider>
            <Layout />
          </PlacementProvider>
        ) : (
          <Navigate to="/login" />
        )
      }
    >
      <Route path="dashboard/:batch" element={<Dashboard user={user} handleLogout={handleLogout} />} />
      <Route path="students/:department" element={<StudentDetails />} />
      {/* add other routes */}
    </Route>
  </Routes>
</Router>
  );
}

export default App;
