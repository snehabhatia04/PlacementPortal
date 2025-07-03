// components/CreateUserPage.js
import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";

const roles = [
  "admin", "faculty", "fpc", "placement_team", "dean", "assistant_dean", "vc"
];

const CreateUserPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    role: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    // API call goes here
    try {
      const res = await fetch("http://localhost:5002/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("User created successfully");
        setFormData({ email: "", role: "", password: "" });
        setDialogOpen(false);
      } else {
        alert("Failed to create user");
      }
    } catch (error) {
      alert("Error creating user");
      console.error(error);
    }
  };

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
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            label="Role"
            name="role"
            select
            value={formData.role}
            onChange={handleChange}
          >
            {roles.map(role => (
              <MenuItem key={role} value={role}>{role}</MenuItem>
            ))}
          </TextField>
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
