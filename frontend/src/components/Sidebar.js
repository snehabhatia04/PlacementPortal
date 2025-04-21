// import React, { useState } from "react";
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   Collapse,
//   Toolbar,
//   Typography,
//   Box,
// } from "@mui/material";
// import { ExpandLess, ExpandMore } from "@mui/icons-material";
// import { Link, useLocation } from "react-router-dom";

// const Sidebar = () => {
//   const [openStudent, setOpenStudent] = useState(false);
//   const [openCompany, setOpenCompany] = useState(false);
//   const location = useLocation();

//   const isActive = (path) => location.pathname === path;

//   return (
//     <Box
//       component="nav"
//       sx={{
//         width: 250,
//         flexShrink: 0,
//       }}
//     >
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
//             />2
//           </ListItem>

//           {/* Student Details Accordion */}
//           <ListItem button onClick={() => setOpenStudent(!openStudent)}>
//             <ListItemText
//               primary={<Typography fontWeight="600" fontSize="16px">Student Details</Typography>}
//             />
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
//                     backgroundColor: isActive(`/students/${branch.toLowerCase()}`)
//                       ? "#cf6b1b"
//                       : "transparent",
//                   }}
//                 >
//                   <ListItemText primary={<Typography fontSize="14px">{branch}</Typography>} />
//                 </ListItem>
//               ))}
//             </List>
//           </Collapse>

//           {/* Company Details Accordion */}
//           <ListItem button onClick={() => setOpenCompany(!openCompany)}>
//             <ListItemText
//               primary={<Typography fontWeight="600" fontSize="16px">Company Details</Typography>}
//             />
//             {openCompany ? <ExpandLess /> : <ExpandMore />}
//           </ListItem>
//           <Collapse in={openCompany} timeout="auto" unmountOnExit>
//             <List component="div" disablePadding>
//               {["Google", "Accenture", "Dell", "Delloite"].map((company) => (
//                 <ListItem
//                   key={company}
//                   button
//                   component={Link}
//                   to={`/company/${company.toLowerCase()}`}
//                   sx={{
//                     pl: 4,
//                     backgroundColor: isActive(`/company/${company.toLowerCase()}`)
//                       ? "#cf6b1b"
//                       : "transparent",
//                   }}
//                 >
//                   <ListItemText primary={<Typography fontSize="14px">{company}</Typography>} />
//                 </ListItem>
//               ))}
//             </List>
//           </Collapse>
//         </List>
//       </Drawer>
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
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [openStudent, setOpenStudent] = useState(false);
  const [openCompany, setOpenCompany] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newCompany, setNewCompany] = useState("");
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await fetch("http://localhost:5002/companies/");
      const data = await res.json();
      setCompanies(data);
    } catch (err) {
      console.error("Failed to fetch companies", err);
    }
  };

  const handleAddCompany = async () => {
    try {
      const res = await fetch("http://localhost:5002/companies/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCompany }),
      });
      if (res.ok) {
        setNewCompany("");
        setOpenDialog(false);
        fetchCompanies(); // refresh list
      }
    } catch (err) {
      console.error("Failed to add company", err);
    }
  };

  return (
    <Box
      component="nav"
      sx={{
        width: 250,
        flexShrink: 0,
      }}
    >
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
            fontFamily: "'Poppins', sans-serif",
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
            <ListItemText
              primary={<Typography fontWeight="600" fontSize="16px">Home</Typography>}
            />
          </ListItem>

          {/* Student Details Accordion */}
          <ListItem button onClick={() => setOpenStudent(!openStudent)}>
            <ListItemText
              primary={<Typography fontWeight="600" fontSize="16px">Student Details</Typography>}
            />
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
                    backgroundColor: isActive(`/students/${branch.toLowerCase()}`)
                      ? "#cf6b1b"
                      : "transparent",
                  }}
                >
                  <ListItemText primary={<Typography fontSize="14px">{branch}</Typography>} />
                </ListItem>
              ))}
            </List>
          </Collapse>

          {/* Company Details Accordion */}
          <ListItem button onClick={() => setOpenCompany(!openCompany)}>
            <ListItemText
              primary={<Typography fontWeight="600" fontSize="16px">Company Details</Typography>}
            />
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
                    backgroundColor: isActive(`/company/${company.name.toLowerCase()}`)
                      ? "#cf6b1b"
                      : "transparent",
                  }}
                >
                  <ListItemText primary={<Typography fontSize="14px">{company.name}</Typography>} />
                </ListItem>
              ))}
              {/* ➕ Add Company */}
              <ListItem
                button
                onClick={() => setOpenDialog(true)}
                sx={{ pl: 4, backgroundColor: "#cf6b1b", mt: 1 }}
              >
                <AddIcon sx={{ fontSize: 18, mr: 1 }} />
                <ListItemText primary={<Typography fontSize="14px">Add Company</Typography>} />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Drawer>

      {/* Dialog for adding new company */}
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
