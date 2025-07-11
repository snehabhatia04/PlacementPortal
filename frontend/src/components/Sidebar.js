// import { ExpandLess, ExpandMore } from "@mui/icons-material";
// import AddIcon from "@mui/icons-material/Add";
// import {
//   Box,
//   Button,
//   Collapse,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   TextField,
//   Toolbar,
//   Typography,
// } from "@mui/material";
// import { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";

// const Sidebar = () => {
//   const [openStudent, setOpenStudent] = useState(false);
//   const [openCompany, setOpenCompany] = useState(false);
//   const [companies, setCompanies] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [newCompany, setNewCompany] = useState("");
//   const location = useLocation();

//   useEffect(() => {
//     setOpenStudent(false);
//     setOpenCompany(false);
//   }, [location.pathname]);

//   let currentUser = { role: "" };
//   try {
//     const userRaw = localStorage.getItem("user");
//     if (userRaw) currentUser = JSON.parse(userRaw);
//   } catch (err) {
//     console.error("Failed to parse user from localStorage:", err);
//   }

//   const isActive = (path) => location.pathname === path;

//   useEffect(() => {
//     fetchCompanies();
//   }, []);

//   const fetchCompanies = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       console.warn("⚠️ No token found. Skipping fetchCompanies.");
//       return;
//     }
//     try {
//       const res = await fetch("http://localhost:5002/companies/", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const data = await res.json();
//       console.log("Fetched companies:", data);

//       if (Array.isArray(data)) {
//         setCompanies(data);
//       } else {
//         console.error("Expected array but got:", data);
//         setCompanies([]);
//       }
//     } catch (err) {
//       console.error("Failed to fetch companies", err);
//       setCompanies([]);
//     }
//   };

//   const handleAddCompany = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("Unauthorized: Please login again.");
//       return;
//     }
//     if (currentUser.role !== "admin" && currentUser.role !== "faculty") {
//       alert("Only authorized users can add companies.");
//       return;
//     }
//     if (
//       companies.some(
//         (c) => c.name.toLowerCase() === newCompany.trim().toLowerCase()
//       )
//     ) {
//       alert("❗ Company already exists!");
//       return;
//     }
//     try {
//       const res = await fetch("http://localhost:5002/companies/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ name: newCompany }),
//       });
//       if (res.ok) {
//         setNewCompany("");
//         setOpenDialog(false);
//         fetchCompanies();
//       }
//     } catch (err) {
//       console.error("Failed to add company", err);
//     }
//   };

//   const handleDialogClose = () => {
//     setOpenDialog(false);
//     setNewCompany("");
//   };

//   return (
//     <Box component="nav" sx={{ width: 250, flexShrink: 0 }}>
//       <Drawer
//         variant="permanent"
//         anchor="left"
//         sx={{
//           width: 250,
//           flexShrink: 0,
//           [`& .MuiDrawer-paper`]: {
//             width: 250,
//             boxSizing: "border-box",
//             backgroundColor: "#E87722",
//             color: "white",
//             fontFamily: "'Poppins', sans-serif",
//             height: "100vh",
//             position: "fixed",
//           },
//         }}
//       >
//         <Toolbar />
//         <List>
//           <ListItem
//             button
//             component={Link}
//             to="/"
//             sx={{ backgroundColor: isActive("/") ? "#cf6b1b" : "transparent" }}
//           >
//             <ListItemText
//               primary={<Typography fontWeight="600" fontSize="16px">Home</Typography>}
//             />
//           </ListItem>

//           {/* Student Accordion */}
//           <ListItem button onClick={() => setOpenStudent(!openStudent)}>
//             <ListItemText primary={<Typography fontWeight="600" fontSize="16px">Student Details</Typography>} />
//             {openStudent ? <ExpandLess /> : <ExpandMore />}
//           </ListItem>
//           <Collapse in={openStudent} timeout="auto" unmountOnExit>
//             <List component="div" disablePadding>
//               {["CSE", "AIML", "IT", "IOT", "CCE", "Data Science", "ECE", "All"].map((branch) => (
//                 <ListItem
//                   key={branch}
//                   button
//                   component={Link}
//                   to={`/students/${branch.toLowerCase()}`}
//                   sx={{
//                     pl: 4,
//                     backgroundColor: isActive(`/students/${branch.toLowerCase()}`) ? "#cf6b1b" : "transparent",
//                   }}
//                 >
//                   <ListItemText primary={<Typography fontSize="14px">{branch}</Typography>} />
//                 </ListItem>
//               ))}
//             </List>
//           </Collapse>

//           {/* Company Accordion */}
//           <ListItem button onClick={() => setOpenCompany(!openCompany)}>
//             <ListItemText primary={<Typography fontWeight="600" fontSize="16px">Company Details</Typography>} />
//             {openCompany ? <ExpandLess /> : <ExpandMore />}
//           </ListItem>
//           <Collapse in={openCompany} timeout="auto" unmountOnExit>
//             <List component="div" disablePadding>
//               {Array.isArray(companies) && companies.map((company) => (
//                 <ListItem
//                   key={company.name}
//                   button
//                   component={Link}
//                   to={`/company/${company.name.toLowerCase()}`}
//                   sx={{
//                     pl: 4,
//                     backgroundColor: isActive(`/company/${company.name.toLowerCase()}`) ? "#cf6b1b" : "transparent",
//                   }}
//                 >
//                   <ListItemText primary={<Typography fontSize="14px">{company.name}</Typography>} />
//                 </ListItem>
//               ))}
//               <ListItem
//                 button
//                 onClick={() => setOpenDialog(true)}
//                 sx={{ pl: 4, backgroundColor: "#cf6b1b", mt: 1 }}
//               >
//                 <AddIcon sx={{ fontSize: 18, mr: 1 }} />
//                 <ListItemText primary={<Typography fontSize="14px">Add Company</Typography>} />
//               </ListItem>
//             </List>
//           </Collapse>

//           {/* Off Campus */}
//           <ListItem
//             button
//             component={Link}
//             to="/off"
//             sx={{ backgroundColor: isActive("/off") ? "#cf6b1b" : "transparent" }}
//           >
//             <ListItemText
//               primary={<Typography fontWeight="600" fontSize="16px" color="white">Off Campus Details</Typography>}
//             />
//           </ListItem>

//           {/* Admin-only */}
//           {currentUser.role === "admin" && (
//             <ListItem
//               button
//               component={Link}
//               to="/create-user"
//               sx={{ backgroundColor: isActive("/create-user") ? "#cf6b1b" : "transparent" }}
//             >
//               <ListItemText
//                 primary={<Typography fontWeight="600" fontSize="16px" color="white">Create User</Typography>}
//               />
//             </ListItem>
//           )}
//         </List>
//       </Drawer>

//       {/* Add Company Dialog */}
//       <Dialog open={openDialog} onClose={handleDialogClose}>
//         <DialogTitle>Enter New Company Name</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Company Name"
//             fullWidth
//             variant="standard"
//             value={newCompany}
//             onChange={(e) => setNewCompany(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleDialogClose}>Cancel</Button>
//           <Button onClick={handleAddCompany} disabled={!newCompany.trim()}>Add</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default Sidebar;

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { hasPermission, getCurrentUser } from "../utils/permissions"; // ✅

const Sidebar = () => {
  const [openStudent, setOpenStudent] = useState(false);
  const [openCompany, setOpenCompany] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newCompany, setNewCompany] = useState("");
  const location = useLocation();

  const user = getCurrentUser();

  useEffect(() => {
    setOpenStudent(false);
    setOpenCompany(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    if (hasPermission("view_companies")) {
      fetchCompanies();
    }
  }, []);

  const fetchCompanies = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:5002/companies/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (Array.isArray(data)) setCompanies(data);
    } catch (err) {
      console.error("Failed to fetch companies", err);
    }
  };

  const handleAddCompany = async () => {
    const token = localStorage.getItem("token");
    if (!token || !hasPermission("create_company")) return;

    if (companies.some(c => c.name.toLowerCase() === newCompany.trim().toLowerCase())) {
      alert("❗ Company already exists!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5002/companies/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newCompany }),
      });

      if (res.ok) {
        setNewCompany("");
        setOpenDialog(false);
        fetchCompanies();
      }
    } catch (err) {
      console.error("Failed to add company", err);
    }
  };

  return (
    <Box component="nav" sx={{ width: 250, flexShrink: 0 }}>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 250,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 250,
            boxSizing: "border-box",
            backgroundColor: "#E87722",
            color: "white",
            height: "100vh",
            position: "fixed",
          },
        }}
      >
        <Toolbar />
        <List>
          <ListItem
            button
            component={Link}
            to="/"
            sx={{ backgroundColor: isActive("/") ? "#cf6b1b" : "transparent" }}
          >
            <ListItemText primary={<Typography fontWeight="600" fontSize="16px">Home</Typography>} />
          </ListItem>

          {/* Student Section */}
          <ListItem button onClick={() => setOpenStudent(!openStudent)}>
            <ListItemText primary={<Typography fontWeight="600" fontSize="16px">Student Details</Typography>} />
            {openStudent ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openStudent} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {["CSE", "AIML", "IT", "IOT", "CCE", "Data Science", "ECE", "All"].map((branch) => (
                <ListItem
                  key={branch}
                  button
                  component={Link}
                  to={`/students/${branch.toLowerCase()}`}
                  sx={{
                    pl: 4,
                    backgroundColor: isActive(`/students/${branch.toLowerCase()}`) ? "#cf6b1b" : "transparent",
                  }}
                >
                  <ListItemText primary={<Typography fontSize="14px">{branch}</Typography>} />
                </ListItem>
              ))}
            </List>
          </Collapse>

          {/* Company Section */}
          {hasPermission("view_companies") && (
            <>
              <ListItem button onClick={() => setOpenCompany(!openCompany)}>
                <ListItemText primary={<Typography fontWeight="600" fontSize="16px">Company Details</Typography>} />
                {openCompany ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openCompany} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {companies.map((company) => (
                    <ListItem
                      key={company.name}
                      button
                      component={Link}
                      to={`/company/${company.name.toLowerCase()}`}
                      sx={{
                        pl: 4,
                        backgroundColor: isActive(`/company/${company.name.toLowerCase()}`) ? "#cf6b1b" : "transparent",
                      }}
                    >
                      <ListItemText primary={<Typography fontSize="14px">{company.name}</Typography>} />
                    </ListItem>
                  ))}
                  {hasPermission("create_company") && (
                    <ListItem button onClick={() => setOpenDialog(true)} sx={{ pl: 4, backgroundColor: "#cf6b1b", mt: 1 }}>
                      <AddIcon sx={{ fontSize: 18, mr: 1 }} />
                      <ListItemText primary={<Typography fontSize="14px">Add Company</Typography>} />
                    </ListItem>
                  )}
                </List>
              </Collapse>
            </>
          )}

          {/* Off Campus */}
          <ListItem
            button
            component={Link}
            to="/off"
            sx={{ backgroundColor: isActive("/off") ? "#cf6b1b" : "transparent" }}
          >
            <ListItemText primary={<Typography fontWeight="600" fontSize="16px">Off Campus Details</Typography>} />
          </ListItem>

          {/* Create User */}
          {hasPermission("create_user") && (
            <ListItem
              button
              component={Link}
              to="/create-user"
              sx={{ backgroundColor: isActive("/create-user") ? "#cf6b1b" : "transparent" }}
            >
              <ListItemText primary={<Typography fontWeight="600" fontSize="16px">Create User</Typography>} />
            </ListItem>
          )}
        </List>
      </Drawer>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Enter New Company Name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Company Name"
            fullWidth
            variant="standard"
            value={newCompany}
            onChange={(e) => setNewCompany(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddCompany} disabled={!newCompany.trim()}>Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Sidebar;
