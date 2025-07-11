import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";import { Navigate } from "react-router-dom";
import { hasPermission } from "../utils/permissions";

const roles = [
  "admin", "faculty", "fpc", "placement_team", "dean", "assistant_dean", "vc"
];

const departments = [
  "CSE", "AIML", "IT", "IOT", "CCE", "Data Science", "ECE"
];

const CreateUserPage = () => {
  
if (!hasPermission("create_user")) {
  return <Navigate to="/" replace />;
}

  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",    // ✅ use password, not password_hash
    role: "",
    department: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const sessionId = localStorage.getItem("selectedBatch");
    if (!sessionId) {
      alert("Please select a batch session first!");
      return;
    }

    const payload = {
      ...formData,
      session_id: parseInt(sessionId)
    };

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8080/admin/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        alert(`✅ User created successfully. Password: ${data.generated_pass}`);
        setFormData({ email: "", password: "", role: "", department: "" });
        setDialogOpen(false);
      } else {
        const errMsg = await res.text();
        alert("❌ Failed to create user: " + errMsg);
      }
    } catch (error) {
      alert("❌ Error creating user");
      console.error(error);
    }
  };

  const needsDepartment = ["faculty", "fpc", "placement_team", "admin"].includes(formData.role);

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Create New User
      </Typography>
      <Button variant="contained" onClick={() => setDialogOpen(true)}>Create User</Button>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Create User</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <TextField
            label="Role"
            name="role"
            select
            value={formData.role}
            onChange={handleChange}
            required
          >
            {roles.map(role => (
              <MenuItem key={role} value={role}>{role}</MenuItem>
            ))}
          </TextField>

          {needsDepartment && (
            <TextField
              label="Department"
              name="department"
              select
              value={formData.department}
              onChange={handleChange}
              required
            >
              {departments.map(dep => (
                <MenuItem key={dep} value={dep}>{dep}</MenuItem>
              ))}
            </TextField>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CreateUserPage;

