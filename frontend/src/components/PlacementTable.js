// import React, { useEffect, useState } from "react";
// import * as XLSX from "xlsx";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Paper,
//   Select,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { usePlacement } from "../MainTable/MainPlacementTable";

// const PlacementTable = ({ studentData = [] }) => {
//   const { updateStudentOffers } = usePlacement();
//   const [students, setStudents] = useState([]);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [newStudent, setNewStudent] = useState({
//     reg_no: "",
//     name: "",
//     email: "",
//     department: "",
//     status: "",
//     firm_name: "",
//     firm_reg_no: "",
//     gst_no: "",
//     role_in_firm: "",
//     higher_study_college: "",
//     higher_study_degree: "",
//     higher_study_country: "",
//   });

  // useEffect(() => {
  //   const normalize = (val) =>
  //     typeof val === "object" && val !== null && "String" in val
  //       ? val.String
  //       : val ?? "";

  //   const transformed = (studentData || []).map((s, i) => ({
  //     sNo: i + 1,
  //     regNo: normalize(s.reg_no || s.regNo),
  //     name: normalize(s.name),
  //     department: normalize(s.department),
  //     email: normalize(s.email),
  //     status: normalize(s.status),
  //     offers: s.offers || [],
  //     business:
  //       s.firm_name || s.firm_reg_no || s.gst_no || s.role_in_firm
  //         ? {
  //             firm: s.firm_name,
  //             regNo: s.firm_reg_no,
  //             gst: s.gst_no,
  //             role: s.role_in_firm,
  //           }
  //         : null,
  //     higherStudies:
  //       s.higher_study_college ||
  //       s.higher_study_degree ||
  //       s.higher_study_country
  //         ? {
  //             college: s.higher_study_college,
  //             degree: s.higher_study_degree,
  //             country: s.higher_study_country,
  //           }
  //         : null,
  //   }));

  //   setStudents(transformed);
  // }, [studentData]);

//   useEffect(() => {
//   if (!studentData || studentData.length === 0) return;

//   const normalize = (val) =>
//     typeof val === "object" && val !== null && "String" in val
//       ? val.String
//       : val ?? "";

//   const transformed = studentData.map((s, i) => ({
//     sNo: i + 1,
//     regNo: normalize(s.reg_no || s.regNo),
//     name: normalize(s.name),
//     department: normalize(s.department),
//     email: normalize(s.email),
//     status: normalize(s.status),
//     offers: s.offers || [],
//     business:
//       s.firm_name || s.firm_reg_no || s.gst_no || s.role_in_firm
//         ? {
//             firm: s.firm_name,
//             regNo: s.firm_reg_no,
//             gst: s.gst_no,
//             role: s.role_in_firm,
//           }
//         : null,
//     higherStudies:
//       s.higher_study_college ||
//       s.higher_study_degree ||
//       s.higher_study_country
//         ? {
//             college: s.higher_study_college,
//             degree: s.higher_study_degree,
//             country: s.higher_study_country,
//           }
//         : null,
//   }));

//   setStudents(transformed);
// }, [studentData]);


//   const handleExportExcel = () => {
//     const ws = XLSX.utils.json_to_sheet(students);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Students");
//     XLSX.writeFile(wb, "students.xlsx");
//   };

//   const handleImportExcel = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onload = (evt) => {
//       const bstr = evt.target.result;
//       const wb = XLSX.read(bstr, { type: "binary" });
//       const wsname = wb.SheetNames[0];
//       const ws = wb.Sheets[wsname];
//       const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
//       const headers = data[0];
//       const rows = data.slice(1);
//       const newData = rows.map((row, i) => {
//         const obj = {};
//         headers.forEach((header, idx) => {
//           obj[header] = row[idx];
//         });
//         return { sNo: i + 1, ...obj };
//       });
//       setStudents(newData);
//     };
//     reader.readAsBinaryString(file);
//   };

//   const handleDialogChange = (e) => {
//     const { name, value } = e.target;
//     setNewStudent({ ...newStudent, [name]: value });
//   };

//   const handleAddStudent = () => {
//     const formatted = {
//       sNo: students.length + 1,
//       regNo: newStudent.reg_no,
//       name: newStudent.name,
//       department: newStudent.department,
//       email: newStudent.email,
//       status: newStudent.status,
//       offers: [],
//       business:
//         newStudent.status === "Entrepreneurship or Business"
//           ? {
//               firm: newStudent.firm_name,
//               regNo: newStudent.firm_reg_no,
//               gst: newStudent.gst_no,
//               role: newStudent.role_in_firm,
//             }
//           : null,
//       higherStudies:
//         newStudent.status === "HigherStudies"
//           ? {
//               college: newStudent.higher_study_college,
//               degree: newStudent.higher_study_degree,
//               country: newStudent.higher_study_country,
//             }
//           : null,
//     };
//     setStudents([...students, formatted]);
//     setDialogOpen(false);
//     setNewStudent({
//       reg_no: "",
//       name: "",
//       email: "",
//       department: "",
//       status: "",
//       firm_name: "",
//       firm_reg_no: "",
//       gst_no: "",
//       role_in_firm: "",
//       higher_study_college: "",
//       higher_study_degree: "",
//       higher_study_country: "",
//     });
//   };

//   return (
//     <Box>
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={2}
//         flexWrap="wrap"
//         gap={2}
//       >
//         <Box display="flex" gap={2}>
//           <Button variant="contained" color="warning">
//             View Summary
//           </Button>
//           <label htmlFor="import-excel">
//             <input
//               accept=".xlsx, .xls"
//               style={{ display: "none" }}
//               id="import-excel"
//               type="file"
//               onChange={handleImportExcel}
//             />
//             <Button variant="outlined" component="span">
//               Import Excel
//             </Button>
//           </label>
//           <Button variant="outlined" onClick={handleExportExcel}>
//             Export Excel
//           </Button>
//         </Box>
//         <Button variant="contained" onClick={() => setDialogOpen(true)}>
//           Add Student
//         </Button>
//       </Box>

//       <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
//         <DialogTitle>Add New Student</DialogTitle>
//         <DialogContent
//           sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
//         >
//           {["reg_no", "name", "email", "department"].map((field) => (
//             <TextField
//               key={field}
//               name={field}
//               label={field.replace("_", " ").toUpperCase()}
//               value={newStudent[field]}
//               onChange={handleDialogChange}
//             />
//           ))}
//           <TextField
//             name="status"
//             label="Placement Status"
//             select
//             value={newStudent.status}
//             onChange={handleDialogChange}
//           >
//             <MenuItem value="OnCampus">OnCampus</MenuItem>
//             <MenuItem value="OffCampus">OffCampus</MenuItem>
//             <MenuItem value="Entrepreneurship or Business">
//               Entrepreneurship or Business
//             </MenuItem>
//             <MenuItem value="HigherStudies">HigherStudies</MenuItem>
//           </TextField>
//           {newStudent.status === "Entrepreneurship or Business" && (
//             <>
//               <TextField
//                 name="firm_name"
//                 label="Firm Name"
//                 value={newStudent.firm_name}
//                 onChange={handleDialogChange}
//               />
//               <TextField
//                 name="firm_reg_no"
//                 label="Registration No"
//                 value={newStudent.firm_reg_no}
//                 onChange={handleDialogChange}
//               />
//               <TextField
//                 name="gst_no"
//                 label="GST No"
//                 value={newStudent.gst_no}
//                 onChange={handleDialogChange}
//               />
//               <TextField
//                 name="role_in_firm"
//                 label="Role in Firm"
//                 value={newStudent.role_in_firm}
//                 onChange={handleDialogChange}
//               />
//             </>
//           )}
//           {newStudent.status === "HigherStudies" && (
//             <>
//               <TextField
//                 name="higher_study_college"
//                 label="College"
//                 value={newStudent.higher_study_college}
//                 onChange={handleDialogChange}
//               />
//               <TextField
//                 name="higher_study_degree"
//                 label="Degree"
//                 value={newStudent.higher_study_degree}
//                 onChange={handleDialogChange}
//               />
//               <TextField
//                 name="higher_study_country"
//                 label="Country"
//                 value={newStudent.higher_study_country}
//                 onChange={handleDialogChange}
//               />
//             </>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
//           <Button variant="contained" onClick={handleAddStudent}>
//             Add
//           </Button>
//         </DialogActions>
//       </Dialog>

      
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead sx={{ backgroundColor: "#ec7000" }}>
//               <TableRow>
//                 <TableCell>S.No</TableCell>
//                 <TableCell>Reg No</TableCell>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Branch</TableCell>
//                 <TableCell>Placement Status</TableCell>
//                 <TableCell>Company</TableCell>
//                 <TableCell>Offer Type</TableCell>
//                 <TableCell>Stipend</TableCell>
//                 <TableCell>Internship</TableCell>
//                 <TableCell>Package</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {students.map((student, index) => {
//                 const offer = student.offers?.[0] || {};
//                 return (
//                   <TableRow key={index}>
//                     <TableCell>{student.sNo}</TableCell>
//                     <TableCell>{student.regNo}</TableCell>
//                     <TableCell>{student.name}</TableCell>
//                     <TableCell>{student.department}</TableCell>
//                     <TableCell>{student.status}</TableCell>
//                     <TableCell>{offer.company || "-"}</TableCell>
//                     <TableCell>{offer.offer_type || "-"}</TableCell>
//                     <TableCell>{offer.stipend || "-"}</TableCell>
//                     <TableCell>{offer.internship || "-"}</TableCell>
//                     <TableCell>{offer.package || "-"}</TableCell>
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </Box>
//   );
// };

// // export default PlacementTable;
// import React, { useState, useEffect } from "react";
// import * as XLSX from "xlsx";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   MenuItem,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
// } from "@mui/material";
// import { usePlacement } from "../MainTable/MainPlacementTable";
// import { useParams } from "react-router-dom"; // ✅ Added

// const PlacementTable = ({ studentData = [] }) => {
//   const { updateStudentOffers } = usePlacement();
//   const [students, setStudents] = useState(studentData);
//   const { branch } = useParams(); // ✅ Added
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [newStudent, setNewStudent] = useState({
//     reg_no: "",
//     name: "",
//     email: "",
//     department: "",
//     status: "",
//     firm_name: "",
//     firm_reg_no: "",
//     gst_no: "",
//     role_in_firm: "",
//     higher_study_college: "",
//     higher_study_degree: "",
//     higher_study_country: "",
//   });

//   useEffect(() => {
//     setStudents(studentData);
//   }, [studentData]);

//   const handleExportExcel = () => {
//     const ws = XLSX.utils.json_to_sheet(students);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Students");
//     XLSX.writeFile(wb, "students.xlsx");
//   };

//   const handleImportExcel = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onload = (evt) => {
//       const bstr = evt.target.result;
//       const wb = XLSX.read(bstr, { type: "binary" });
//       const wsname = wb.SheetNames[0];
//       const ws = wb.Sheets[wsname];
//       const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
//       const headers = data[0];
//       const rows = data.slice(1);
//       const newData = rows.map((row, i) => {
//         const obj = {};
//         headers.forEach((header, idx) => {
//           obj[header] = row[idx];
//         });
//         return { sNo: i + 1, ...obj };
//       });
//       setStudents(newData);
//     };
//     reader.readAsBinaryString(file);
//   };

//   const handleDialogChange = (e) => {
//     const { name, value } = e.target;
//     setNewStudent({ ...newStudent, [name]: value });
//   };

//   const handleAddStudent = () => {
//     const formatted = {
//       sNo: students.length + 1,
//       regNo: newStudent.reg_no,
//       name: newStudent.name,
//       department: newStudent.department,
//       email: newStudent.email,
//       status: newStudent.status,
//       offers: [],
//       business:
//         newStudent.status === "Entrepreneurship or Business"
//           ? {
//               firm: newStudent.firm_name,
//               regNo: newStudent.firm_reg_no,
//               gst: newStudent.gst_no,
//               role: newStudent.role_in_firm,
//             }
//           : null,
//       higherStudies:
//         newStudent.status === "HigherStudies"
//           ? {
//               college: newStudent.higher_study_college,
//               degree: newStudent.higher_study_degree,
//               country: newStudent.higher_study_country,
//             }
//           : null,
//     };
//     setStudents([...students, formatted]);
//     setDialogOpen(false);
//     setNewStudent({
//       reg_no: "",
//       name: "",
//       email: "",
//       department: "",
//       status: "",
//       firm_name: "",
//       firm_reg_no: "",
//       gst_no: "",
//       role_in_firm: "",
//       higher_study_college: "",
//       higher_study_degree: "",
//       higher_study_country: "",
//     });
//   };

//   return (
//     <Box>
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={2}
//         flexWrap="wrap"
//         gap={2}
//       >
//         <Box display="flex" gap={2}>
//           {/* ✅ Hide this summary button if on a branch page */}
//           {!branch && (
//             <Button variant="contained" sx={{ backgroundColor: "#ec7000", color: "#fff" }}>
//               View Summary
//             </Button>
//           )}
//           <label htmlFor="import-excel">
//             <input
//               accept=".xlsx, .xls"
//               style={{ display: "none" }}
//               id="import-excel"
//               type="file"
//               onChange={handleImportExcel}
//             />
//             <Button variant="outlined" component="span">
//               Import Excel
//             </Button>
//           </label>
//           <Button variant="outlined" onClick={handleExportExcel}>
//             Export Excel
//           </Button>
//         </Box>
//         <Button variant="contained" onClick={() => setDialogOpen(true)}>
//           Add Student
//         </Button>
//       </Box>

//       {/* Dialog */}
//       <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
//         <DialogTitle>Add New Student</DialogTitle>
//         <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
//           {["reg_no", "name", "email", "department"].map((field) => (
//             <TextField
//               key={field}
//               name={field}
//               label={field.replace("_", " ").toUpperCase()}
//               value={newStudent[field]}
//               onChange={handleDialogChange}
//             />
//           ))}
//           <TextField
//             name="status"
//             label="Placement Status"
//             select
//             value={newStudent.status}
//             onChange={handleDialogChange}
//           >
//             <MenuItem value="OnCampus">OnCampus</MenuItem>
//             <MenuItem value="OffCampus">OffCampus</MenuItem>
//             <MenuItem value="Entrepreneurship or Business">Entrepreneurship or Business</MenuItem>
//             <MenuItem value="HigherStudies">HigherStudies</MenuItem>
//           </TextField>
//           {newStudent.status === "Entrepreneurship or Business" && (
//             <>
//               <TextField name="firm_name" label="Firm Name" value={newStudent.firm_name} onChange={handleDialogChange} />
//               <TextField name="firm_reg_no" label="Registration No" value={newStudent.firm_reg_no} onChange={handleDialogChange} />
//               <TextField name="gst_no" label="GST No" value={newStudent.gst_no} onChange={handleDialogChange} />
//               <TextField name="role_in_firm" label="Role in Firm" value={newStudent.role_in_firm} onChange={handleDialogChange} />
//             </>
//           )}
//           {newStudent.status === "HigherStudies" && (
//             <>
//               <TextField name="higher_study_college" label="College" value={newStudent.higher_study_college} onChange={handleDialogChange} />
//               <TextField name="higher_study_degree" label="Degree" value={newStudent.higher_study_degree} onChange={handleDialogChange} />
//               <TextField name="higher_study_country" label="Country" value={newStudent.higher_study_country} onChange={handleDialogChange} />
//             </>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
//           <Button variant="contained" onClick={handleAddStudent}>Add</Button>
//         </DialogActions>
//       </Dialog>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead sx={{ backgroundColor: "#ec7000" }}>
//             <TableRow>
//               <TableCell>S.No</TableCell>
//               <TableCell>Reg No</TableCell>
//               <TableCell>Name</TableCell>
//               <TableCell>Branch</TableCell>
//               <TableCell>Placement Status</TableCell>
//               <TableCell>Company</TableCell>
//               <TableCell>Offer Type</TableCell>
//               <TableCell>Stipend</TableCell>
//               <TableCell>Internship</TableCell>
//               <TableCell>Package</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {students.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={10} align="center">
//                   No students available. Add or import to populate the list.
//                 </TableCell>
//               </TableRow>
//             ) : (
//               students.map((student, index) => {
//                 const offer = student.offers?.[0] || {};
//                 return (
//                   <TableRow key={index}>
//                     <TableCell>{student.sNo}</TableCell>
//                     <TableCell>{student.reg_no}</TableCell>
//                     <TableCell>{student.name}</TableCell>
//                     <TableCell>{student.department}</TableCell>
//                     <TableCell>{student.status}</TableCell>
//                     <TableCell>{offer.company || "-"}</TableCell>
//                     <TableCell>{offer.offer_type || "-"}</TableCell>
//                     <TableCell>{offer.stipend || "-"}</TableCell>
//                     <TableCell>{offer.internship || "-"}</TableCell>
//                     <TableCell>{offer.package || "-"}</TableCell>
//                   </TableRow>
//                 );
//               })
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// // export default PlacementTable;
// import React, { useState, useEffect } from "react";
// import * as XLSX from "xlsx";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   MenuItem,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
// } from "@mui/material";
// import { usePlacement } from "../MainTable/MainPlacementTable";
// import { useParams } from "react-router-dom";

// const PlacementTable = ({ studentData = [] }) => {
//   const { updateStudentOffers, addStudent, fetchAllStudents } = usePlacement();
//   const [students, setStudents] = useState(studentData);
//   const { branch } = useParams();
//   const [dialogOpen, setDialogOpen] = useState(false);

//   const [newStudent, setNewStudent] = useState({
//     reg_no: "",
//     name: "",
//     email: "",
//     department: "",
//     status: "",
//     offers: [],
//     firm_name: "",
//     firm_reg_no: "",
//     gst_no: "",
//     role_in_firm: "",
//     higher_study_college: "",
//     higher_study_degree: "",
//     higher_study_country: "",
//   });

//   useEffect(() => {
//     setStudents(studentData);
//   }, [studentData]);

//   const handleExportExcel = () => {
//     const ws = XLSX.utils.json_to_sheet(students);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Students");
//     XLSX.writeFile(wb, "students.xlsx");
//   };

//   const handleImportExcel = async (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onload = async (evt) => {
//       const bstr = evt.target.result;
//       const wb = XLSX.read(bstr, { type: "binary" });
//       const wsname = wb.SheetNames[0];
//       const ws = wb.Sheets[wsname];
//       const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
//       const headers = data[0];
//       const rows = data.slice(1);

//       const newData = rows.map((row) => {
//         const obj = {};
//         headers.forEach((header, idx) => {
//           obj[header] = row[idx];
//         });

//         const offers = [];
//         if (obj.Company1) {
//           offers.push({
//             company: obj.Company1,
//             offer_type: obj.OfferType1 || "",
//             stipend: obj.Stipend1 || "",
//             internship: obj.Internship1 || "",
//             package: obj.Package1 || "",
//           });
//         }
//         if (obj.Company2) {
//           offers.push({
//             company: obj.Company2,
//             offer_type: obj.OfferType2 || "",
//             stipend: obj.Stipend2 || "",
//             internship: obj.Internship2 || "",
//             package: obj.Package2 || "",
//           });
//         }
//         if (obj.Company3) {
//           offers.push({
//             company: obj.Company3,
//             offer_type: obj.OfferType3 || "",
//             stipend: obj.Stipend3 || "",
//             internship: obj.Internship3 || "",
//             package: obj.Package3 || "",
//           });
//         }

//         return {
//           regNo: obj.RegNo || "",
//           name: obj.Name || "",
//           email: obj.Email || "",
//           department: obj.Department || "",
//           status: obj.Status || "",
//           offers,
//         };
//       });

//       try {
//         for (const student of newData) {
//           await addStudent(student);
//         }
//         await fetchAllStudents();
//       } catch (err) {
//         console.error("❌ Failed to send Excel data to backend:", err);
//       }
//     };

//     reader.readAsBinaryString(file);
//   };

//   const handleDialogChange = (e) => {
//     const { name, value } = e.target;
//     setNewStudent({ ...newStudent, [name]: value });
//   };

//   const handleAddStudent = async () => {
//     const formatted = {
//       regNo: newStudent.reg_no,
//       name: newStudent.name,
//       email: newStudent.email,
//       department: newStudent.department,
//       status: newStudent.status,
//       offers: [],
//     };

//     try {
//       await addStudent(formatted);
//       await fetchAllStudents();
//       setDialogOpen(false);
//       setNewStudent({
//         reg_no: "",
//         name: "",
//         email: "",
//         department: "",
//         status: "",
//         offers: [],
//         firm_name: "",
//         firm_reg_no: "",
//         gst_no: "",
//         role_in_firm: "",
//         higher_study_college: "",
//         higher_study_degree: "",
//         higher_study_country: "",
//       });
//     } catch (err) {
//       console.error("Failed to add student from PlacementTable:", err);
//     }
//   };

//   return (
//     <Box>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
//         <Box display="flex" gap={2}>
//           {!branch && (
//             <Button variant="contained" sx={{ backgroundColor: "#ec7000", color: "#fff" }}>
//               View Summary
//             </Button>
//           )}
//           <label htmlFor="import-excel">
//             <input
//               accept=".xlsx, .xls"
//               style={{ display: "none" }}
//               id="import-excel"
//               type="file"
//               onChange={handleImportExcel}
//             />
//             <Button variant="outlined" component="span">Import Excel</Button>
//           </label>
//           <Button variant="outlined" onClick={handleExportExcel}>Export Excel</Button>
//         </Box>
//         <Button variant="contained" onClick={() => setDialogOpen(true)}>Add Student</Button>
//       </Box>

//       <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
//         <DialogTitle>Add New Student</DialogTitle>
//         <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
//           {["reg_no", "name", "email", "department", "status"].map((field) => (
//             <TextField
//               key={field}
//               name={field}
//               label={field.replace("_", " ").toUpperCase()}
//               value={newStudent[field]}
//               onChange={handleDialogChange}
//             />
//           ))}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
//           <Button variant="contained" onClick={handleAddStudent}>Add</Button>
//         </DialogActions>
//       </Dialog>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead sx={{ backgroundColor: "#ec7000" }}>
//             <TableRow>
//               <TableCell>S.No</TableCell>
//               <TableCell>Reg No</TableCell>
//               <TableCell>Name</TableCell>
//               <TableCell>Branch</TableCell>
//               <TableCell>Placement Status</TableCell>
//               <TableCell>Company</TableCell>
//               <TableCell>Offer Type</TableCell>
//               <TableCell>Stipend</TableCell>
//               <TableCell>Internship</TableCell>
//               <TableCell>Package</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {students.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={10} align="center">
//                   No students available. Add or import to populate the list.
//                 </TableCell>
//               </TableRow>
//             ) : (
//               students.map((student, index) =>
//                 student.offers.map((offer, i) => (
//                   <TableRow key={`${index}-${i}`}>
//                     {i === 0 && (
//                       <>
//                         <TableCell rowSpan={student.offers.length}>{index + 1}</TableCell>
//                         <TableCell rowSpan={student.offers.length}>{student.reg_no}</TableCell>
//                         <TableCell rowSpan={student.offers.length}>{student.name}</TableCell>
//                         <TableCell rowSpan={student.offers.length}>{student.department}</TableCell>
//                         <TableCell rowSpan={student.offers.length}>{student.status}</TableCell>
//                       </>
//                     )}
//                     <TableCell>{offer.company || "-"}</TableCell>
//                     <TableCell>{offer.offer_type || "-"}</TableCell>
//                     <TableCell>{offer.stipend || "-"}</TableCell>
//                     <TableCell>{offer.internship || "-"}</TableCell>
//                     <TableCell>{offer.package || "-"}</TableCell>
//                   </TableRow>
//                 ))
//               )
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// // export default PlacementTable;
// import React, { useState, useEffect } from "react";
// import * as XLSX from "xlsx";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
// } from "@mui/material";
// import { usePlacement } from "../MainTable/MainPlacementTable";
// import { useParams } from "react-router-dom";

// const PlacementTable = ({ studentData = [], companyView = null }) => {
//   const { updateStudentOffers, addStudent, fetchAllStudents } = usePlacement();
//   const [students, setStudents] = useState([]);
//   const { branch } = useParams();
//   const [dialogOpen, setDialogOpen] = useState(false);

//   const [newStudent, setNewStudent] = useState({
//     reg_no: "",
//     name: "",
//     email: "",
//     department: "",
//     status: "",
//     offers: [],
//     firm_name: "",
//     firm_reg_no: "",
//     gst_no: "",
//     role_in_firm: "",
//     higher_study_college: "",
//     higher_study_degree: "",
//     higher_study_country: "",
//   });

//   useEffect(() => {
//     if (!companyView) {
//       setStudents(studentData);
//     } else {
//       const filtered = studentData.filter((student) =>
//         (student.offers || []).some(
//           (offer) => offer.company?.toLowerCase() === companyView.toLowerCase()
//         )
//       );
//       setStudents(filtered);
//     }
//   }, [studentData, companyView]);

//   const handleExportExcel = () => {
//     const ws = XLSX.utils.json_to_sheet(students);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Students");
//     XLSX.writeFile(wb, "students.xlsx");
//   };

//   const handleImportExcel = async (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onload = async (evt) => {
//       const bstr = evt.target.result;
//       const wb = XLSX.read(bstr, { type: "binary" });
//       const wsname = wb.SheetNames[0];
//       const ws = wb.Sheets[wsname];
//       const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
//       const headers = data[0];
//       const rows = data.slice(1);

//       const newData = rows.map((row) => {
//         const obj = {};
//         headers.forEach((header, idx) => {
//           obj[header] = row[idx];
//         });

//         const offers = [];
//         if (obj.Company1) {
//           offers.push({
//             company: obj.Company1,
//             offer_type: obj.OfferType1 || "",
//             stipend: obj.Stipend1 || "",
//             internship: obj.Internship1 || "",
//             package: obj.Package1 || "",
//           });
//         }
//         if (obj.Company2) {
//           offers.push({
//             company: obj.Company2,
//             offer_type: obj.OfferType2 || "",
//             stipend: obj.Stipend2 || "",
//             internship: obj.Internship2 || "",
//             package: obj.Package2 || "",
//           });
//         }
//         if (obj.Company3) {
//           offers.push({
//             company: obj.Company3,
//             offer_type: obj.OfferType3 || "",
//             stipend: obj.Stipend3 || "",
//             internship: obj.Internship3 || "",
//             package: obj.Package3 || "",
//           });
//         }

//         return {
//           regNo: obj.RegNo || "",
//           name: obj.Name || "",
//           email: obj.Email || "",
//           department: obj.Department || "",
//           status: obj.Status || "",
//           offers,
//         };
//       });

//       try {
//         for (const student of newData) {
//           await addStudent(student);
//         }
//         await fetchAllStudents();
//       } catch (err) {
//         console.error("❌ Failed to send Excel data to backend:", err);
//       }
//     };

//     reader.readAsBinaryString(file);
//   };

//   const handleDialogChange = (e) => {
//     const { name, value } = e.target;
//     setNewStudent({ ...newStudent, [name]: value });
//   };

//   const handleAddStudent = async () => {
//     const formatted = {
//       regNo: newStudent.reg_no,
//       name: newStudent.name,
//       email: newStudent.email,
//       department: newStudent.department,
//       status: newStudent.status,
//       offers: [],
//     };

//     try {
//       await addStudent(formatted);
//       await fetchAllStudents();
//       setDialogOpen(false);
//       setNewStudent({
//         reg_no: "",
//         name: "",
//         email: "",
//         department: "",
//         status: "",
//         offers: [],
//         firm_name: "",
//         firm_reg_no: "",
//         gst_no: "",
//         role_in_firm: "",
//         higher_study_college: "",
//         higher_study_degree: "",
//         higher_study_country: "",
//       });
//     } catch (err) {
//       console.error("Failed to add student from PlacementTable:", err);
//     }
//   };

//   return (
//     <Box>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
//         <Box display="flex" gap={2}>
//           {!branch && (
//             <Button variant="contained" sx={{ backgroundColor: "#ec7000", color: "#fff" }}>
//               View Summary
//             </Button>
//           )}
//           <label htmlFor="import-excel">
//             <input
//               accept=".xlsx, .xls"
//               style={{ display: "none" }}
//               id="import-excel"
//               type="file"
//               onChange={handleImportExcel}
//             />
//             <Button variant="outlined" component="span">Import Excel</Button>
//           </label>
//           <Button variant="outlined" onClick={handleExportExcel}>Export Excel</Button>
//         </Box>
//         <Button variant="contained" onClick={() => setDialogOpen(true)}>Add Student</Button>
//       </Box>

//       <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
//         <DialogTitle>Add New Student</DialogTitle>
//         {/* <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
//           {["reg_no", "name", "email", "department", "status"].map((field) => (
//             <TextField
//               key={field}
//               name={field}
//               label={field.replace("_", " ").toUpperCase()}
//               value={newStudent[field]}
//               onChange={handleDialogChange}
//             />
//           ))}
//         </DialogContent> */}<DialogContent dividers sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//   {["reg_no", "name", "email", "department"].map((field) => (
//     <TextField
//       key={field}
//       name={field}
//       label={field.replace("_", " ").toUpperCase()}
//       variant="outlined"
//       fullWidth
//       value={newStudent[field]}
//       onChange={handleDialogChange}
//     />
//   ))}

//   <TextField
//   select
//     label="Offer Type"
//     name="offer_type"
//     value={newStudent.offer_type || ""}
//     onChange={handleDialogChange}
//     fullWidth
//     variant="outlined"
//     SelectProps={{
//       native: true,
//     }}
//   >
//     <option value="">Select</option>
//     <option value="PPO">PPO</option>
//     <option value="PPO + I">PPO + I</option>
//     <option value="Intern">Intern</option>
//   </TextField>

//   <TextField
//     name="stipend"
//     label="Stipend"
//     variant="outlined"
//     fullWidth
//     value={newStudent.stipend || ""}
//     onChange={handleDialogChange}
//   />

//   <TextField
//     name="package"
//     label="Package (LPA)"
//     variant="outlined"
//     fullWidth
//     value={newStudent.package || ""}
//     onChange={handleDialogChange}
//   />
// </DialogContent>

//         <DialogActions>
//           <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
//           <Button variant="contained" onClick={handleAddStudent}>Add</Button>
//         </DialogActions>
//       </Dialog>
// {/* 
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead sx={{ backgroundColor: "#ec7000" }}>
//             <TableRow>
//               <TableCell>S.No</TableCell>
//               <TableCell>Reg No</TableCell>
//               <TableCell>Name</TableCell>
//               <TableCell>Branch</TableCell>
//               <TableCell>Placement Status</TableCell>
//               <TableCell>Company</TableCell>
//               <TableCell>Offer Type</TableCell>
//               <TableCell>Stipend</TableCell>
//               <TableCell>Internship</TableCell>
//               <TableCell>Package</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//   {studentData.length === 0 ? (
//     <TableRow>
//       <TableCell colSpan={10} align="center">
//         No data to display. Add students to see details.
//       </TableCell>
//     </TableRow>
//   ) : students.length === 0 ? (
//     <TableRow>
//       <TableCell colSpan={10} align="center">
//         No students placed in {companyView}.
//       </TableCell>
//     </TableRow>
//   ) : (
//     students.map((student, index) => {
//       const offers = Array.isArray(student.offers) ? student.offers : [];
//       const filteredOffers = companyView
//         ? offers.filter((offer) => offer.company?.toLowerCase() === companyView.toLowerCase())
//         : offers;

//       if (filteredOffers.length === 0) {
//         return (
//           <TableRow key={index}>
//             <TableCell>{index + 1}</TableCell>
//             <TableCell>{student.regNo || student.reg_no}</TableCell>
//             <TableCell>{student.name}</TableCell>
//             <TableCell>{student.department}</TableCell>
//             <TableCell>{student.status}</TableCell>
//             <TableCell colSpan={5} align="center">
//               No offers from this company
//             </TableCell>
//           </TableRow>
//         );
//       }

//       return filteredOffers.map((offer, i) => (
//         <TableRow key={`${index}-${i}`}>
//           {i === 0 && (
//             <>
//               <TableCell rowSpan={filteredOffers.length}>{index + 1}</TableCell>
//               <TableCell rowSpan={filteredOffers.length}>{student.regNo || student.reg_no}</TableCell>
//               <TableCell rowSpan={filteredOffers.length}>{student.name}</TableCell>
//               <TableCell rowSpan={filteredOffers.length}>{student.department}</TableCell>
//               <TableCell rowSpan={filteredOffers.length}>{student.status}</TableCell>
//             </>
//           )}
//           <TableCell>{offer.company || "-"}</TableCell>
//           <TableCell>{offer.offer_type || offer.type || "-"}</TableCell>
//           <TableCell>{offer.stipend || "-"}</TableCell>
//           <TableCell>{offer.internship ? "Yes" : "No"}</TableCell>
//           <TableCell>{offer.package || "-"}</TableCell>
//         </TableRow>
//       ));
//     })
//   )}
// </TableBody>
//         </Table>
//       </TableContainer> */}
//       <TableContainer component={Paper}>
//   <Table>
//     {/* Always render table head */}
//     <TableHead sx={{ backgroundColor: "#ec7000" }}>
//       <TableRow>
//         <TableCell>S.No</TableCell>
//         <TableCell>Reg No</TableCell>
//         <TableCell>Name</TableCell>
//         <TableCell>Branch</TableCell>
//         <TableCell>Placement Status</TableCell>
//         <TableCell>Company</TableCell>
//         <TableCell>Offer Type</TableCell>
//         <TableCell>Stipend</TableCell>
//         <TableCell>Internship</TableCell>
//         <TableCell>Package</TableCell>
//       </TableRow>
//     </TableHead>

//     <TableBody>
//       {studentData.length === 0 ? (
//         <TableRow>
//           <TableCell colSpan={10} align="center">
//             No student data found.
//           </TableCell>
//         </TableRow>
//       ) : students.length === 0 ? (
//         <TableRow>
//           <TableCell colSpan={10} align="center">
//             No students placed in {companyView}.
//           </TableCell>
//         </TableRow>
//       ) : (
//         students.map((student, index) => {
//           const offers = Array.isArray(student.offers) ? student.offers : [];
//           const filteredOffers = companyView
//             ? offers.filter(
//                 (offer) =>
//                   offer.company?.toLowerCase() === companyView.toLowerCase()
//               )
//             : offers;

//           if (filteredOffers.length === 0) {
//             return (
//               <TableRow key={index}>
//                 <TableCell>{index + 1}</TableCell>
//                 <TableCell>{student.regNo || student.reg_no}</TableCell>
//                 <TableCell>{student.name}</TableCell>
//                 <TableCell>{student.department}</TableCell>
//                 <TableCell>{student.status}</TableCell>
//                 <TableCell colSpan={5} align="center">
//                   No offers from this company
//                 </TableCell>
//               </TableRow>
//             );
//           }

//           return filteredOffers.map((offer, i) => (
//             <TableRow key={`${index}-${i}`}>
//               {i === 0 && (
//                 <>
//                   <TableCell rowSpan={filteredOffers.length}>
//                     {index + 1}
//                   </TableCell>
//                   <TableCell rowSpan={filteredOffers.length}>
//                     {student.regNo || student.reg_no}
//                   </TableCell>
//                   <TableCell rowSpan={filteredOffers.length}>
//                     {student.name}
//                   </TableCell>
//                   <TableCell rowSpan={filteredOffers.length}>
//                     {student.department}
//                   </TableCell>
//                   <TableCell rowSpan={filteredOffers.length}>
//                     {student.status}
//                   </TableCell>
//                 </>
//               )}
//               <TableCell>{offer.company || "-"}</TableCell>
//               <TableCell>{offer.offer_type || offer.type || "-"}</TableCell>
//               <TableCell>{offer.stipend || "-"}</TableCell>
//               <TableCell>{offer.internship ? "Yes" : "No"}</TableCell>
//               <TableCell>{offer.package || "-"}</TableCell>
//             </TableRow>
//           ));
//         })
//       )}
//     </TableBody>
//   </Table>
// </TableContainer>
//     </Box>
//   );
// };

// // export default PlacementTable;import React, { useState, useEffect } from "react";
// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   MenuItem,
//   Checkbox,
//   FormControlLabel,
// } from "@mui/material";
// import { useParams } from "react-router-dom";
// import * as XLSX from "xlsx";
// import { usePlacement } from "../MainTable/MainPlacementTable";

// const PlacementTable = ({ studentData = [], companyView = null }) => {
//   const { updateStudentOffers, addStudent, fetchAllStudents } = usePlacement();
//   const [students, setStudents] = useState([]);
//   const { branch } = useParams();
//   const [dialogOpen, setDialogOpen] = useState(false);

//   const [newStudent, setNewStudent] = useState({
//     reg_no: "",
//     name: "",
//     email: "",
//     department: "",
//     status: "",
//     offer_type: "",
//     stipend: "",
//     internship: false,
//     package: "",
//   });

//   useEffect(() => {
//     if (!companyView) {
//       setStudents(studentData);
//     } else {
//       const filtered = studentData.filter((student) =>
//         (student.offers || []).some(
//           (offer) =>
//             offer.company?.toLowerCase() === companyView.toLowerCase()
//         )
//       );
//       setStudents(filtered);
//     }
//   }, [studentData, companyView]);

//   const handleDialogChange = (e) => {
//     const { name, value } = e.target;
//     setNewStudent({ ...newStudent, [name]: value });
//   };

//   const handleCheckboxChange = (e) => {
//     const { name, checked } = e.target;
//     setNewStudent((prev) => ({ ...prev, [name]: checked }));
//   };

//   const handleAddStudent = async () => {
//     const payload = {
//       regNo: newStudent.reg_no,
//       name: newStudent.name,
//       email: newStudent.email,
//       department: newStudent.department,
//       status: newStudent.status,
//       offers: [
//         {
//           company: companyView || "", // fallback for dept view
//           offer_type: newStudent.offer_type,
//           stipend: newStudent.stipend,
//           internship: newStudent.internship,
//           package: newStudent.package,
//         },
//       ],
//     };

//     try {
//       await addStudent(payload);
//       await fetchAllStudents();
//       setDialogOpen(false);
//       setNewStudent({
//         reg_no: "",
//         name: "",
//         email: "",
//         department: "",
//         status: "",
//         offer_type: "",
//         stipend: "",
//         internship: false,
//         package: "",
//       });
//     } catch (err) {
//       console.error("❌ Failed to add student:", err);
//     }
//   };

//   return (
//     <Box>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
//         <Button variant="contained" onClick={() => setDialogOpen(true)}>
//           Add Student
//         </Button>
//       </Box>

//       <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
//         <DialogTitle>Add New Student</DialogTitle>
//         <DialogContent dividers sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//           {["reg_no", "name", "email", "department", "status"].map((field) => (
//             <TextField
//               key={field}
//               name={field}
//               label={field.replace("_", " ").toUpperCase()}
//               value={newStudent[field]}
//               onChange={handleDialogChange}
//               fullWidth
//               variant="outlined"
//             />
//           ))}

//           <TextField
//             select
//             label="Offer Type"
//             name="offer_type"
//             value={newStudent.offer_type}
//             onChange={handleDialogChange}
//             fullWidth
//           >
//             <MenuItem value="">Select</MenuItem>
//             <MenuItem value="PPO">PPO</MenuItem>
//             <MenuItem value="PPO + I">PPO + I</MenuItem>
//             <MenuItem value="Intern">Intern</MenuItem>
//           </TextField>

//           <TextField
//             name="stipend"
//             label="Stipend"
//             value={newStudent.stipend}
//             onChange={handleDialogChange}
//             fullWidth
//             variant="outlined"
//           />

//           <FormControlLabel
//             control={
//               <Checkbox
//                 name="internship"
//                 checked={newStudent.internship}
//                 onChange={handleCheckboxChange}
//               />
//             }
//             label="Internship"
//           />

//           <TextField
//             name="package"
//             label="Package (LPA)"
//             value={newStudent.package}
//             onChange={handleDialogChange}
//             fullWidth
//             variant="outlined"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
//           <Button variant="contained" onClick={handleAddStudent}>Add</Button>
//         </DialogActions>
//       </Dialog>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead sx={{ backgroundColor: "#ec7000" }}>
//             <TableRow>
//               <TableCell>S.No</TableCell>
//               <TableCell>Reg No</TableCell>
//               <TableCell>Name</TableCell>
//               <TableCell>Branch</TableCell>
//               <TableCell>Placement Status</TableCell>
//               <TableCell>Company</TableCell>
//               <TableCell>Offer Type</TableCell>
//               <TableCell>Stipend</TableCell>
//               <TableCell>Internship</TableCell>
//               <TableCell>Package</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {studentData.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={10} align="center">
//                   No student data found.
//                 </TableCell>
//               </TableRow>
//             ) : students.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={10} align="center">
//                   No students placed in {companyView}.
//                 </TableCell>
//               </TableRow>
//             ) : (
//               students.map((student, index) => {
//                 const offers = Array.isArray(student.offers) ? student.offers : [];
//                 const filteredOffers = companyView
//                   ? offers.filter(
//                       (offer) =>
//                         offer.company?.toLowerCase() === companyView.toLowerCase()
//                     )
//                   : offers;

//                 if (filteredOffers.length === 0) {
//                   return (
//                     <TableRow key={index}>
//                       <TableCell>{index + 1}</TableCell>
//                       <TableCell>{student.regNo || student.reg_no}</TableCell>
//                       <TableCell>{student.name}</TableCell>
//                       <TableCell>{student.department}</TableCell>
//                       <TableCell>{student.status}</TableCell>
//                       <TableCell colSpan={5} align="center">No offers from this company</TableCell>
//                     </TableRow>
//                   );
//                 }

//                 return filteredOffers.map((offer, i) => (
//                   <TableRow key={`${index}-${i}`}>
//                     {i === 0 && (
//                       <>
//                         <TableCell rowSpan={filteredOffers.length}>{index + 1}</TableCell>
//                         <TableCell rowSpan={filteredOffers.length}>{student.regNo || student.reg_no}</TableCell>
//                         <TableCell rowSpan={filteredOffers.length}>{student.name}</TableCell>
//                         <TableCell rowSpan={filteredOffers.length}>{student.department}</TableCell>
//                         <TableCell rowSpan={filteredOffers.length}>{student.status}</TableCell>
//                       </>
//                     )}
//                     <TableCell>{offer.company || "-"}</TableCell>
//                     <TableCell>{offer.offer_type || offer.type || "-"}</TableCell>
//                     <TableCell>{offer.stipend || "-"}</TableCell>
//                     <TableCell>{offer.internship ? "Yes" : "No"}</TableCell>
//                     <TableCell>{offer.package || "-"}</TableCell>
//                   </TableRow>
//                 ));
//               })
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default PlacementTable;
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useParams } from "react-router-dom";
import * as XLSX from "xlsx";
import { usePlacement } from "../MainTable/MainPlacementTable";

const PlacementTable = ({ studentData = [], companyView = null }) => {
  const { updateStudentOffers, addStudent, fetchAllStudents } = usePlacement();
  const [students, setStudents] = useState([]);
  const { branch } = useParams();
  const [dialogOpen, setDialogOpen] = useState(false);

  const [newStudent, setNewStudent] = useState({
    reg_no: "",
    name: "",
    email: "",
    department: "",
    status: "",
    offer_type: "",
    stipend: "",
    internship: false,
    package: "",
  });

  useEffect(() => {
    if (!companyView) {
      setStudents(studentData);
    } else {
      const filtered = studentData.filter((student) =>
        (student.offers || []).some(
          (offer) =>
            offer.company?.toLowerCase() === companyView.toLowerCase()
        )
      );
      setStudents(filtered);
    }
  }, [studentData, companyView]);

  const handleDialogChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setNewStudent((prev) => ({ ...prev, [name]: checked }));
  };

  const handleAddStudent = async () => {
    const payload = {
      regNo: newStudent.reg_no,
      name: newStudent.name,
      email: newStudent.email,
      department: newStudent.department,
      status: newStudent.status,
      offers: [
        {
          company: companyView || "", // fallback for dept view
          offer_type: newStudent.offer_type,
          stipend: newStudent.stipend,
          internship: newStudent.internship,
          package: newStudent.package,
        },
      ],
    };

    try {
      await addStudent(payload);
      await fetchAllStudents();
      setDialogOpen(false);
      setNewStudent({
        reg_no: "",
        name: "",
        email: "",
        department: "",
        status: "",
        offer_type: "",
        stipend: "",
        internship: false,
        package: "",
      });
    } catch (err) {
      console.error("❌ Failed to add student:", err);
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
        <Button variant="contained" onClick={() => setDialogOpen(true)}>
          Add Student
        </Button>
      </Box>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add New Student</DialogTitle>
        <DialogContent dividers sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {["reg_no", "name", "email", "department", "status"].map((field) => (
            <TextField
              key={field}
              name={field}
              label={field.replace("_", " ").toUpperCase()}
              value={newStudent[field]}
              onChange={handleDialogChange}
              fullWidth
              variant="outlined"
            />
          ))}

          <TextField
            select
            label="Offer Type"
            name="offer_type"
            value={newStudent.offer_type}
            onChange={handleDialogChange}
            fullWidth
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="PPO">PPO</MenuItem>
            <MenuItem value="PPO + I">PPO + I</MenuItem>
            <MenuItem value="Intern">Intern</MenuItem>
          </TextField>

          <TextField
            name="stipend"
            label="Stipend"
            value={newStudent.stipend}
            onChange={handleDialogChange}
            fullWidth
            variant="outlined"
          />

          <FormControlLabel
            control={
              <Checkbox
                name="internship"
                checked={newStudent.internship}
                onChange={handleCheckboxChange}
              />
            }
            label="Internship"
          />

          <TextField
            name="package"
            label="Package (LPA)"
            value={newStudent.package}
            onChange={handleDialogChange}
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddStudent}>Add</Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#ec7000" }}>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Reg No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Branch</TableCell>
              <TableCell>Placement Status</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Offer Type</TableCell>
              <TableCell>Stipend</TableCell>
              <TableCell>Internship</TableCell>
              <TableCell>Package</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  No student data found.
                </TableCell>
              </TableRow>
            ) : students.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  No students placed in {companyView}.
                </TableCell>
              </TableRow>
            ) : (
              students.map((student, index) => {
                const offers = Array.isArray(student.offers) ? student.offers : [];
                const filteredOffers = companyView
                  ? offers.filter(
                      (offer) =>
                        offer.company?.toLowerCase() === companyView.toLowerCase()
                    )
                  : offers;

                if (filteredOffers.length === 0) {
                  return (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{student.regNo || student.reg_no}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.department}</TableCell>
                      <TableCell>{student.status}</TableCell>
                      <TableCell colSpan={5} align="center">No offers from this company</TableCell>
                    </TableRow>
                  );
                }

                return filteredOffers.map((offer, i) => (
                  <TableRow key={`${index}-${i}`}>
                    {i === 0 && (
                      <>
                        <TableCell rowSpan={filteredOffers.length}>{index + 1}</TableCell>
                        <TableCell rowSpan={filteredOffers.length}>{student.regNo || student.reg_no}</TableCell>
                        <TableCell rowSpan={filteredOffers.length}>{student.name}</TableCell>
                        <TableCell rowSpan={filteredOffers.length}>{student.department}</TableCell>
                        <TableCell rowSpan={filteredOffers.length}>{student.status}</TableCell>
                      </>
                    )}
                    <TableCell>{offer.company || "-"}</TableCell>
                    <TableCell>{offer.offer_type || offer.type || "-"}</TableCell>
                    <TableCell>{offer.stipend || "-"}</TableCell>
                    <TableCell>{offer.internship ? "Yes" : "No"}</TableCell>
                    <TableCell>{offer.package || "-"}</TableCell>
                  </TableRow>
                ));
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PlacementTable;
