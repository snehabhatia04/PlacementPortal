import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    old_password: "",
    new_password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        alert("✅ " + data.message);

        // ✅ Clear localStorage on success
        localStorage.clear();

        // ✅ Redirect to login
        navigate("/login");
      } else {
        const err = await res.json();
        alert("❌ " + err.error);
      }
    } catch (error) {
      console.error("Reset password failed:", error);
      alert("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 10, display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h4" fontWeight="bold">Reset Password</Typography>

        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Old Password"
          name="old_password"
          type="password"
          value={formData.old_password}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="New Password"
          name="new_password"
          type="password"
          value={formData.new_password}
          onChange={handleChange}
          fullWidth
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </Box>
    </Container>
  );
};

export default ResetPasswordPage;
