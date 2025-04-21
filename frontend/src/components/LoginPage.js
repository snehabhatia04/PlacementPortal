import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

const LoginPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email.endsWith("@muj.ac.in")) {
      setError("Only @jaipur.manipal emails are allowed.");
      return;
    }

    setError("");

    fetch("http://localhost:8080/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);

          // ✅ Update auth state in App.js
          onLoginSuccess(data.token);

          alert("Login successful!");
          navigate("/");
        } else {
          setError(data.message || "Login failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Something went wrong. Try again.");
      });
  };

  return (
    <LoginContainer>
      <LoginBox>
        <Logo src="/logo.png" alt="Manipal Logo" />
        <Typography variant="h5" fontWeight="bold" color="#E87722" gutterBottom>
          Welcome to LoginPage!
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
          variant="outlined"
          type="password"
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

