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
//   Paper,
// } from "@mui/material";
// import React, { useState, useEffect } from "react";
// import { usePlacement } from "../MainTable/MainPlacementTable";
// import { hasPermission, getCurrentUser } from "../utils/permissions";


// const OffCampusPage = () => {
//   const { allStudents, addStudent, fetchAllStudents } = usePlacement();
//   const [open, setOpen] = useState(false);

//   const currentUser = getCurrentUser();
//   const userDept = currentUser?.department?.toUpperCase?.() || "";

//   const [form, setForm] = useState({
//     regNo: "",
//     name: "",
//     email: "",
//     department: userDept || "",
//     company: "",
//     offerType: "",
//     stipend: "",
//     package: "",
//   });

//   useEffect(() => {
//     fetchAllStudents();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async () => {
//     const newStudent = {
//       ...form,
//       status: "OffCampus",
//     };

//     try {
//       await addStudent(newStudent);
//       await fetchAllStudents();
//       setForm({
//         regNo: "",
//         name: "",
//         email: "",
//         department: userDept || "",
//         company: "",
//         offerType: "",
//         stipend: "",
//         package: "",
//       });
//       setOpen(false);
//     } catch (err) {
//       console.error("Failed to add student:", err);
//     }
//   };

//   const canAdd = hasPermission("add_off_campus_data", form.department);
//   const canView = hasPermission("view_all_students") || hasPermission("view_own_department_students", userDept);

//   const filteredStudents = allStudents.filter((s) => {
//     if (s.status !== "OffCampus") return false;
//     if (hasPermission("view_all_students")) return true;
//     return hasPermission("view_own_department_students", s.department);
//   });

//   return (
//     <Box p={3}>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//         <Typography variant="h5" fontWeight="bold">Off Campus Placement Details</Typography>
//         {canAdd && (
//           <Button variant="contained" onClick={() => setOpen(true)}>
//             Add Student
//           </Button>
//         )}
//       </Box>

//       <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
//         <DialogTitle>Add Off Campus Student</DialogTitle>
//         <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
//           <TextField name="regNo" label="Registration No" value={form.regNo} onChange={handleChange} />
//           <TextField name="name" label="Name" value={form.name} onChange={handleChange} />
//           <TextField name="email" label="Email" value={form.email} onChange={handleChange} />

//           <TextField
//             name="department"
//             label="Department"
//             value={form.department}
//             InputProps={{ readOnly: true }} // 🔒 department fixed
//           />

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

//       {canView ? (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead sx={{ backgroundColor: "#E87722" }}>
//               <TableRow>
//                 {["S.No", "Reg No", "Name", "Branch", "Placement Status", "Company", "Offer Type", "Stipend", "Package"].map((h) => (
//                   <TableCell key={h} sx={{ color: "white", fontWeight: "bold" }}>{h}</TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredStudents.map((s, idx) => (
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
//             </TableBody>
//           </Table>
//         </TableContainer>
//       ) : (
//         <Typography color="error">You do not have permission to view Off Campus records.</Typography>
//       )}
//     </Box>
//   );
// };

// // export default OffCampusPage;
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
//   Paper,
// } from "@mui/material";
// import React, { useState, useEffect } from "react";
// import { usePlacement } from "../MainTable/MainPlacementTable";
// import { hasPermission } from "../utils/permissions";
// import { getCurrentUser } from "../utils/user";
// import { DepartmentMap } from "../constants/departments";

// const shortCode = currentUser?.department?.toUpperCase?.() || "";
// const userDept = DepartmentMap[shortCode] || shortCode;

// const OffCampusPage = () => {
//   const { allStudents, addStudent, fetchAllStudents } = usePlacement();
//   const [open, setOpen] = useState(false);

//   const currentUser = getCurrentUser();
 
//   const [form, setForm] = useState({
//     regNo: "",
//     name: "",
//     email: "",
//     department: userDept,
//     company: "",
//     offerType: "",
//     stipend: "",
//     package: "",
//   });

//   useEffect(() => {
//     fetchAllStudents();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async () => {
//     const newStudent = {
//       ...form,
//       department: form.department,
//       status: "OffCampus",
//     };

//     try {
//       await addStudent(newStudent);
//       await fetchAllStudents();
//       setForm({
//         regNo: "",
//         name: "",
//         email: "",
//         department: userDept,
//         company: "",
//         offerType: "",
//         stipend: "",
//         package: "",
//       });
//       setOpen(false);
//     } catch (err) {
//       console.error("Failed to add student:", err);
//       alert("Failed to add student. Check department name or required fields.");
//     }
//   };

//   const canAdd =
//     hasPermission("add_off_campus_data", userDept) ||
//     hasPermission("manage_company_students");

//   const canView =
//     hasPermission("view_all_students") ||
//     hasPermission("view_own_department_students", userDept);

//   const filteredStudents = allStudents.filter((s) => {
//     if (s.status !== "OffCampus") return false;
//     if (hasPermission("view_all_students")) return true;
//     return hasPermission("view_own_department_students", s.department);
//   });

//   return (
//     <Box p={3}>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//         <Typography variant="h5" fontWeight="bold">
//           Off Campus Placement Details
//         </Typography>
//         {canAdd && (
//           <Button variant="contained" onClick={() => setOpen(true)}>
//             Add Student
//           </Button>
//         )}
//       </Box>

//       <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
//         <DialogTitle>Add Off Campus Student</DialogTitle>
//         <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
//           <TextField name="regNo" label="Registration No" value={form.regNo} onChange={handleChange} />
//           <TextField name="name" label="Name" value={form.name} onChange={handleChange} />
//           <TextField name="email" label="Email" value={form.email} onChange={handleChange} />
//           <TextField name="department" label="Department" value={form.department} InputProps={{ readOnly: true }} />
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

//       {canView ? (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead sx={{ backgroundColor: "#E87722" }}>
//               <TableRow>
//                 {["S.No", "Reg No", "Name", "Branch", "Placement Status", "Company", "Offer Type", "Stipend", "Package"].map((h) => (
//                   <TableCell key={h} sx={{ color: "white", fontWeight: "bold" }}>{h}</TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredStudents.map((s, idx) => (
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
//             </TableBody>
//           </Table>
//         </TableContainer>
//       ) : (
//         <Typography color="error">You do not have permission to view Off Campus records.</Typography>
//       )}
//     </Box>
//   );
// };

// // export default OffCampusPage;
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
//   Paper,
// } from "@mui/material";
// import React, { useState, useEffect } from "react";
// import { usePlacement } from "../MainTable/MainPlacementTable";
// import { hasPermission } from "../utils/permissions";
// import { getCurrentUser } from "../utils/user";
// import { DepartmentMap } from "../constants/departments";

// const OffCampusPage = () => {
//   const { allStudents, addStudent, fetchAllStudents } = usePlacement();
//   const [open, setOpen] = useState(false);

//   const currentUser = getCurrentUser(); // ✅ First, get current user
//   const shortCode = currentUser?.department?.toUpperCase?.() || "";
//   const userDept = DepartmentMap[shortCode] || shortCode; // ✅ Map to full dept name if available

//   const [form, setForm] = useState({
//     regNo: "",
//     name: "",
//     email: "",
//     department: userDept,
//     company: "",
//     offerType: "",
//     stipend: "",
//     package: "",
//   });

//   useEffect(() => {
//     fetchAllStudents();
//   }, [fetchAllStudents]); // ✅ Add fetchAllStudents to dependencies

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async () => {
//     const newStudent = {
//       ...form,
//       department: form.department, // already mapped
//       status: "OffCampus",
//     };

//     try {
//       await addStudent(newStudent);
//       await fetchAllStudents();
//       setForm({
//         regNo: "",
//         name: "",
//         email: "",
//         department: userDept,
//         company: "",
//         offerType: "",
//         stipend: "",
//         package: "",
//       });
//       setOpen(false);
//     } catch (err) {
//       console.error("Failed to add student:", err);
//       alert("Failed to add student. Check department name or required fields.");
//     }
//   };

//   const canAdd =
//     hasPermission("add_off_campus_data", userDept) ||
//     hasPermission("manage_company_students");

//   const canView =
//     hasPermission("view_all_students") ||
//     hasPermission("view_own_department_students", userDept);

//   const filteredStudents = allStudents.filter((s) => {
//     if (s.status !== "OffCampus") return false;
//     if (hasPermission("view_all_students")) return true;
//     return hasPermission("view_own_department_students", s.department);
//   });

//   return (
//     <Box p={3}>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//         <Typography variant="h5" fontWeight="bold">
//           Off Campus Placement Details
//         </Typography>
//         {canAdd && (
//           <Button variant="contained" onClick={() => setOpen(true)}>
//             Add Student
//           </Button>
//         )}
//       </Box>

//       <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
//         <DialogTitle>Add Off Campus Student</DialogTitle>
//         <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
//           <TextField name="regNo" label="Registration No" value={form.regNo} onChange={handleChange} />
//           <TextField name="name" label="Name" value={form.name} onChange={handleChange} />
//           <TextField name="email" label="Email" value={form.email} onChange={handleChange} />
//           <TextField name="department" label="Department" value={form.department} InputProps={{ readOnly: true }} />
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

//       {canView ? (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead sx={{ backgroundColor: "#E87722" }}>
//               <TableRow>
//                 {["S.No", "Reg No", "Name", "Branch", "Placement Status", "Company", "Offer Type", "Stipend", "Package"].map((h) => (
//                   <TableCell key={h} sx={{ color: "white", fontWeight: "bold" }}>{h}</TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredStudents.map((s, idx) => (
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
//             </TableBody>
//           </Table>
//         </TableContainer>
//       ) : (
//         <Typography color="error">You do not have permission to view Off Campus records.</Typography>
//       )}
//     </Box>
//   );
// };

// // export default OffCampusPage;
// import {
//   Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
//   MenuItem, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, TextField, Typography, Paper
// } from "@mui/material";
// import React, { useState, useEffect } from "react";
// import { usePlacement } from "../MainTable/MainPlacementTable";
// import { hasPermission } from "../utils/permissions";
// import { getCurrentUser } from "../utils/user";
// import { DepartmentMap, DepartmentCodes } from "../constants/departments";
// {DepartmentCodes.map((code) => (
//   <MenuItem key={code} value={code}>{DepartmentMap[code]}</MenuItem>
// ))}



// const OffCampusPage = () => {
//   const { allStudents, addStudent, fetchAllStudents } = usePlacement();
//   const [open, setOpen] = useState(false);

//   const currentUser = getCurrentUser();
//   const shortCode = currentUser?.department?.toUpperCase?.() || "";
//   const userDept = DepartmentMap[shortCode] || shortCode;

//   const [form, setForm] = useState({
//     reg_no: "",
//     name: "",
//     email: "",
//     department: userDept,
//     company: "",
//     offerType: "",
//     stipend: "",
//     package: "",
//   });

//   useEffect(() => {
//     fetchAllStudents();
//   }, [fetchAllStudents]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async () => {
//     const newStudent = {
//       reg_no: form.reg_no,
//       name: form.name,
//       email: form.email,
//       department: form.department,
//       status: "Placed", // Off-campus counts as Placed
//       is_off_campus: true, // useful if you want to distinguish later
//       offers: [
//         {
//           company: form.company,
//           offer_type: form.offerType,
//           stipend: form.stipend,
//           package: form.package
//         }
//       ]
//     };
// if (["fpc", "faculty"].includes(currentUser.role) && newStudent.department !== currentUser.department) {
//   alert("You can only add students for your own department.");
//   return;
// }
//     try {
//       await addStudent(newStudent);
//       await fetchAllStudents();
//       setOpen(false);
//       setForm({
//         reg_no: "",
//         name: "",
//         email: "",
//         department: userDept,
//         company: "",
//         offerType: "",
//         stipend: "",
//         package: "",
//       });
//     } catch (err) {
//       console.error("Failed to add student:", err);
//       alert("Failed to add student. Please check inputs.");
//     }
//   };

//   const canAdd =
//     hasPermission("add_off_campus_data", userDept) ||
//     hasPermission("manage_company_students");

//   const canView =
//     hasPermission("view_all_students") ||
//     hasPermission("view_own_department_students", userDept);

//   const filteredStudents = allStudents.filter((s) => {
//     if (!s.is_off_campus) return false;
//     if (hasPermission("view_all_students")) return true;
//     return hasPermission("view_own_department_students", s.department);
//   });

//   return (
//     <Box p={3}>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//         <Typography variant="h5" fontWeight="bold">
//           Off Campus Placement Details
//         </Typography>
//         {canAdd && (
//           <Button variant="contained" onClick={() => setOpen(true)}>
//             Add Student
//           </Button>
//         )}
//       </Box>

//       <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
//         <DialogTitle>Add Off Campus Student</DialogTitle>
//         <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
//           <TextField name="reg_no" label="Registration No" value={form.reg_no} onChange={handleChange} />
//           <TextField name="name" label="Name" value={form.name} onChange={handleChange} />
//           <TextField name="email" label="Email" value={form.email} onChange={handleChange} />
//           {/* <TextField
//             name="department"
//             label="Department"
//             select
//             value={form.department}
//             onChange={handleChange}
//           >
//             {DEPARTMENTS.map((dept) => (
//               <MenuItem key={dept} value={dept}>{dept}</MenuItem>
//             ))}
//           </TextField> */}
//           {["fpc", "faculty"].includes(currentUser.role) ? (
//   <TextField
//     label="Department"
//     value={form.department}
//     disabled
//   />
// ) : (
//   <TextField
//     name="department"
//     label="Department"
//     select
//     value={form.department}
//     onChange={handleChange}
//   >
//     {DepartmentCodes.map((code) => (
//   <MenuItem key={code} value={code}>{DepartmentMap[code]}</MenuItem>
//  ))}
//   </TextField>
// )}

//           <TextField name="company" label="Company" value={form.company} onChange={handleChange} />
//           <TextField name="offerType" label="Offer Type" select value={form.offerType} onChange={handleChange}>
//             <MenuItem value="PPO">PPO</MenuItem>
//             <MenuItem value="PPO + I">PPO + I</MenuItem>
//             <MenuItem value="Intern">Intern</MenuItem>
//           </TextField>
//           <TextField name="stipend" label="Stipend" value={form.stipend} onChange={handleChange} />
//           <TextField name="package" label="Package" value={form.package} onChange={handleChange} />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpen(false)}>Cancel</Button>
//           <Button variant="contained" onClick={handleSubmit}>Add</Button>
//         </DialogActions>
//       </Dialog>

//       {canView ? (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead sx={{ backgroundColor: "#E87722" }}>
//               <TableRow>
//                 {["S.No", "Reg No", "Name", "Email", "Branch", "Company", "Offer Type", "Stipend", "Package"].map((h) => (
//                   <TableCell key={h} sx={{ color: "white", fontWeight: "bold" }}>{h}</TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredStudents.map((s, idx) => (
//                 <TableRow key={s.reg_no}>
//                   <TableCell>{idx + 1}</TableCell>
//                   <TableCell>{s.reg_no}</TableCell>
//                   <TableCell>{s.name}</TableCell>
//                   <TableCell>{s.email}</TableCell>
//                   <TableCell>{s.department}</TableCell>
//                   <TableCell>{s.offers[0]?.company || "-"}</TableCell>
//                   <TableCell>{s.offers[0]?.offer_type || "-"}</TableCell>
//                   <TableCell>{s.offers[0]?.stipend || "-"}</TableCell>
//                   <TableCell>{s.offers[0]?.package || "-"}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       ) : (
//         <Typography color="error">You do not have permission to view Off Campus records.</Typography>
//       )}
//     </Box>
//   );
// };

// // export default OffCampusPage;
// import {
//   Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
//   MenuItem, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, TextField, Typography, Paper
// } from "@mui/material";
// import React, { useState, useEffect } from "react";
// import { usePlacement } from "../MainTable/MainPlacementTable";
// import { hasPermission } from "../utils/permissions";
// import { getCurrentUser } from "../utils/user";
// import { DepartmentMap, DepartmentCodes } from "../constants/departments";

// const OffCampusPage = () => {
//   const { allStudents, addStudent, fetchAllStudents } = usePlacement();
//   const [open, setOpen] = useState(false);

//   const currentUser = getCurrentUser();
//   const shortCode = currentUser?.department?.toUpperCase?.() || "";
//   const userDept = DepartmentMap[shortCode] || shortCode;

//   const [form, setForm] = useState({
//     reg_no: "",
//     name: "",
//     email: "",
//     department: shortCode,
//     company: "",
//     offerType: "",
//     stipend: "",
//     package: "",
//   });

//   useEffect(() => {
//     fetchAllStudents();
//   }, [fetchAllStudents]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async () => {
//     const newStudent = {
//       reg_no: form.reg_no.trim(),
//       name: form.name.trim(),
//       email: form.email.trim(),
//       department: form.department,
//       status: "Placed",
//       is_off_campus: true,
//       offers: [
//         {
//           company: form.company.trim(),
//           offer_type: form.offerType,
//           stipend: form.stipend,
//           package: form.package
//         }
//       ]
//     };

//     if (["fpc", "faculty"].includes(currentUser.role) && newStudent.department !== currentUser.department) {
//       alert("You can only add students for your own department.");
//       return;
//     }

//     try {
//       await addStudent(newStudent);
//       await fetchAllStudents();
//       setOpen(false);
//       setForm({
//         reg_no: "",
//         name: "",
//         email: "",
//         department: shortCode,
//         company: "",
//         offerType: "",
//         stipend: "",
//         package: "",
//       });
//     } catch (err) {
//       console.error("Failed to add student:", err);
//       alert("Failed to add student. Please check inputs.");
//     }
//   };

//   const canAdd =
//     hasPermission("add_off_campus_data", userDept) ||
//     hasPermission("manage_company_students");

//   const canView =
//     hasPermission("view_all_students") ||
//     hasPermission("view_own_department_students", userDept);

//   const filteredStudents = allStudents.filter((s) => {
//     if (!s.is_off_campus) return false;
//     if (hasPermission("view_all_students")) return true;
//     return hasPermission("view_own_department_students", s.department);
//   });

//   return (
//     <Box p={3}>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//         <Typography variant="h5" fontWeight="bold">
//           Off Campus Placement Details
//         </Typography>
//         {canAdd && (
//           <Button variant="contained" onClick={() => setOpen(true)}>
//             Add Student
//           </Button>
//         )}
//       </Box>

//       <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
//         <DialogTitle>Add Off Campus Student</DialogTitle>
//         <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
//           <TextField name="reg_no" label="Registration No" value={form.reg_no} onChange={handleChange} />
//           <TextField name="name" label="Name" value={form.name} onChange={handleChange} />
//           <TextField name="email" label="Email" value={form.email} onChange={handleChange} />
//           {(["fpc", "faculty"].includes(currentUser.role)) ? (
//             <TextField label="Department" value={form.department} disabled />
//           ) : (
//             <TextField name="department" label="Department" select value={form.department} onChange={handleChange}>
//               {DepartmentCodes.map((code) => (
//                 <MenuItem key={code} value={code}>{DepartmentMap[code]}</MenuItem>
//               ))}
//             </TextField>
//           )}
//           <TextField name="company" label="Company" value={form.company} onChange={handleChange} />
//           <TextField name="offerType" label="Offer Type" select value={form.offerType} onChange={handleChange}>
//             <MenuItem value="PPO">PPO</MenuItem>
//             <MenuItem value="PPO + I">PPO + I</MenuItem>
//             <MenuItem value="Intern">Intern</MenuItem>
//           </TextField>
//           <TextField name="stipend" label="Stipend" value={form.stipend} onChange={handleChange} />
//           <TextField name="package" label="Package" value={form.package} onChange={handleChange} />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpen(false)}>Cancel</Button>
//           <Button variant="contained" onClick={handleSubmit}>Add</Button>
//         </DialogActions>
//       </Dialog>

//       {canView ? (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead sx={{ backgroundColor: "#E87722" }}>
//               <TableRow>
//                 {["S.No", "Reg No", "Name", "Email", "Branch", "Company", "Offer Type", "Stipend", "Package"].map((h) => (
//                   <TableCell key={h} sx={{ color: "white", fontWeight: "bold" }}>{h}</TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredStudents.map((s, idx) => (
//                 <TableRow key={s.reg_no}>
//                   <TableCell>{idx + 1}</TableCell>
//                   <TableCell>{s.reg_no}</TableCell>
//                   <TableCell>{s.name}</TableCell>
//                   <TableCell>{s.email}</TableCell>
//                   <TableCell>{s.department}</TableCell>
//                   <TableCell>{s.offers[0]?.company || "-"}</TableCell>
//                   <TableCell>{s.offers[0]?.offer_type || "-"}</TableCell>
//                   <TableCell>{s.offers[0]?.stipend || "-"}</TableCell>
//                   <TableCell>{s.offers[0]?.package || "-"}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       ) : (
//         <Typography color="error">You do not have permission to view Off Campus records.</Typography>
//       )}
//     </Box>
//   );
// };

// // export default OffCampusPage;
// import {
//   Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
//   MenuItem, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, TextField, Typography, Paper
// } from "@mui/material";
// import React, { useState, useEffect } from "react";
// import { usePlacement } from "../MainTable/MainPlacementTable";
// import { hasPermission } from "../utils/permissions";
// import { getCurrentUser } from "../utils/user";
// import { DepartmentMap, DepartmentCodes } from "../constants/departments";

// const OffCampusPage = () => {
//   const { allStudents, addStudent, fetchAllStudents } = usePlacement();
//   const [open, setOpen] = useState(false);

//   const currentUser = getCurrentUser();
//   const shortCode = currentUser?.department?.toUpperCase?.() || "";
//   const userDept = DepartmentMap[shortCode] || shortCode;

//   const [form, setForm] = useState({
//     reg_no: "",
//     name: "",
//     email: "",
//     department: shortCode,
//     company: "",
//     offerType: "",
//     stipend: "",
//     package: "",
//   });

//   useEffect(() => {
//     fetchAllStudents();
//   }, [fetchAllStudents]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async () => {
//     const fullDept = DepartmentMap[form.department] || form.department;

//     const newStudent = {
//       reg_no: form.reg_no.trim(),
//       name: form.name.trim(),
//       email: form.email.trim(),
//       department: fullDept,
//       status: "Placed",
//       is_off_campus: true,
//       offers: [
//         {
//           company: form.company.trim(),
//           offer_type: form.offerType,
//           stipend: form.stipend,
//           package: form.package
//         }
//       ]
//     };

//     if (
//       ["fpc", "faculty"].includes(currentUser.role) &&
//       fullDept !== DepartmentMap[currentUser.department]
//     ) {
//       alert("You can only add students for your own department.");
//       return;
//     }

//     try {
//       await addStudent(newStudent);
//       await fetchAllStudents();
//       setOpen(false);
//       setForm({
//         reg_no: "",
//         name: "",
//         email: "",
//         department: shortCode,
//         company: "",
//         offerType: "",
//         stipend: "",
//         package: "",
//       });
//     } catch (err) {
//       console.error("Failed to add student:", err);
//       alert("Failed to add student. Please check inputs.");
//     }
//   };

//   const canAdd =
//     hasPermission("add_off_campus_data", userDept) ||
//     hasPermission("manage_company_students");

//   const canView =
//     hasPermission("view_all_students") ||
//     hasPermission("view_own_department_students", userDept);

//   const filteredStudents = allStudents.filter((s) => {
//     if (!s.is_off_campus) return false;
//     if (hasPermission("view_all_students")) return true;
//     return hasPermission("view_own_department_students", s.department);
//   });

//   return (
//     <Box p={3}>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//         <Typography variant="h5" fontWeight="bold">
//           Off Campus Placement Details
//         </Typography>
//         {canAdd && (
//           <Button variant="contained" onClick={() => setOpen(true)}>
//             Add Student
//           </Button>
//         )}
//       </Box>

//       <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
//         <DialogTitle>Add Off Campus Student</DialogTitle>
//         <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
//           <TextField name="reg_no" label="Registration No" value={form.reg_no} onChange={handleChange} />
//           <TextField name="name" label="Name" value={form.name} onChange={handleChange} />
//           <TextField name="email" label="Email" value={form.email} onChange={handleChange} />
//           {(["fpc", "faculty"].includes(currentUser.role)) ? (
//             <TextField label="Department" value={form.department} disabled />
//           ) : (
//             <TextField name="department" label="Department" select value={form.department} onChange={handleChange}>
//               {DepartmentCodes.map((code) => (
//                 <MenuItem key={code} value={code}>{DepartmentMap[code]}</MenuItem>
//               ))}
//             </TextField>
//           )}
//           <TextField name="company" label="Company" value={form.company} onChange={handleChange} />
//           <TextField name="offerType" label="Offer Type" select value={form.offerType} onChange={handleChange}>
//             <MenuItem value="PPO">PPO</MenuItem>
//             <MenuItem value="PPO + I">PPO + I</MenuItem>
//             <MenuItem value="Intern">Intern</MenuItem>
//           </TextField>
//           <TextField name="stipend" label="Stipend" value={form.stipend} onChange={handleChange} />
//           <TextField name="package" label="Package" value={form.package} onChange={handleChange} />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpen(false)}>Cancel</Button>
//           <Button variant="contained" onClick={handleSubmit}>Add</Button>
//         </DialogActions>
//       </Dialog>

//       {canView ? (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead sx={{ backgroundColor: "#E87722" }}>
//               <TableRow>
//                 {["S.No", "Reg No", "Name", "Email", "Branch", "Company", "Offer Type", "Stipend", "Package"].map((h) => (
//                   <TableCell key={h} sx={{ color: "white", fontWeight: "bold" }}>{h}</TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredStudents.map((s, idx) => (
//                 <TableRow key={s.reg_no}>
//                   <TableCell>{idx + 1}</TableCell>
//                   <TableCell>{s.reg_no}</TableCell>
//                   <TableCell>{s.name}</TableCell>
//                   <TableCell>{s.email}</TableCell>
//                   <TableCell>{s.department}</TableCell>
//                   <TableCell>{s.offers[0]?.company || "-"}</TableCell>
//                   <TableCell>{s.offers[0]?.offer_type || "-"}</TableCell>
//                   <TableCell>{s.offers[0]?.stipend || "-"}</TableCell>
//                   <TableCell>{s.offers[0]?.package || "-"}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       ) : (
//         <Typography color="error">You do not have permission to view Off Campus records.</Typography>
//       )}
//     </Box>
//   );
// };

// export default OffCampusPage;
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  MenuItem, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TextField, Typography, Paper
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { usePlacement } from "../MainTable/MainPlacementTable";
import { hasPermission } from "../utils/permissions";
import { getCurrentUser } from "../utils/user";
import { DepartmentMap, DepartmentCodes } from "../constants/departments";

const OffCampusPage = () => {
  const { allStudents, addStudent, fetchAllStudents } = usePlacement();
  const [open, setOpen] = useState(false);

  const currentUser = getCurrentUser();
  const shortCode = currentUser?.department?.toUpperCase?.() || "";
  const userDept = DepartmentMap[shortCode] || shortCode;

  const [form, setForm] = useState({
    reg_no: "",
    name: "",
    email: "",
    department: shortCode,
    company: "",
    offerType: "",
    stipend: "",
    package: "",
  });

  useEffect(() => {
    fetchAllStudents();
  }, [fetchAllStudents]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const fullDept = DepartmentMap[form.department] || form.department;

    const newStudent = {
      reg_no: form.reg_no.trim(),
      name: form.name.trim(),
      email: form.email.trim(),
      department: fullDept,
      status: "Placed",
      is_off_campus: true,
      offers: [
        {
          company: form.company.trim(),
          offer_type: form.offerType,
          stipend: form.stipend,
          package: form.package
        }
      ]
    };

    if (
      ["fpc", "faculty"].includes(currentUser.role) &&
      fullDept !== DepartmentMap[currentUser.department]
    ) {
      alert("You can only add students for your own department.");
      return;
    }

    try {
      await addStudent(newStudent);
      await fetchAllStudents();
      setOpen(false);
      setForm({
        reg_no: "",
        name: "",
        email: "",
        department: shortCode,
        company: "",
        offerType: "",
        stipend: "",
        package: "",
      });
    } catch (err) {
      console.error("Failed to add student:", err);
      alert("Failed to add student. Please check inputs.");
    }
  };

  const canAdd =
    hasPermission("add_off_campus_data", userDept) ||
    hasPermission("manage_company_students");

  const canView =
    hasPermission("view_all_students") ||
    hasPermission("view_own_department_students", userDept);

  const filteredStudents = allStudents.filter((s) => {
    if (!s.is_off_campus) return false;
    if (hasPermission("view_all_students")) return true;
    return hasPermission("view_own_department_students", s.department);
  });

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">
          Off Campus Placement Details
        </Typography>
        {canAdd && (
          <Button variant="contained" onClick={() => setOpen(true)}>
            Add Student
          </Button>
        )}
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Off Campus Student</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField name="reg_no" label="Registration No" value={form.reg_no} onChange={handleChange} />
          <TextField name="name" label="Name" value={form.name} onChange={handleChange} />
          <TextField name="email" label="Email" value={form.email} onChange={handleChange} />
          {(["fpc", "faculty"].includes(currentUser.role)) ? (
            <TextField label="Department" value={form.department} disabled />
          ) : (
            <TextField name="department" label="Department" select value={form.department} onChange={handleChange}>
              {DepartmentCodes.map((code) => (
                <MenuItem key={code} value={code}>{DepartmentMap[code]}</MenuItem>
              ))}
            </TextField>
          )}
          <TextField name="company" label="Company" value={form.company} onChange={handleChange} />
          <TextField name="offerType" label="Offer Type" select value={form.offerType} onChange={handleChange}>
            <MenuItem value="PPO">PPO</MenuItem>
            <MenuItem value="PPO + I">PPO + I</MenuItem>
            <MenuItem value="Intern">Intern</MenuItem>
          </TextField>
          <TextField name="stipend" label="Stipend" value={form.stipend} onChange={handleChange} />
          <TextField name="package" label="Package" value={form.package} onChange={handleChange} />
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
                {["S.No", "Reg No", "Name", "Email", "Branch", "Company", "Offer Type", "Stipend", "Package"].map((h) => (
                  <TableCell key={h} sx={{ color: "white", fontWeight: "bold" }}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.map((s, idx) => (
                <TableRow key={s.reg_no}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{s.reg_no}</TableCell>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>{s.email}</TableCell>
                  <TableCell>{s.department}</TableCell>
                  <TableCell>{s.offers[0]?.company || "-"}</TableCell>
                  <TableCell>{s.offers[0]?.offer_type || "-"}</TableCell>
                  <TableCell>{s.offers[0]?.stipend || "-"}</TableCell>
                  <TableCell>{s.offers[0]?.package || "-"}</TableCell>
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
