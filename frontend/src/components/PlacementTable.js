// import {
//   Box, Button,
//   Chip,
//   Dialog, DialogActions, DialogContent, DialogTitle,
//   Paper, Table, TableBody, TableCell, TableContainer, TableHead,
//   TableRow, TextField
// } from "@mui/material";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import * as XLSX from "xlsx";
// import { usePlacement } from "../MainTable/MainPlacementTable";


// const PlacementTable = ({ studentData = [], companyView = null }) => {
//   const { addStudent, fetchAllStudents } = usePlacement();
//   const [students, setStudents] = useState([]);
//   const { branch } = useParams();
//   const [dialogOpen, setDialogOpen] = useState(false);

//   const [newStudent, setNewStudent] = useState({
//     reg_no: "", name: "", email: "", department: "",
//     higher_study_college: "", firm_name: "", role_in_firm: "", offers: []
//   });

//   useEffect(() => {
//     if (!companyView) setStudents(studentData);
//     else {
//       const filtered = studentData.filter((student) =>
//         (student.offers || []).some(
//           (offer) => offer.company?.toLowerCase() === companyView.toLowerCase()
//         )
//       );
//       setStudents(filtered);
//     }
//   }, [studentData, companyView]);

//   const handleExportExcel = () => {
//     const exportData = [];

//     students.forEach((student, index) => {
//       const offers = student.offers || [];
//       const filteredOffers = companyView
//         ? offers.filter((offer) => offer.company?.toLowerCase() === companyView.toLowerCase())
//         : offers;

//       const placementStatus = getPlacementStatus(student, filteredOffers);

//       if (filteredOffers.length === 0) {
//         exportData.push({
//           "S. No.": index + 1,
//           "Reg No.": student.regNo || student.reg_no,
//           "Name": student.name,
//           "Branch": student.department,
//           "Placement Status": placementStatus,
//           "Company": "No offers yet",
//           "Offer Type": "-", "Stipend": "-", "Internship": "-", "Package (LPA)": "-",
//           "Email": student.email,
//         });
//       } else {
//         filteredOffers.forEach((offer, i) => {
//           exportData.push({
//             "S. No.": i === 0 ? index + 1 : "",
//             "Reg No.": i === 0 ? student.regNo || student.reg_no : "",
//             "Name": i === 0 ? student.name : "",
//             "Branch": i === 0 ? student.department : "",
//             "Placement Status": i === 0 ? placementStatus : "",
//             "Company": offer.company || "-", "Offer Type": offer.offer_type || "-",
//             "Stipend": offer.stipend || "-", "Internship": offer.internship || "-",
//             "Package (LPA)": offer.package || "-",
//             "Email": student.email,
//           });
//         });
//       }
//     });

//     const ws = XLSX.utils.json_to_sheet(exportData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Students");
//     XLSX.writeFile(wb, "students_export.xlsx");
//   };

// //   const handleImportExcel = (e) => {
// //   const file = e.target.files[0];
// //   const reader = new FileReader();

// //   reader.onload = async (evt) => {
// //     const bstr = evt.target.result;
// //     const wb = XLSX.read(bstr, { type: "binary" });
// //     const ws = wb.Sheets[wb.SheetNames[0]];
// //     const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
// //     const headers = data[0];
// //     const rows = data.slice(1);

// //     const newData = rows.map((row) => {
// //       const obj = {};
// //       headers.forEach((header, idx) => {
// //         obj[header] = row[idx];
// //       });

// //       const companies = [];
// //       if (obj.Company && obj.Company !== "-" && obj.Company !== "No offers from this company") {
// //         companies.push({
// //           company: obj.Company,
// //           offer_type: obj["Offer Type"] || "",
// //           stipend: obj.Stipend || "",
// //           internship: obj.Internship || "",
// //           package: obj["Package (LPA)"] || "",
// //         });
// //       }

// //       if (!obj["Reg No."] || !obj.Name) {
// //         console.warn("Skipping student with missing Reg No. or Name:", obj);
// //         return null;
// //       }

// //       return {
// //         regNo: String(obj["Reg No."]).trim(),
// //         name: obj.Name.trim(),
// //         email: obj.Email || "",
// //         department: obj.Branch || "",
// //         higher_study_college: obj["Higher Study"] || "",
// //         firm_name: obj["Firm Name"] || "",
// //         role_in_firm: obj["Role In Firm"] || "",
// //         offers: companies,
// //       };
// //     }).filter(Boolean);

// //     console.log("Imported Data to be added:", newData);

// //     let success = 0, fail = 0;

// //     await Promise.allSettled(newData.map(student =>
// //       addStudent(student)
// //         .then(() => { success++; })
// //         .catch(err => {
// //           fail++;
// //           console.error("Failed to add student:", student, err.response?.data || err.message);
// //         })
// //     ));

// //     console.log(`Import completed. Success: ${success}, Failed: ${fail}`);
// //     await fetchAllStudents();
// //     alert(`Import completed. Success: ${success}, Failed: ${fail}`);
// //   };

// //   reader.readAsBinaryString(file);
// // };


//   const handleImportExcel = async (e) => {
//   const file = e.target.files[0];
//   if (!file) return;

//   const formData = new FormData();
//   formData.append("file", file);

//   try {
//     const response = await axios.post("http://localhost:5001/students/import", formData, {
//       headers: { "Content-Type": "multipart/form-data",
//       "Authorization": `Bearer ${localStorage.getItem("token")}`
//       }
//     });

//     console.log("Excel import response:", response.data);
//     alert(`Import completed. Success: ${response.data.successCount}, Failed: ${response.data.failCount}`);
//     await fetchAllStudents();
//   } catch (err) {
//     console.error("Failed to import Excel:", err.response?.data || err.message);
//     alert(`Failed to import Excel: ${err.response?.data?.error || err.message}`);
//   }
// };


//   const getPlacementStatus = (student, offers) => {
//     if (offers.some((offer) => offer.offer_type === "PPO" || offer.offer_type === "PPO+I")) return "Placed";
//     if (student.higher_study_college) return "Higher Study";
//     if (student.firm_name) return student.role_in_firm?.toLowerCase() === "owner" ? "Family Business" : "Entrepreneur";
//     return "Not Placed";
//   };

//   const statusColor = (status) => {
//     switch (status) {
//       case "Placed": return "success";
//       case "Higher Study": return "info";
//       case "Entrepreneur": return "warning";
//       case "Family Business": return "secondary";
//       default: return "default";
//     }
//   };

//   const handleDialogChange = (e) => {
//     const { name, value } = e.target;
//     setNewStudent({ ...newStudent, [name]: value });
//   };

//   const handleAddStudent = async () => {
//     const formatted = {
//       regNo: newStudent.reg_no, name: newStudent.name, email: newStudent.email,
//       department: newStudent.department, higher_study_college: newStudent.higher_study_college,
//       firm_name: newStudent.firm_name, role_in_firm: newStudent.role_in_firm, offers: []
//     };

//     await addStudent(formatted);
//     await fetchAllStudents();
//     setDialogOpen(false);
//     setNewStudent({ reg_no: "", name: "", email: "", department: "", higher_study_college: "", firm_name: "", role_in_firm: "", offers: [] });
//   };

//   return (
//     <Box>
//       <Box display="flex" justifyContent="space-between" mb={2} flexWrap="wrap" gap={2}>
//         <Box display="flex" gap={2}>
//           {!branch && <Button variant="contained" sx={{ backgroundColor: "#ec7000", color: "#fff" }}>View Summary</Button>}
//           <label htmlFor="import-excel">
//             <input accept=".xlsx, .xls" id="import-excel" type="file" style={{ display: "none" }} onChange={handleImportExcel} />
//             <Button variant="outlined" component="span">Import Excel</Button>
//           </label>
//           <Button variant="outlined" onClick={handleExportExcel}>Export Excel</Button>
//         </Box>
//         <Button variant="contained" onClick={() => setDialogOpen(true)}>Add Student</Button>
//       </Box>

//       <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
//         <DialogTitle>Add New Student</DialogTitle>
//         <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
//           {["reg_no", "name", "email", "department", "higher_study_college", "firm_name", "role_in_firm"].map((field) => (
//             <TextField key={field} name={field} label={field.replace(/_/g, " ").toUpperCase()} value={newStudent[field]} onChange={handleDialogChange} />
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
//             {students.map((student, index) => {
//               const offers = student.offers || [];
//               const filteredOffers = companyView ? offers.filter(o => o.company?.toLowerCase() === companyView.toLowerCase()) : offers;
//               const status = getPlacementStatus(student, filteredOffers);

//               if (filteredOffers.length === 0) {
//                 return (
//                   <TableRow key={index}>
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell>{student.regNo || student.reg_no}</TableCell>
//                     <TableCell>{student.name}</TableCell>
//                     <TableCell>{student.department}</TableCell>
//                     <TableCell><Chip label={status} color={statusColor(status)} /></TableCell>
//                     <TableCell colSpan={5} align="center">No offers yet</TableCell>
//                   </TableRow>
//                 );
//               }

//               return filteredOffers.map((offer, i) => (
//                 <TableRow key={`${index}-${i}`}>
//                   {i === 0 && (
//                     <>
//                       <TableCell rowSpan={filteredOffers.length}>{index + 1}</TableCell>
//                       <TableCell rowSpan={filteredOffers.length}>{student.regNo || student.reg_no}</TableCell>
//                       <TableCell rowSpan={filteredOffers.length}>{student.name}</TableCell>
//                       <TableCell rowSpan={filteredOffers.length}>{student.department}</TableCell>
//                       <TableCell rowSpan={filteredOffers.length}><Chip label={status} color={statusColor(status)} /></TableCell>
//                     </>
//                   )}
//                   <TableCell>{offer.company}</TableCell>
//                   <TableCell>{offer.offer_type}</TableCell>
//                   <TableCell>{offer.stipend}</TableCell>
//                   <TableCell>{offer.internship}</TableCell>
//                   <TableCell>{offer.package}</TableCell>
//                 </TableRow>
//               ));
//             })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// // export default PlacementTable;
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Chip,
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
// } from "@mui/material";
// import { useParams } from "react-router-dom";
// import * as XLSX from "xlsx";
// import { usePlacement } from "../MainTable/MainPlacementTable";

// const statusOptions = [
//   "Placed",
//   "Not Placed",
//   "Higher Study",
//   "Entrepreneur",
//   "Family Business",
// ];
// const offerOptions = ["PPO", "PPO + I", "Intern"];

// const PlacementTable = ({ studentData = [], companyView = null }) => {
//   const { addStudent, fetchAllStudents } = usePlacement();
//   const [students, setStudents] = useState([]);
//   const { branch } = useParams();
//   const [dialogOpen, setDialogOpen] = useState(false);

//   const [newStudent, setNewStudent] = useState({
//     reg_no: "",
//     name: "",
//     department: "",
//     status: "",
//     higher_study_college: "",
//     higher_study_degree: "",
//     higher_study_country: "",
//     firm_name: "",
//     firm_reg_no: "",
//     gst_no: "",
//     role_in_firm: "",
//     company: "",
//     offer_type: "",
//     stipend: "",
//     package: "",
//   });

//   useEffect(() => {
//     if (!companyView) setStudents(studentData);
//     else {
//       const filtered = studentData.filter((student) =>
//         (student.offers || []).some(
//           (offer) => offer.company?.toLowerCase() === companyView.toLowerCase()
//         )
//       );
//       setStudents(filtered);
//     }
//   }, [studentData, companyView]);

//   const handleDialogChange = (e) => {
//     const { name, value } = e.target;
//     setNewStudent({ ...newStudent, [name]: value });
//   };

//   const handleAddStudent = async () => {
//     const offers = newStudent.status === "Placed" ? [
//       {
//         company: newStudent.company,
//         offer_type: newStudent.offer_type,
//         stipend: newStudent.stipend,
//         package: newStudent.package,
//       },
//     ] : [];

//     const formatted = {
//       regNo: newStudent.reg_no,
//       name: newStudent.name,
//       department: newStudent.department,
//       status: newStudent.status,
//       higher_study_college: newStudent.higher_study_college,
//       higher_study_degree: newStudent.higher_study_degree,
//       higher_study_country: newStudent.higher_study_country,
//       firm_name: newStudent.firm_name,
//       firm_reg_no: newStudent.firm_reg_no,
//       gst_no: newStudent.gst_no,
//       role_in_firm: newStudent.role_in_firm,
//       offers,
//     };

//     try {
//       await addStudent(formatted);
//       await fetchAllStudents();
//       setDialogOpen(false);
//       setNewStudent({
//         reg_no: "",
//         name: "",
//         department: "",
//         status: "",
//         higher_study_college: "",
//         higher_study_degree: "",
//         higher_study_country: "",
//         firm_name: "",
//         firm_reg_no: "",
//         gst_no: "",
//         role_in_firm: "",
//         company: "",
//         offer_type: "",
//         stipend: "",
//         package: "",
//       });
//     } catch (err) {
//       console.error("Failed to add student:", err);
//       alert("Failed to add student: " + (err.response?.data?.error || err.message));
//     }
//   };

//   const handleExportExcel = () => {
//     const exportData = students.map((student, index) => {
//       const offers = student.offers || [];
//       if (offers.length === 0) {
//         return {
//           SNo: index + 1,
//           RegNo: student.regNo,
//           Name: student.name,
//           Department: student.department,
//           Status: student.status,
//           Company: "",
//           OfferType: "",
//           Stipend: "",
//           Internship: "",
//           Package: "",
//         };
//       }
//       return offers.map((offer, i) => ({
//         SNo: i === 0 ? index + 1 : "",
//         RegNo: i === 0 ? student.regNo : "",
//         Name: i === 0 ? student.name : "",
//         Department: i === 0 ? student.department : "",
//         Status: i === 0 ? student.status : "",
//         Company: offer.company,
//         OfferType: offer.offer_type,
//         Stipend: offer.stipend,
//         Internship: offer.internship ? "Yes" : "No",
//         Package: offer.package,
//       }));
//     }).flat();

//     const ws = XLSX.utils.json_to_sheet(exportData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Students");
//     XLSX.writeFile(wb, "students_export.xlsx");
//   };

//   const getPlacementStatus = (student, offers) => {
//     if (offers.some((offer) => offer.offer_type === "PPO" || offer.offer_type === "PPO+I")) return "Placed";
//     if (student.higher_study_college) return "Higher Study";
//     if (student.firm_name) return student.role_in_firm?.toLowerCase() === "owner" ? "Family Business" : "Entrepreneur";
//     return "Not Placed";
//   };

//   const statusColor = (status) => {
//     switch (status) {
//       case "Placed": return "success";
//       case "Higher Study": return "info";
//       case "Entrepreneur": return "warning";
//       case "Family Business": return "secondary";
//       default: return "default";
//     }
//   };

//   const renderConditionalFields = () => {
//     switch (newStudent.status) {
//       case "Higher Study":
//         return (
//           <>
//             <TextField name="higher_study_college" label="College" value={newStudent.higher_study_college} onChange={handleDialogChange} fullWidth />
//             <TextField name="higher_study_degree" label="Degree" value={newStudent.higher_study_degree} onChange={handleDialogChange} fullWidth />
//             <TextField name="higher_study_country" label="Country" value={newStudent.higher_study_country} onChange={handleDialogChange} fullWidth />
//           </>
//         );
//       case "Entrepreneur":
//       case "Family Business":
//         return (
//           <>
//             <TextField name="firm_name" label="Firm Name" value={newStudent.firm_name} onChange={handleDialogChange} fullWidth />
//             <TextField name="firm_reg_no" label="Firm Reg No" value={newStudent.firm_reg_no} onChange={handleDialogChange} fullWidth />
//             <TextField name="gst_no" label="GST No" value={newStudent.gst_no} onChange={handleDialogChange} fullWidth />
//             <TextField name="role_in_firm" label="Role in Firm" value={newStudent.role_in_firm} onChange={handleDialogChange} fullWidth />
//           </>
//         );
//       case "Placed":
//         return (
//           <>
//             <TextField name="company" label="Company" value={newStudent.company} onChange={handleDialogChange} fullWidth />
//             <TextField select name="offer_type" label="Offer Type" value={newStudent.offer_type} onChange={handleDialogChange} fullWidth>
//               {offerOptions.map((type) => (
//                 <MenuItem key={type} value={type}>{type}</MenuItem>
//               ))}
//             </TextField>
//             <TextField name="stipend" label="Stipend" value={newStudent.stipend} onChange={handleDialogChange} fullWidth />
//             <TextField name="package" label="Package (LPA)" value={newStudent.package} onChange={handleDialogChange} fullWidth />
//           </>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <Box>
//       <Box display="flex" justifyContent="space-between" mb={2}>
//         <Box display="flex" gap={2}>
//           <label htmlFor="import-excel">
//             <input accept=".xlsx, .xls" id="import-excel" type="file" style={{ display: "none" }} onChange={() => alert("Not implemented in frontend")}/>
//             <Button variant="outlined" component="span">Import Excel</Button>
//           </label>
//           <Button variant="outlined" onClick={handleExportExcel}>Export Excel</Button>
//         </Box>
//         <Button variant="contained" onClick={() => setDialogOpen(true)}>Add Student</Button>
//       </Box>

//       <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
//         <DialogTitle>Add New Student</DialogTitle>
//         <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//           <TextField name="reg_no" label="Reg No" value={newStudent.reg_no} onChange={handleDialogChange} fullWidth />
//           <TextField name="name" label="Name" value={newStudent.name} onChange={handleDialogChange} fullWidth />
//           <TextField name="department" label="Branch" value={newStudent.department} onChange={handleDialogChange} fullWidth />
//           <TextField select name="status" label="Placement Status" value={newStudent.status} onChange={handleDialogChange} fullWidth>
//             {statusOptions.map((status) => (
//               <MenuItem key={status} value={status}>{status}</MenuItem>
//             ))}
//           </TextField>
//           {renderConditionalFields()}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
//           <Button variant="contained" onClick={handleAddStudent}>Add</Button>
//         </DialogActions>
//       </Dialog>

//       <TableContainer component={Paper} sx={{ marginTop: 4 }}>
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
//                   No students available yet.
//                 </TableCell>
//               </TableRow>
//             ) : (
//               students.map((student, index) => {
//                 const offers = student.offers || [];
//                 const filteredOffers = companyView
//                   ? offers.filter(o => o.company?.toLowerCase() === companyView.toLowerCase())
//                   : offers;
//                 const status = getPlacementStatus(student, filteredOffers);

//                 if (filteredOffers.length === 0) {
//                   return (
//                     <TableRow key={index}>
//                       <TableCell>{index + 1}</TableCell>
//                       <TableCell>{student.regNo || student.reg_no}</TableCell>
//                       <TableCell>{student.name}</TableCell>
//                       <TableCell>{student.department}</TableCell>
//                       <TableCell><Chip label={status} color={statusColor(status)} /></TableCell>
//                       <TableCell colSpan={5} align="center">No offers yet</TableCell>
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
//                         <TableCell rowSpan={filteredOffers.length}><Chip label={status} color={statusColor(status)} /></TableCell>
//                       </>
//                     )}
//                     <TableCell>{offer.company}</TableCell>
//                     <TableCell>{offer.offer_type}</TableCell>
//                     <TableCell>{offer.stipend}</TableCell>
//                     <TableCell>{offer.internship ? "Yes" : "No"}</TableCell>
//                     <TableCell>{offer.package}</TableCell>
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

// // export default PlacementTable;
// import React, { useEffect, useState } from "react";
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
//   InputBase,
// } from "@mui/material";
// import { useParams } from "react-router-dom";
// import * as XLSX from "xlsx";
// import { usePlacement } from "../MainTable/MainPlacementTable";

// const statusOptions = [
//   "Placed",
//   "Not Placed",
//   "Higher Study",
//   "Entrepreneur/Family Business",
  
// ];
// const offerOptions = ["PPO", "PPO + I", "Intern"];

// const PlacementTable = ({ studentData = [], companyView = null }) => {
//   const { addStudent, fetchAllStudents } = usePlacement();
//   const [students, setStudents] = useState([]);
//   const [filteredStudents, setFilteredStudents] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const { branch } = useParams();
//   const [dialogOpen, setDialogOpen] = useState(false);

//   const [newStudent, setNewStudent] = useState({
//     reg_no: "",
//     name: "",
//     department: "",
//     status: "",
//     higher_study_college: "",
//     higher_study_degree: "",
//     higher_study_country: "",
//     firm_name: "",
//     firm_reg_no: "",
//     gst_no: "",
//     role_in_firm: "",
//     company: "",
//     offer_type: "",
//     stipend: "",
//     package: "",
//   });
// useEffect(() => {
//   if (dialogOpen) {
//     setNewStudent((prev) => ({
//       ...prev,
//       department: branch?.toUpperCase() || "",
//     }));
//   }
// }, [dialogOpen, branch]);


//   const handleDialogChange = (e) => {
//     const { name, value } = e.target;
//     setNewStudent({ ...newStudent, [name]: value });
//   };

//   const handleAddStudent = async () => {
//     const offers = newStudent.status === "Placed" ? [
//       {
//         company: newStudent.company,
//         offer_type: newStudent.offer_type,
//         stipend: newStudent.stipend,
//         package: newStudent.package,
//       },
//     ] : [];

//     const formatted = {
//       regNo: newStudent.reg_no,
//       name: newStudent.name,
//       department: newStudent.department,
//       status: newStudent.status,
//       higher_study_college: newStudent.higher_study_college,
//       higher_study_degree: newStudent.higher_study_degree,
//       higher_study_country: newStudent.higher_study_country,
//       firm_name: newStudent.firm_name,
//       firm_reg_no: newStudent.firm_reg_no,
//       gst_no: newStudent.gst_no,
//       role_in_firm: newStudent.role_in_firm,
//       offers,
//     };

//     try {
//       await addStudent(formatted);
//       await fetchAllStudents();
//       setDialogOpen(false);
//       setNewStudent({
//         reg_no: "",
//         name: "",
//         department: branch?.toUpperCase() || "",
//         status: "",
//         higher_study_college: "",
//         higher_study_degree: "",
//         higher_study_country: "",
//         firm_name: "",
//         firm_reg_no: "",
//         gst_no: "",
//         role_in_firm: "",
//         company: "",
//         offer_type: "",
//         stipend: "",
//         package: "",
//       });
//     } catch (err) {
//       console.error("Failed to add student:", err);
//       alert("Failed to add student: " + (err.response?.data?.error || err.message));
//     }
//   };

//   const handleSearchChange = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);
//     setFilteredStudents(
//       students.filter(
//         (student) =>
//           student.name?.toLowerCase().includes(query) ||
//           student.regNo?.toLowerCase().includes(query)
//       )
//     );
//   };

//   const renderConditionalFields = () => {
//     switch (newStudent.status) {
//       case "Higher Study":
//         return (
//           <>
//             <TextField name="higher_study_college" label="College" value={newStudent.higher_study_college} onChange={handleDialogChange} fullWidth />
//             <TextField name="higher_study_degree" label="Degree" value={newStudent.higher_study_degree} onChange={handleDialogChange} fullWidth />
//             <TextField name="higher_study_country" label="Country" value={newStudent.higher_study_country} onChange={handleDialogChange} fullWidth />
//           </>
//         );
//       case "Entrepreneur/Family Business":
      
//         return (
//           <>
//             <TextField name="firm_name" label="Firm Name" value={newStudent.firm_name} onChange={handleDialogChange} fullWidth />
//             <TextField name="firm_reg_no" label="Firm Reg No" value={newStudent.firm_reg_no} onChange={handleDialogChange} fullWidth />
//             <TextField name="gst_no" label="GST No" value={newStudent.gst_no} onChange={handleDialogChange} fullWidth />
//             <TextField name="role_in_firm" label="Role in Firm" value={newStudent.role_in_firm} onChange={handleDialogChange} fullWidth />
//           </>
//         );
//       case "Placed":
//         return (
//           <>
//             <TextField name="company" label="Company" value={newStudent.company} onChange={handleDialogChange} fullWidth />
//             <TextField select name="offer_type" label="Offer Type" value={newStudent.offer_type} onChange={handleDialogChange} fullWidth>
//               {offerOptions.map((type) => (
//                 <MenuItem key={type} value={type}>{type}</MenuItem>
//               ))}
//             </TextField>
//             <TextField name="stipend" label="Stipend" value={newStudent.stipend} onChange={handleDialogChange} fullWidth />
//             <TextField name="package" label="Package (LPA)" value={newStudent.package} onChange={handleDialogChange} fullWidth />
//           </>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <Box>
//       <Box display="flex" justifyContent="space-between" mb={2}>
//         <Box display="flex" gap={2}>
//           <label htmlFor="import-excel">
//             <input accept=".xlsx, .xls" id="import-excel" type="file" style={{ display: "none" }} onChange={() => alert("Not implemented in frontend")} />
//             <Button variant="outlined" component="span">Import Excel</Button>
//           </label>
//           <Button variant="outlined" onClick={() => {
//             const ws = XLSX.utils.json_to_sheet(filteredStudents);
//             const wb = XLSX.utils.book_new();
//             XLSX.utils.book_append_sheet(wb, ws, "Students");
//             XLSX.writeFile(wb, "students_export.xlsx");
//           }}>Export Excel</Button>
//         </Box>
//         <Box display="flex" gap={2}>
//           <InputBase placeholder="Search by Reg No or Name" value={searchQuery} onChange={handleSearchChange} sx={{ border: "1px solid #ccc", px: 2, borderRadius: 2 }} />
//           <Button variant="contained" onClick={() => setDialogOpen(true)}>Add Student</Button>
//         </Box>
//       </Box>

//       <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
//         <DialogTitle>Add New Student</DialogTitle>
//         <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//           <TextField name="reg_no" label="Reg No" value={newStudent.reg_no} onChange={handleDialogChange} fullWidth />
//           <TextField name="name" label="Name" value={newStudent.name} onChange={handleDialogChange} fullWidth />
//           <TextField name="department" label="Branch" value={newStudent.department} onChange={handleDialogChange} fullWidth disabled />
//           <TextField select name="status" label="Placement Status" value={newStudent.status} onChange={handleDialogChange} fullWidth>
//             {statusOptions.map((status) => (
//               <MenuItem key={status} value={status}>{status}</MenuItem>
//             ))}
//           </TextField>
//           {renderConditionalFields()}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
//           <Button variant="contained" onClick={handleAddStudent}>Add</Button>
//         </DialogActions>
//       </Dialog>

//       <TableContainer component={Paper} sx={{ marginTop: 4 }}>
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
//             {filteredStudents.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={10} align="center">
//                   No students available yet.
//                 </TableCell>
//               </TableRow>
//             ) : (
//               filteredStudents.map((student, index) => {
//                 const offers = student.offers || [];
//                 return offers.length === 0 ? (
//                   <TableRow key={index}>
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell>{student.regNo || student.reg_no}</TableCell>
//                     <TableCell>{student.name}</TableCell>
//                     <TableCell>{student.department}</TableCell>
//                     <TableCell>{student.status}</TableCell>
//                     <TableCell colSpan={5} align="center">No offers</TableCell>
//                   </TableRow>
//                 ) : offers.map((offer, i) => (
//                   <TableRow key={`${index}-${i}`}>
//                     {i === 0 && (
//                       <>
//                         <TableCell rowSpan={offers.length}>{index + 1}</TableCell>
//                         <TableCell rowSpan={offers.length}>{student.regNo || student.reg_no}</TableCell>
//                         <TableCell rowSpan={offers.length}>{student.name}</TableCell>
//                         <TableCell rowSpan={offers.length}>{student.department}</TableCell>
//                         <TableCell rowSpan={offers.length}>{student.status}</TableCell>
//                       </>
//                     )}
//                     <TableCell>{offer.company}</TableCell>
//                     <TableCell>{offer.offer_type}</TableCell>
//                     <TableCell>{offer.stipend}</TableCell>
//                     <TableCell>{offer.internship ? "Yes" : "No"}</TableCell>
//                     <TableCell>{offer.package}</TableCell>
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
// PlacementTable.jsx (fully updated version)

// import React, { useEffect, useState } from "react";
// import {
//   Box, Button, Dialog, DialogActions, DialogContent,
//   DialogTitle, Paper, Table, TableBody, TableCell,
//   TableContainer, TableHead, TableRow, TextField, MenuItem,
//   InputBase, IconButton, Tooltip
// } from "@mui/material";
// import InfoIcon from '@mui/icons-material/Info';
// import { useParams } from "react-router-dom";
// import * as XLSX from "xlsx";
// import { usePlacement } from "../MainTable/MainPlacementTable";

// const statusOptions = ["Placed", "Not Placed", "Higher Study", "Entrepreneur/Family Business"];
// const offerOptions = ["PPO", "PPO + I", "Intern"];

// const PlacementTable = ({ studentData = [], companyView = null }) => {
//   const { addStudent, fetchAllStudents } = usePlacement();
//   const [students, setStudents] = useState([]);
//   const [filteredStudents, setFilteredStudents] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const { branch } = useParams();
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [infoOpen, setInfoOpen] = useState(false);
//   const [infoStudent, setInfoStudent] = useState(null);

//   const [newStudent, setNewStudent] = useState({
//     reg_no: "",
//     name: "",
//     department: "",
//     status: "",
//     higher_study_college: "",
//     higher_study_degree: "",
//     higher_study_country: "",
//     firm_name: "",
//     firm_reg_no: "",
//     gst_no: "",
//     role_in_firm: "",
//     offers: [{ company: "", offer_type: "", stipend: "", package: "" }],
//   });

//   useEffect(() => {
//     if (dialogOpen) {
//       setNewStudent(prev => ({ ...prev, department: branch?.toUpperCase() || "" }));
//     }
//   }, [dialogOpen, branch]);

//   useEffect(() => {
//     const branchFiltered = !companyView
//       ? studentData.filter((s) => s.department?.toUpperCase() === branch?.toUpperCase())
//       : studentData.filter((s) => (s.offers || []).some(
//           (o) => o.company?.toLowerCase() === companyView.toLowerCase()
//         ));
//     setStudents(branchFiltered);
//     setFilteredStudents(branchFiltered);
//   }, [studentData, companyView, branch]);

//   const handleDialogChange = (e) => {
//     const { name, value } = e.target;
//     setNewStudent((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleOfferChange = (index, field, value) => {
//     const newOffers = [...newStudent.offers];
//     newOffers[index][field] = value;
//     setNewStudent({ ...newStudent, offers: newOffers });
//   };

//   const addNewOfferField = () => {
//     if (newStudent.offers.length < 3) {
//       setNewStudent({ ...newStudent, offers: [...newStudent.offers, { company: "", offer_type: "", stipend: "", package: "" }] });
//     }
//   };

//   const handleAddStudent = async () => {
//     const formatted = {
//       regNo: newStudent.reg_no,
//       name: newStudent.name,
//       department: newStudent.department,
//       status: newStudent.status,
//       higher_study_college: newStudent.higher_study_college,
//       higher_study_degree: newStudent.higher_study_degree,
//       higher_study_country: newStudent.higher_study_country,
//       firm_name: newStudent.firm_name,
//       firm_reg_no: newStudent.firm_reg_no,
//       gst_no: newStudent.gst_no,
//       role_in_firm: newStudent.role_in_firm,
//       offers: newStudent.status === "Placed" ? newStudent.offers : []
//     };
//     try {
//       await addStudent(formatted);
//       await fetchAllStudents();
//       setDialogOpen(false);
//       setNewStudent({
//         reg_no: "",
//         name: "",
//         department: branch?.toUpperCase() || "",
//         status: "",
//         higher_study_college: "",
//         higher_study_degree: "",
//         higher_study_country: "",
//         firm_name: "",
//         firm_reg_no: "",
//         gst_no: "",
//         role_in_firm: "",
//         offers: [{ company: "", offer_type: "", stipend: "", package: "" }],
//       });
//     } catch (err) {
//       alert("Failed to add student: " + (err.response?.data?.error || err.message));
//     }
//   };

//   const handleImport = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const workbook = XLSX.read(e.target.result, { type: 'binary' });
//       const data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
//       const grouped = {};
//       data.forEach(row => {
//         const key = row["Reg No"];
//         if (!grouped[key]) {
//           grouped[key] = {
//             regNo: key,
//             name: row["Name"],
//             department: row["Branch"],
//             status: row["Placement Status"],
//             higher_study_college: row["College"] || "",
//             higher_study_degree: row["Degree"] || "",
//             higher_study_country: row["Country"] || "",
//             firm_name: row["Firm"] || "",
//             firm_reg_no: row["Firm Reg No"] || "",
//             gst_no: row["GST"] || "",
//             role_in_firm: row["Role"] || "",
//             offers: []
//           };
//         }
//         if (row["Company"]) {
//           grouped[key].offers.push({
//             company: row["Company"],
//             offer_type: row["Offer Type"],
//             stipend: row["Stipend"],
//             package: row["Package"],
//           });
//         }
//       });
//       const result = Object.values(grouped);
//       setStudents(result);
//       setFilteredStudents(result);
//     };
//     reader.readAsBinaryString(file);
//   };

//   const handleExport = () => {
//     const exportData = [];
//     filteredStudents.forEach((s) => {
//       const base = {
//         "Reg No": s.regNo,
//         "Name": s.name,
//         "Branch": s.department,
//         "Placement Status": s.status,
//         "College": s.higher_study_college,
//         "Degree": s.higher_study_degree,
//         "Country": s.higher_study_country,
//         "Firm": s.firm_name,
//         "Firm Reg No": s.firm_reg_no,
//         "GST": s.gst_no,
//         "Role": s.role_in_firm,
//       };
//       if (!s.offers || s.offers.length === 0) exportData.push(base);
//       else s.offers.forEach((o) => exportData.push({ ...base, "Company": o.company, "Offer Type": o.offer_type, "Stipend": o.stipend, "Package": o.package }));
//     });
//     const ws = XLSX.utils.json_to_sheet(exportData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Students");
//     XLSX.writeFile(wb, "students_export.xlsx");
//   };

//   return (
//     <Box>
//       <Box display="flex" justifyContent="space-between" mb={2}>
//         <Box display="flex" gap={2}>
//           <label htmlFor="import-excel">
//             <input accept=".xlsx, .xls" id="import-excel" type="file" style={{ display: "none" }} onChange={handleImport} />
//             <Button variant="outlined" component="span">Import Excel</Button>
//           </label>
//           <Button variant="outlined" onClick={handleExport}>Export Excel</Button>
//         </Box>
//         <Box display="flex" gap={2}>
//           <InputBase placeholder="Search by Reg No or Name" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} sx={{ border: "1px solid #ccc", px: 2, borderRadius: 2 }} />
//           <Button variant="contained" onClick={() => setDialogOpen(true)}>Add Student</Button>
//         </Box>
//       </Box>

//       <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
//         <DialogTitle>Add New Student</DialogTitle>
//         <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//           <TextField name="reg_no" label="Reg No" value={newStudent.reg_no} onChange={handleDialogChange} fullWidth />
//           <TextField name="name" label="Name" value={newStudent.name} onChange={handleDialogChange} fullWidth />
//           <TextField name="department" label="Branch" value={newStudent.department} disabled fullWidth />
//           <TextField select name="status" label="Placement Status" value={newStudent.status} onChange={handleDialogChange} fullWidth>
//             {statusOptions.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
//           </TextField>
//           {newStudent.status === "Higher Study" && (
//             <>
//               <TextField name="higher_study_college" label="College" value={newStudent.higher_study_college} onChange={handleDialogChange} fullWidth />
//               <TextField name="higher_study_degree" label="Degree" value={newStudent.higher_study_degree} onChange={handleDialogChange} fullWidth />
//               <TextField name="higher_study_country" label="Country" value={newStudent.higher_study_country} onChange={handleDialogChange} fullWidth />
//             </>
//           )}
//           {newStudent.status === "Entrepreneur/Family Business" && (
//             <>
//               <TextField name="firm_name" label="Firm Name" value={newStudent.firm_name} onChange={handleDialogChange} fullWidth />
//               <TextField name="firm_reg_no" label="Firm Reg No" value={newStudent.firm_reg_no} onChange={handleDialogChange} fullWidth />
//               <TextField name="gst_no" label="GST No" value={newStudent.gst_no} onChange={handleDialogChange} fullWidth />
//               <TextField name="role_in_firm" label="Role in Firm" value={newStudent.role_in_firm} onChange={handleDialogChange} fullWidth />
//             </>
//           )}
//           {newStudent.status === "Placed" && newStudent.offers.map((offer, index) => (
//             <Box key={index} display="flex" flexDirection="column" gap={1}>
//               <TextField label={`Company ${index + 1}`} value={offer.company} onChange={(e) => handleOfferChange(index, "company", e.target.value)} fullWidth />
//               <TextField select label="Offer Type" value={offer.offer_type} onChange={(e) => handleOfferChange(index, "offer_type", e.target.value)} fullWidth>
//                 {offerOptions.map((o) => <MenuItem key={o} value={o}>{o}</MenuItem>)}
//               </TextField>
//               <TextField label="Stipend" value={offer.stipend} onChange={(e) => handleOfferChange(index, "stipend", e.target.value)} fullWidth />
//               <TextField label="Package" value={offer.package} onChange={(e) => handleOfferChange(index, "package", e.target.value)} fullWidth />
//             </Box>
//           ))}
//           {newStudent.status === "Placed" && newStudent.offers.length < 3 && <Button onClick={addNewOfferField}>+ Add Offer</Button>}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
//           <Button variant="contained" onClick={handleAddStudent}>Add</Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog open={infoOpen} onClose={() => setInfoOpen(false)}>
//         <DialogTitle>Additional Info</DialogTitle>
//         <DialogContent>
//           {infoStudent?.status === "Higher Study" && (
//             <>
//               <p>College: {infoStudent.higher_study_college}</p>
//               <p>Degree: {infoStudent.higher_study_degree}</p>
//               <p>Country: {infoStudent.higher_study_country}</p>
//             </>
//           )}
//           {infoStudent?.status === "Entrepreneur/Family Business" && (
//             <>
//               <p>Firm Name: {infoStudent.firm_name}</p>
//               <p>Firm Reg No: {infoStudent.firm_reg_no}</p>
//               <p>GST No: {infoStudent.gst_no}</p>
//               <p>Role: {infoStudent.role_in_firm}</p>
//             </>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setInfoOpen(false)}>Close</Button>
//         </DialogActions>
//       </Dialog>

//       <TableContainer component={Paper} sx={{ mt: 4 }}>
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
//               <TableCell>Package</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredStudents.map((s, index) => (
//               <TableRow key={index}>
//                 <TableCell>
//                   {index + 1}
//                   {(s.status === "Higher Study" || s.status === "Entrepreneur/Family Business") && (
//                     <Tooltip title="More Info">
//                       <IconButton size="small" onClick={() => { setInfoStudent(s); setInfoOpen(true); }}>
//                         <InfoIcon fontSize="small" />
//                       </IconButton>
//                     </Tooltip>
//                   )}
//                 </TableCell>
//                 <TableCell>{s.regNo}</TableCell>
//                 <TableCell>{s.name}</TableCell>
//                 <TableCell>{s.department}</TableCell>
//                 <TableCell>{s.status}</TableCell>
//                 <TableCell>{s.offers?.map(o => o.company).join(", ") || "-"}</TableCell>
//                 <TableCell>{s.offers?.map(o => o.offer_type).join(", ") || "-"}</TableCell>
//                 <TableCell>{s.offers?.map(o => o.stipend).join(", ") || "-"}</TableCell>
//                 <TableCell>{s.offers?.map(o => o.package).join(", ") || "-"}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default PlacementTable;
// PlacementTable.js
import React, { useEffect, useState } from "react";
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  Paper, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, TextField, MenuItem, InputBase, IconButton, Tooltip
} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import { useParams } from "react-router-dom";
import * as XLSX from "xlsx";
import { usePlacement } from "../MainTable/MainPlacementTable";
import { hasPermission } from "../utils/permissions";

const statusOptions = ["Placed", "Not Placed", "Higher Study", "Entrepreneur/Family Business"];
const offerOptions = ["PPO", "PPO + I", "Intern"];

const PlacementTable = ({ studentData = [], companyView = null }) => {
  const { addStudent, fetchAllStudents } = usePlacement();
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { branch } = useParams();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [infoStudent, setInfoStudent] = useState(null);

  const [newStudent, setNewStudent] = useState({
    reg_no: "",
    name: "",
    department: branch?.toUpperCase() || "",
    status: "",
    higher_study_college: "",
    higher_study_degree: "",
    higher_study_country: "",
    firm_name: "",
    firm_reg_no: "",
    gst_no: "",
    role_in_firm: "",
    offers: [{ company: "", offer_type: "", stipend: "", package: "" }]
  });

  useEffect(() => {
    const permitted = studentData.filter(s => hasPermission("view_own_department_students", s.department));
    setStudents(permitted);
    setFilteredStudents(permitted);
  }, [studentData]);

  const handleDialogChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleOfferChange = (index, field, value) => {
    const newOffers = [...newStudent.offers];
    newOffers[index][field] = value;
    setNewStudent({ ...newStudent, offers: newOffers });
  };

  const addNewOfferField = () => {
    if (newStudent.offers.length < 3) {
      setNewStudent({ ...newStudent, offers: [...newStudent.offers, { company: "", offer_type: "", stipend: "", package: "" }] });
    }
  };

  const handleAddStudent = async () => {
    const formatted = {
      regNo: newStudent.reg_no,
      name: newStudent.name,
      department: newStudent.department,
      status: newStudent.status,
      higher_study_college: newStudent.higher_study_college,
      higher_study_degree: newStudent.higher_study_degree,
      higher_study_country: newStudent.higher_study_country,
      firm_name: newStudent.firm_name,
      firm_reg_no: newStudent.firm_reg_no,
      gst_no: newStudent.gst_no,
      role_in_firm: newStudent.role_in_firm,
      offers: newStudent.status === "Placed" ? newStudent.offers : []
    };
    try {
      await addStudent(formatted);
      await fetchAllStudents();
      setDialogOpen(false);
    } catch (err) {
      alert("Failed to add student: " + (err.response?.data?.error || err.message));
    }
  };

  const handleImport = async (e) => {
    const file = e.target.files[0];
    const sessionID = localStorage.getItem("selectedBatch");
    if (!sessionID) return alert("Select a batch first.");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("session_id", sessionID);
    try {
      await fetch("http://localhost:5001/students/import", {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: formData
      });
      await fetchAllStudents();
    } catch (err) {
      alert("Import failed: " + err.message);
    }
  };

  const handleExport = () => {
    const exportData = [];
    filteredStudents.forEach((s, i) => {
      const base = {
        "S.No": i + 1,
        "Reg No": s.regNo,
        "Name": s.name,
        "Branch": s.department,
        "Placement Status": s.status,
        "College": s.higher_study_college,
        "Degree": s.higher_study_degree,
        "Country": s.higher_study_country,
        "Firm": s.firm_name,
        "Firm Reg No": s.firm_reg_no,
        "GST": s.gst_no,
        "Role": s.role_in_firm,
      };
      (s.offers.length ? s.offers : [{}]).forEach((o, j) => {
        exportData.push({
          ...base,
          "Company": o.company || "",
          "Offer Type": o.offer_type || "",
          "Stipend": o.stipend || "",
          "Package": o.package || ""
        });
      });
    });
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    XLSX.writeFile(wb, "students_export.xlsx");
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Box display="flex" gap={2}>
          <label htmlFor="import-excel">
            <input accept=".xlsx, .xls" id="import-excel" type="file" hidden onChange={handleImport} />
            <Button variant="outlined" component="span">Import Excel</Button>
          </label>
          <Button variant="outlined" onClick={handleExport}>Export Excel</Button>
        </Box>
        <Box display="flex" gap={2}>
          <InputBase placeholder="Search by Reg No or Name" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} sx={{ border: "1px solid #ccc", px: 2, borderRadius: 2 }} />
          <Button variant="contained" onClick={() => setDialogOpen(true)}>Add Student</Button>
        </Box>
      </Box>

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
              <TableCell>Package</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map((s, i) => {
              return (s.offers.length ? s.offers : [{}]).map((offer, j) => (
                <TableRow key={`${s.regNo}-${j}`}>
                  {j === 0 && (
                    <>
                      <TableCell rowSpan={s.offers.length || 1}>{i + 1}</TableCell>
                      <TableCell rowSpan={s.offers.length || 1}>{s.regNo}</TableCell>
                      <TableCell rowSpan={s.offers.length || 1}>{s.name}</TableCell>
                      <TableCell rowSpan={s.offers.length || 1}>{s.department}</TableCell>
                      <TableCell rowSpan={s.offers.length || 1}>
                        {s.status}
                        {(s.status === "Higher Study" || s.status === "Entrepreneur/Family Business") && (
                          <Tooltip title="More Info">
                            <IconButton size="small" onClick={() => { setInfoStudent(s); setInfoOpen(true); }}>
                              <InfoIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </TableCell>
                    </>
                  )}
                  <TableCell>{offer.company || "-"}</TableCell>
                  <TableCell>{offer.offer_type || "-"}</TableCell>
                  <TableCell>{offer.stipend || "-"}</TableCell>
                  <TableCell>{offer.package || "-"}</TableCell>
                </TableRow>
              ));
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Add New Student</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField name="reg_no" label="Reg No" value={newStudent.reg_no} onChange={handleDialogChange} fullWidth />
          <TextField name="name" label="Name" value={newStudent.name} onChange={handleDialogChange} fullWidth />
          <TextField name="department" label="Branch" value={newStudent.department} disabled fullWidth />
          <TextField select name="status" label="Placement Status" value={newStudent.status} onChange={handleDialogChange} fullWidth>
            {statusOptions.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
          </TextField>
          {newStudent.status === "Higher Study" && (
            <>
              <TextField name="higher_study_college" label="College" value={newStudent.higher_study_college} onChange={handleDialogChange} fullWidth />
              <TextField name="higher_study_degree" label="Degree" value={newStudent.higher_study_degree} onChange={handleDialogChange} fullWidth />
              <TextField name="higher_study_country" label="Country" value={newStudent.higher_study_country} onChange={handleDialogChange} fullWidth />
            </>
          )}
          {newStudent.status === "Entrepreneur/Family Business" && (
            <>
              <TextField name="firm_name" label="Firm Name" value={newStudent.firm_name} onChange={handleDialogChange} fullWidth />
              <TextField name="firm_reg_no" label="Firm Reg No" value={newStudent.firm_reg_no} onChange={handleDialogChange} fullWidth />
              <TextField name="gst_no" label="GST No" value={newStudent.gst_no} onChange={handleDialogChange} fullWidth />
              <TextField name="role_in_firm" label="Role in Firm" value={newStudent.role_in_firm} onChange={handleDialogChange} fullWidth />
            </>
          )}
          {newStudent.status === "Placed" && newStudent.offers.map((offer, index) => (
            <Box key={index} display="flex" flexDirection="column" gap={1}>
              <TextField label={`Company ${index + 1}`} value={offer.company} onChange={(e) => handleOfferChange(index, "company", e.target.value)} fullWidth />
              <TextField select label="Offer Type" value={offer.offer_type} onChange={(e) => handleOfferChange(index, "offer_type", e.target.value)} fullWidth>
                {offerOptions.map((o) => <MenuItem key={o} value={o}>{o}</MenuItem>)}
              </TextField>
              <TextField label="Stipend" value={offer.stipend} onChange={(e) => handleOfferChange(index, "stipend", e.target.value)} fullWidth />
              <TextField label="Package" value={offer.package} onChange={(e) => handleOfferChange(index, "package", e.target.value)} fullWidth />
            </Box>
          ))}
          {newStudent.status === "Placed" && newStudent.offers.length < 3 && <Button onClick={addNewOfferField}>+ Add Offer</Button>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddStudent}>Add</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={infoOpen} onClose={() => setInfoOpen(false)}>
        <DialogTitle>Additional Info</DialogTitle>
        <DialogContent>
          {infoStudent?.status === "Higher Study" && (
            <>
              <p>College: {infoStudent.higher_study_college}</p>
              <p>Degree: {infoStudent.higher_study_degree}</p>
              <p>Country: {infoStudent.higher_study_country}</p>
            </>
          )}
          {infoStudent?.status === "Entrepreneur/Family Business" && (
            <>
              <p>Firm Name: {infoStudent.firm_name}</p>
              <p>Firm Reg No: {infoStudent.firm_reg_no}</p>
              <p>GST No: {infoStudent.gst_no}</p>
              <p>Role: {infoStudent.role_in_firm}</p>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInfoOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PlacementTable;
