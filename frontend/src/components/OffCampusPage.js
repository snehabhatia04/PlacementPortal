// import {
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   MenuItem,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
//   Paper
// } from "@mui/material";
// import React, { useState, useEffect } from "react";
// import { usePlacement } from "../MainTable/MainPlacementTable";

// const OffCampusPage = () => {
//   const { allStudents, addStudent, fetchAllStudents } = usePlacement();
//   const [open, setOpen] = useState(false);

//   const [form, setForm] = useState({
//     regNo: "",
//     name: "",
//     email: "",
//     department: "",
//     company: "",
//     offerType: "",
//     stipend: "",
//     package: ""
//   });

//   useEffect(() => {
//     fetchAllStudents(); // Ensure we have latest data
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async () => {
//     const newStudent = {
//       ...form,
//       status: "OffCampus"
//     };

//     try {
//       await addStudent(newStudent);
//       await fetchAllStudents();
//       setForm({
//         regNo: "",
//         name: "",
//         email: "",
//         department: "",
//         company: "",
//         offerType: "",
//         stipend: "",
//         package: ""
//       });
//       setOpen(false);
//     } catch (err) {
//       console.error("Failed to add student:", err);
//     }
//   };

//   return (
//     <Box p={3}>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//         <Typography variant="h5" fontWeight="bold">Off Campus Placement Details</Typography>
//         <Button variant="contained" onClick={() => setOpen(true)}>Add Student</Button>
//       </Box>

//       <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
//         <DialogTitle>Add Off Campus Student</DialogTitle>
//         <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
//           <TextField name="regNo" label="Registration No" value={form.regNo} onChange={handleChange} />
//           <TextField name="name" label="Name" value={form.name} onChange={handleChange} />
//           <TextField name="email" label="Email" value={form.email} onChange={handleChange} />
//           <TextField name="department" label="Department" value={form.department} onChange={handleChange} />
//           <TextField name="company" label="Company" value={form.company} onChange={handleChange} />
//           <TextField
//             name="offerType"
//             label="Offer Type"
//             select
//             value={form.offerType}
//             onChange={handleChange}
//           >
//             <MenuItem value="PPO">PPO</MenuItem>
//             <MenuItem value="PPO + I">PPO + I</MenuItem>
//             <MenuItem value="I">Intern</MenuItem>
//           </TextField>
//           <TextField name="stipend" label="Stipend" type="number" value={form.stipend} onChange={handleChange} />
//           <TextField name="package" label="Package (LPA)" type="number" value={form.package} onChange={handleChange} />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpen(false)}>Cancel</Button>
//           <Button variant="contained" onClick={handleSubmit}>Add</Button>
//         </DialogActions>
//       </Dialog>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead sx={{ backgroundColor: "#E87722" }}>
//             <TableRow>
//               {["S.No", "Reg No", "Name", "Branch", "Placement Status", "Company", "Offer Type", "Stipend", "Package"].map((h) => (
//                 <TableCell key={h} sx={{ color: "white", fontWeight: "bold" }}>{h}</TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {allStudents
//               .filter((s) => s.status === "OffCampus")
//               .map((s, idx) => (
//                 <TableRow key={idx}>
//                   <TableCell>{idx + 1}</TableCell>
//                   <TableCell>{s.regNo}</TableCell>
//                   <TableCell>{s.name}</TableCell>
//                   <TableCell>{s.department}</TableCell>
//                   <TableCell>{s.status}</TableCell>
//                   <TableCell>{s.company}</TableCell>
//                   <TableCell>{s.offerType}</TableCell>
//                   <TableCell>{s.stipend}</TableCell>
//                   <TableCell>{s.package}</TableCell>
//                 </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default OffCampusPage;

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { usePlacement } from "../MainTable/MainPlacementTable";
import { hasPermission, getCurrentUser } from "../utils/permissions"; // ✅ Import

const OffCampusPage = () => {
  const { allStudents, addStudent, fetchAllStudents } = usePlacement();
  const [open, setOpen] = useState(false);

  const currentUser = getCurrentUser();
  const userDept = currentUser?.department?.toUpperCase?.() || "";

  const [form, setForm] = useState({
    regNo: "",
    name: "",
    email: "",
    department: userDept || "",
    company: "",
    offerType: "",
    stipend: "",
    package: "",
  });

  useEffect(() => {
    fetchAllStudents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const newStudent = {
      ...form,
      status: "OffCampus",
    };

    try {
      await addStudent(newStudent);
      await fetchAllStudents();
      setForm({
        regNo: "",
        name: "",
        email: "",
        department: userDept || "",
        company: "",
        offerType: "",
        stipend: "",
        package: "",
      });
      setOpen(false);
    } catch (err) {
      console.error("Failed to add student:", err);
    }
  };

  const canAdd = hasPermission("add_off_campus_data", form.department);
  const canView = hasPermission("view_all_students") || hasPermission("view_own_department_students", userDept);

  const filteredStudents = allStudents.filter((s) => {
    if (s.status !== "OffCampus") return false;
    if (hasPermission("view_all_students")) return true;
    return hasPermission("view_own_department_students", s.department);
  });

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">Off Campus Placement Details</Typography>
        {canAdd && (
          <Button variant="contained" onClick={() => setOpen(true)}>
            Add Student
          </Button>
        )}
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Off Campus Student</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField name="regNo" label="Registration No" value={form.regNo} onChange={handleChange} />
          <TextField name="name" label="Name" value={form.name} onChange={handleChange} />
          <TextField name="email" label="Email" value={form.email} onChange={handleChange} />

          <TextField
            name="department"
            label="Department"
            value={form.department}
            InputProps={{ readOnly: true }} // 🔒 department fixed
          />

          <TextField name="company" label="Company" value={form.company} onChange={handleChange} />
          <TextField
            name="offerType"
            label="Offer Type"
            select
            value={form.offerType}
            onChange={handleChange}
          >
            <MenuItem value="PPO">PPO</MenuItem>
            <MenuItem value="PPO + I">PPO + I</MenuItem>
            <MenuItem value="I">Intern</MenuItem>
          </TextField>
          <TextField name="stipend" label="Stipend" type="number" value={form.stipend} onChange={handleChange} />
          <TextField name="package" label="Package (LPA)" type="number" value={form.package} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>

      {canView ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#E87722" }}>
              <TableRow>
                {["S.No", "Reg No", "Name", "Branch", "Placement Status", "Company", "Offer Type", "Stipend", "Package"].map((h) => (
                  <TableCell key={h} sx={{ color: "white", fontWeight: "bold" }}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.map((s, idx) => (
                <TableRow key={idx}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{s.regNo}</TableCell>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>{s.department}</TableCell>
                  <TableCell>{s.status}</TableCell>
                  <TableCell>{s.company}</TableCell>
                  <TableCell>{s.offerType}</TableCell>
                  <TableCell>{s.stipend}</TableCell>
                  <TableCell>{s.package}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography color="error">You do not have permission to view Off Campus records.</Typography>
      )}
    </Box>
  );
};

export default OffCampusPage;
