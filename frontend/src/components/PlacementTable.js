import {
  Box, Button,
  Chip,
  Dialog, DialogActions, DialogContent, DialogTitle,
  Paper, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, TextField
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as XLSX from "xlsx";
import { usePlacement } from "../MainTable/MainPlacementTable";


const PlacementTable = ({ studentData = [], companyView = null }) => {
  const { addStudent, fetchAllStudents } = usePlacement();
  const [students, setStudents] = useState([]);
  const { branch } = useParams();
  const [dialogOpen, setDialogOpen] = useState(false);

  const [newStudent, setNewStudent] = useState({
    reg_no: "", name: "", email: "", department: "",
    higher_study_college: "", firm_name: "", role_in_firm: "", offers: []
  });

  useEffect(() => {
    if (!companyView) setStudents(studentData);
    else {
      const filtered = studentData.filter((student) =>
        (student.offers || []).some(
          (offer) => offer.company?.toLowerCase() === companyView.toLowerCase()
        )
      );
      setStudents(filtered);
    }
  }, [studentData, companyView]);

  const handleExportExcel = () => {
    const exportData = [];

    students.forEach((student, index) => {
      const offers = student.offers || [];
      const filteredOffers = companyView
        ? offers.filter((offer) => offer.company?.toLowerCase() === companyView.toLowerCase())
        : offers;

      const placementStatus = getPlacementStatus(student, filteredOffers);

      if (filteredOffers.length === 0) {
        exportData.push({
          "S. No.": index + 1,
          "Reg No.": student.regNo || student.reg_no,
          "Name": student.name,
          "Branch": student.department,
          "Placement Status": placementStatus,
          "Company": "No offers yet",
          "Offer Type": "-", "Stipend": "-", "Internship": "-", "Package (LPA)": "-",
          "Email": student.email,
        });
      } else {
        filteredOffers.forEach((offer, i) => {
          exportData.push({
            "S. No.": i === 0 ? index + 1 : "",
            "Reg No.": i === 0 ? student.regNo || student.reg_no : "",
            "Name": i === 0 ? student.name : "",
            "Branch": i === 0 ? student.department : "",
            "Placement Status": i === 0 ? placementStatus : "",
            "Company": offer.company || "-", "Offer Type": offer.offer_type || "-",
            "Stipend": offer.stipend || "-", "Internship": offer.internship || "-",
            "Package (LPA)": offer.package || "-",
            "Email": student.email,
          });
        });
      }
    });

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    XLSX.writeFile(wb, "students_export.xlsx");
  };

//   const handleImportExcel = (e) => {
//   const file = e.target.files[0];
//   const reader = new FileReader();

//   reader.onload = async (evt) => {
//     const bstr = evt.target.result;
//     const wb = XLSX.read(bstr, { type: "binary" });
//     const ws = wb.Sheets[wb.SheetNames[0]];
//     const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
//     const headers = data[0];
//     const rows = data.slice(1);

//     const newData = rows.map((row) => {
//       const obj = {};
//       headers.forEach((header, idx) => {
//         obj[header] = row[idx];
//       });

//       const companies = [];
//       if (obj.Company && obj.Company !== "-" && obj.Company !== "No offers from this company") {
//         companies.push({
//           company: obj.Company,
//           offer_type: obj["Offer Type"] || "",
//           stipend: obj.Stipend || "",
//           internship: obj.Internship || "",
//           package: obj["Package (LPA)"] || "",
//         });
//       }

//       if (!obj["Reg No."] || !obj.Name) {
//         console.warn("Skipping student with missing Reg No. or Name:", obj);
//         return null;
//       }

//       return {
//         regNo: String(obj["Reg No."]).trim(),
//         name: obj.Name.trim(),
//         email: obj.Email || "",
//         department: obj.Branch || "",
//         higher_study_college: obj["Higher Study"] || "",
//         firm_name: obj["Firm Name"] || "",
//         role_in_firm: obj["Role In Firm"] || "",
//         offers: companies,
//       };
//     }).filter(Boolean);

//     console.log("Imported Data to be added:", newData);

//     let success = 0, fail = 0;

//     await Promise.allSettled(newData.map(student =>
//       addStudent(student)
//         .then(() => { success++; })
//         .catch(err => {
//           fail++;
//           console.error("Failed to add student:", student, err.response?.data || err.message);
//         })
//     ));

//     console.log(`Import completed. Success: ${success}, Failed: ${fail}`);
//     await fetchAllStudents();
//     alert(`Import completed. Success: ${success}, Failed: ${fail}`);
//   };

//   reader.readAsBinaryString(file);
// };


  const handleImportExcel = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post("http://localhost:5001/students/import", formData, {
      headers: { "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });

    console.log("Excel import response:", response.data);
    alert(`Import completed. Success: ${response.data.successCount}, Failed: ${response.data.failCount}`);
    await fetchAllStudents();
  } catch (err) {
    console.error("Failed to import Excel:", err.response?.data || err.message);
    alert(`Failed to import Excel: ${err.response?.data?.error || err.message}`);
  }
};


  const getPlacementStatus = (student, offers) => {
    if (offers.some((offer) => offer.offer_type === "PPO" || offer.offer_type === "PPO+I")) return "Placed";
    if (student.higher_study_college) return "Higher Study";
    if (student.firm_name) return student.role_in_firm?.toLowerCase() === "owner" ? "Family Business" : "Entrepreneur";
    return "Not Placed";
  };

  const statusColor = (status) => {
    switch (status) {
      case "Placed": return "success";
      case "Higher Study": return "info";
      case "Entrepreneur": return "warning";
      case "Family Business": return "secondary";
      default: return "default";
    }
  };

  const handleDialogChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleAddStudent = async () => {
    const formatted = {
      regNo: newStudent.reg_no, name: newStudent.name, email: newStudent.email,
      department: newStudent.department, higher_study_college: newStudent.higher_study_college,
      firm_name: newStudent.firm_name, role_in_firm: newStudent.role_in_firm, offers: []
    };

    await addStudent(formatted);
    await fetchAllStudents();
    setDialogOpen(false);
    setNewStudent({ reg_no: "", name: "", email: "", department: "", higher_study_college: "", firm_name: "", role_in_firm: "", offers: [] });
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2} flexWrap="wrap" gap={2}>
        <Box display="flex" gap={2}>
          {!branch && <Button variant="contained" sx={{ backgroundColor: "#ec7000", color: "#fff" }}>View Summary</Button>}
          <label htmlFor="import-excel">
            <input accept=".xlsx, .xls" id="import-excel" type="file" style={{ display: "none" }} onChange={handleImportExcel} />
            <Button variant="outlined" component="span">Import Excel</Button>
          </label>
          <Button variant="outlined" onClick={handleExportExcel}>Export Excel</Button>
        </Box>
        <Button variant="contained" onClick={() => setDialogOpen(true)}>Add Student</Button>
      </Box>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Add New Student</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          {["reg_no", "name", "email", "department", "higher_study_college", "firm_name", "role_in_firm"].map((field) => (
            <TextField key={field} name={field} label={field.replace(/_/g, " ").toUpperCase()} value={newStudent[field]} onChange={handleDialogChange} />
          ))}
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
            {students.map((student, index) => {
              const offers = student.offers || [];
              const filteredOffers = companyView ? offers.filter(o => o.company?.toLowerCase() === companyView.toLowerCase()) : offers;
              const status = getPlacementStatus(student, filteredOffers);

              if (filteredOffers.length === 0) {
                return (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{student.regNo || student.reg_no}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.department}</TableCell>
                    <TableCell><Chip label={status} color={statusColor(status)} /></TableCell>
                    <TableCell colSpan={5} align="center">No offers yet</TableCell>
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
                      <TableCell rowSpan={filteredOffers.length}><Chip label={status} color={statusColor(status)} /></TableCell>
                    </>
                  )}
                  <TableCell>{offer.company}</TableCell>
                  <TableCell>{offer.offer_type}</TableCell>
                  <TableCell>{offer.stipend}</TableCell>
                  <TableCell>{offer.internship}</TableCell>
                  <TableCell>{offer.package}</TableCell>
                </TableRow>
              ));
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PlacementTable;
