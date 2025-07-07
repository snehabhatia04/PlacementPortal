import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Styled Components
const LoginContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "#f8f8f8",
});

const LoginBox = styled(Box)({
  backgroundColor: "white",
  padding: "2rem",
  borderRadius: "8px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  width: "100%",
  maxWidth: "400px",
});

const OrangeButton = styled(Button)({
  backgroundColor: "#E87722",
  color: "white",
  marginTop: "1rem",
  "&:hover": {
    backgroundColor: "#cf6b1b",
  },
});

const Logo = styled("img")({
  width: "160px",
  marginBottom: "1.5rem",
});

// Main Component
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const cleanedEmail = email.trim().toLowerCase();
    const allowedExceptions = [
      "admin@example.com",
      "admin@ac.muj.in",
      "admin@muj.ac.in",
    ];
    const requiredDomain = "@muj.ac.in";

    if (
      !cleanedEmail.endsWith(requiredDomain) &&
      !allowedExceptions.includes(cleanedEmail)
    ) {
      setError("Only @muj.ac.in or approved admin emails are allowed.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/login", {
        email: cleanedEmail,
        password: password,
      });

      if (response.data.token) {
        const user = {
          email: cleanedEmail,
          role: response.data.role || "admin",
        };

        // Set token and user in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(user));

        alert("Login successful!");
        navigate("/"); // Redirect to home/dashboard
      } else {
        setError("Invalid response format from server.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed. Check credentials.");
    }
  };

  return (
    <LoginContainer>
      <LoginBox>
        <Logo src="/logo.png" alt="Manipal Logo" />
        <Typography variant="h5" fontWeight="bold" color="#E87722" gutterBottom>
          Welcome to Placement Portal
        </Typography>

        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!error}
          helperText={error}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <OrangeButton fullWidth variant="contained" onClick={handleLogin}>
          Sign In
        </OrangeButton>

        <Typography variant="body2" color="textSecondary" mt={2}>
          Forgot Password?
        </Typography>
      </LoginBox>
    </LoginContainer>
  );
};

export default LoginPage;