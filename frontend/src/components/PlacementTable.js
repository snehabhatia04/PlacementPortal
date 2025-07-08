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
} from "@mui/material";
import { useEffect, useState } from "react";
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
  });

  useEffect(() => {
    if (!companyView) {
      setStudents(studentData);
    } else {
      const filtered = studentData.filter((student) =>
        (student.offers || []).some(
          (offer) => offer.company?.toLowerCase() === companyView.toLowerCase()
        )
      );
      setStudents(filtered);
    }
  }, [studentData, companyView]);

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(students);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    XLSX.writeFile(wb, "students.xlsx");
  };

  const handleDialogChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleAddStudent = async () => {
    const formatted = {
      regNo: newStudent.reg_no,
      name: newStudent.name,
      email: newStudent.email,
      department: newStudent.department,
      status: newStudent.status,
      offers: [],
    };

    try {
      await addStudent(formatted);
      await fetchAllStudents();
      setDialogOpen(false);
      setNewStudent({
        reg_no: "",
        name: "",
        email: "",
        department: "",
        status: "",
      });
    } catch (err) {
      console.error("Failed to add student:", err);
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
        <Box display="flex" gap={2}>
          {!branch && (
            <Button variant="contained" sx={{ backgroundColor: "#ec7000", color: "#fff" }}>
              View Summary
            </Button>
          )}
          <Button variant="outlined" onClick={handleExportExcel}>
            Export Excel
          </Button>
        </Box>
        <Button variant="contained" onClick={() => setDialogOpen(true)}>Add Student</Button>
      </Box>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Add New Student</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          {["reg_no", "name", "email", "department", "status"].map((field) => (
            <TextField
              key={field}
              name={field}
              label={field.replace("_", " ").toUpperCase()}
              value={newStudent[field]}
              onChange={handleDialogChange}
            />
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
            {students.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  No students available. Add or import to populate the list.
                </TableCell>
              </TableRow>
            ) : (
              students.map((student, index) => {
                const offers = student.offers || [];
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
                    <TableCell>{offer.offer_type || "-"}</TableCell>
                    <TableCell>{offer.stipend || "-"}</TableCell>
                    <TableCell>{offer.internship || "-"}</TableCell>
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
