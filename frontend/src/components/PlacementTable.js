import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { usePlacement } from "../MainTable/MainPlacementTable";

const PlacementTable = ({ studentData }) => {
  const { updateStudentOffers, filter, setFilter } = usePlacement();
  const [students, setStudents] = useState([]);
  const [openRow, setOpenRow] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    reg_no: "",
    name: "",
    email: "",
    department: "",
    status: "",
    firm_name: "",
    firm_reg_no: "",
    gst_no: "",
    role_in_firm: "",
    higher_study_college: "",
    higher_study_degree: "",
    higher_study_country: ""
  });

  useEffect(() => {
    const normalize = (val) =>
      typeof val === "object" && val !== null && "String" in val
        ? val.String
        : val ?? "";

    const transformed = (studentData || []).map((s, i) => ({
      sNo: i + 1,
      regNo: normalize(s.reg_no || s.regNo),
      name: normalize(s.name),
      department: normalize(s.department),
      email: normalize(s.email),
      status: normalize(s.status),
      offers: s.offers || [],
      business:
        s.firm_name || s.firm_reg_no || s.gst_no || s.role_in_firm
          ? {
              firm: s.firm_name,
              regNo: s.firm_reg_no,
              gst: s.gst_no,
              role: s.role_in_firm,
            }
          : null,
      higherStudies:
        s.higher_study_college ||
        s.higher_study_degree ||
        s.higher_study_country
          ? {
              college: s.higher_study_college,
              degree: s.higher_study_degree,
              country: s.higher_study_country,
            }
          : null,
    }));

    setStudents(transformed);
  }, [studentData]);

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(students);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    XLSX.writeFile(wb, "students.xlsx");
  };

  const handleImportExcel = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const headers = data[0];
      const rows = data.slice(1);
      const newData = rows.map((row, i) => {
        const obj = {};
        headers.forEach((header, idx) => {
          obj[header] = row[idx];
        });
        return { sNo: i + 1, ...obj };
      });
      setStudents(newData);
    };
    reader.readAsBinaryString(file);
  };

  const handleDialogChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleAddStudent = () => {
    const formatted = {
      sNo: students.length + 1,
      regNo: newStudent.reg_no,
      name: newStudent.name,
      department: newStudent.department,
      email: newStudent.email,
      status: newStudent.status,
      offers: [],
      business: newStudent.status === "Entrepreneurship or Business" ? {
        firm: newStudent.firm_name,
        regNo: newStudent.firm_reg_no,
        gst: newStudent.gst_no,
        role: newStudent.role_in_firm
      } : null,
      higherStudies: newStudent.status === "HigherStudies" ? {
        college: newStudent.higher_study_college,
        degree: newStudent.higher_study_degree,
        country: newStudent.higher_study_country
      } : null,
    };
    setStudents([...students, formatted]);
    setDialogOpen(false);
    setNewStudent({
      reg_no: "",
      name: "",
      email: "",
      department: "",
      status: "",
      firm_name: "",
      firm_reg_no: "",
      gst_no: "",
      role_in_firm: "",
      higher_study_college: "",
      higher_study_degree: "",
      higher_study_country: ""
    });
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
        <Box display="flex" gap={2}>
          <Button variant="contained" color="warning">
            View Summary
          </Button>
          <label htmlFor="import-excel">
            <input
              accept=".xlsx, .xls"
              style={{ display: "none" }}
              id="import-excel"
              type="file"
              onChange={handleImportExcel}
            />
            <Button variant="outlined" component="span">
              Import Excel
            </Button>
          </label>
          <Button variant="outlined" onClick={handleExportExcel}>
            Export Excel
          </Button>
        </Box>

        <Box display="flex" gap={2}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Filter</InputLabel>
            <Select value={filter} onChange={(e) => setFilter(e.target.value)} label="Filter">
              <MenuItem value="default">Default</MenuItem>
              <MenuItem value="placed">Placed</MenuItem>
              <MenuItem value="notPlaced">Not Placed</MenuItem>
              <MenuItem value="offCampus">Off Campus</MenuItem>
              <MenuItem value="higherStudies">Higher Studies</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" onClick={() => setDialogOpen(true)}>Add Student</Button>
        </Box>
      </Box>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Add New Student</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          {[
            "reg_no",
            "name",
            "email",
            "department",
          ].map(field => (
            <TextField key={field} name={field} label={field.replace("_", " ")} value={newStudent[field]} onChange={handleDialogChange} />
          ))}
          <TextField name="status" label="Placement Status" select value={newStudent.status} onChange={handleDialogChange}>
            <MenuItem value="OnCampus">OnCampus</MenuItem>
            <MenuItem value="OffCampus">OffCampus</MenuItem>
            <MenuItem value="Entrepreneurship or Business">Entrepreneurship or Business</MenuItem>
            <MenuItem value="HigherStudies">HigherStudies</MenuItem>
          </TextField>
          {newStudent.status === "Entrepreneurship or Business" && (
            <>
              <TextField name="firm_name" label="Firm Name" value={newStudent.firm_name} onChange={handleDialogChange} />
              <TextField name="firm_reg_no" label="Registration No" value={newStudent.firm_reg_no} onChange={handleDialogChange} />
              <TextField name="gst_no" label="GST No" value={newStudent.gst_no} onChange={handleDialogChange} />
              <TextField name="role_in_firm" label="Role in Firm" value={newStudent.role_in_firm} onChange={handleDialogChange} />
            </>
          )}
          {newStudent.status === "HigherStudies" && (
            <>
              <TextField name="higher_study_college" label="College" value={newStudent.higher_study_college} onChange={handleDialogChange} />
              <TextField name="higher_study_degree" label="Degree" value={newStudent.higher_study_degree} onChange={handleDialogChange} />
              <TextField name="higher_study_country" label="Country" value={newStudent.higher_study_country} onChange={handleDialogChange} />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddStudent}>Add</Button>
        </DialogActions>
      </Dialog>

      {/* Table code remains as is */}

      {/* ... Table and TableBody as earlier ... */}
    </Box>
  );
};

export default PlacementTable;



// import {
//   Button,
//   Checkbox,
//   FormControlLabel,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
// } from "@mui/material";
// import { useEffect, useState } from "react";
// import { usePlacement } from "../MainTable/MainPlacementTable";

// const PlacementTable = ({ studentData }) => {
//   const { updateStudentOffers } = usePlacement();
//   const [students, setStudents] = useState([]);
//   const [newOffer, setNewOffer] = useState({});
//   const [showFormIndex, setShowFormIndex] = useState(null);

//   useEffect(() => {
//     const normalize = (val) => {
//       if (typeof val === "object" && val !== null && "String" in val) {
//         return val.String;
//       }
//       return val ?? "";
//     };

//     const transformed = (studentData || []).map((s) => ({
//       regNo: normalize(s.reg_no || s.regNo),
//       name: normalize(s.name),
//       department: normalize(s.department),
//       email: normalize(s.email),
//       offers: s.offers || [],
//     }));

//     setStudents(transformed);
//   }, [studentData]);

//   const handleAddOffer = (index) => {
//     const updatedStudents = [...students];
//     const student = updatedStudents[index];

//     const offer = {
//       company: newOffer.company?.trim() || "",
//       stipend: parseFloat(newOffer.stipend || 0),
//       ppo: !!newOffer.ppo,
//       ppoI: !!newOffer.ppoI,
//       i: !!newOffer.i,
//     };

//     if (!offer.company) {
//       alert("Company name is required.");
//       return;
//     }

//     student.offers = [...(student.offers || []), offer];

//     setStudents(updatedStudents); // Update UI
//     updateStudentOffers(student.regNo, offer); // Push to backend

//     setShowFormIndex(null); // Close form
//     setNewOffer({});
//   };

//   const handleChange = (e) => {
//     const { name, value, checked, type } = e.target;
//     setNewOffer((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow sx={{ backgroundColor: "#ec7000" }}>
//             <TableCell sx={{ fontWeight: "bold", color: "white" }}>Reg No</TableCell>
//             <TableCell sx={{ fontWeight: "bold", color: "white" }}>Name</TableCell>
//             <TableCell sx={{ fontWeight: "bold", color: "white" }}>Department</TableCell>
//             <TableCell sx={{ fontWeight: "bold", color: "white" }}>Email</TableCell>
//             <TableCell sx={{ fontWeight: "bold", color: "white" }}>Offers</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {students.map((student, idx) => (
//             <TableRow key={idx}>
//               <TableCell>{student.regNo}</TableCell>
//               <TableCell>{student.name}</TableCell>
//               <TableCell>{student.department}</TableCell>
//               <TableCell>{student.email}</TableCell>
//               <TableCell>
//                 {student.offers?.map((offer, i) => (
//                   <div key={i} style={{ marginBottom: "8px" }}>
//                     <strong>{offer.company}</strong>
//                     <div>Stipend: ₹{offer.stipend}</div>
//                     {offer.ppoI && <div>PPO + Internship</div>}
//                     {!offer.ppoI && offer.ppo && <div>PPO</div>}
//                     {!offer.ppoI && !offer.ppo && offer.i && <div>Internship</div>}
//                   </div>
//                 ))}

//                 {showFormIndex === idx && (
//                   <div style={{ marginTop: "10px" }}>
//                     <TextField
//                       label="Company"
//                       name="company"
//                       size="small"
//                       value={newOffer.company || ""}
//                       onChange={handleChange}
//                       sx={{ mr: 1, mb: 1 }}
//                     />
//                     <TextField
//                       label="Stipend"
//                       name="stipend"
//                       size="small"
//                       type="number"
//                       value={newOffer.stipend || ""}
//                       onChange={handleChange}
//                       sx={{ mr: 1, mb: 1 }}
//                     />
//                     <div>
//                       <FormControlLabel
//                         control={
//                           <Checkbox
//                             name="ppo"
//                             checked={!!newOffer.ppo}
//                             onChange={handleChange}
//                           />
//                         }
//                         label="PPO"
//                       />
//                       <FormControlLabel
//                         control={
//                           <Checkbox
//                             name="ppoI"
//                             checked={!!newOffer.ppoI}
//                             onChange={handleChange}
//                           />
//                         }
//                         label="PPO + Intern"
//                       />
//                       <FormControlLabel
//                         control={
//                           <Checkbox
//                             name="i"
//                             checked={!!newOffer.i}
//                             onChange={handleChange}
//                           />
//                         }
//                         label="Internship"
//                       />
//                     </div>
//                     <Button
//                       variant="contained"
//                       onClick={() => handleAddOffer(idx)}
//                       sx={{ mt: 1 }}
//                     >
//                       Save Offer
//                     </Button>
//                   </div>
//                 )}

//                 {student.offers?.length < 3 && showFormIndex !== idx && (
//                   <Button
//                     variant="outlined"
//                     size="small"
//                     onClick={() => setShowFormIndex(idx)}
//                     sx={{ mt: 1 }}
//                   >
//                     Add Offer
//                   </Button>
//                 )}
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default PlacementTable;