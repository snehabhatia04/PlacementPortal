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
  Paper
} from "@mui/material";
import React, { useState } from "react";

const OffCampusPage = () => {
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    regNo: "",
    name: "",
    email: "",
    department: "",
    company: "",
    offerType: "",
    stipend: "",
    package: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    const newEntry = {
      ...form,
      status: "OffCampus"
    };
    setStudents([...students, newEntry]);
    setForm({
      regNo: "",
      name: "",
      email: "",
      department: "",
      company: "",
      offerType: "",
      stipend: "",
      package: ""
    });
    setOpen(false);
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">Off Campus Placement Details</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>Add Student</Button>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Off Campus Student</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField name="regNo" label="Registration No" value={form.regNo} onChange={handleChange} />
          <TextField name="name" label="Name" value={form.name} onChange={handleChange} />
          <TextField name="email" label="Email" value={form.email} onChange={handleChange} />
          <TextField name="department" label="Department" value={form.department} onChange={handleChange} />
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

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#E87722" }}>
            <TableRow>
              {["S.No", "Reg No", "Name", "Branch", "Status", "Company", "Offer Type", "Stipend", "Package"].map((h) => (
                <TableCell key={h} sx={{ color: "white", fontWeight: "bold" }}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((s, idx) => (
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
    </Box>
  );
};

export default OffCampusPage;