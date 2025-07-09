import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from "@mui/material";
import { styled } from "@mui/system";
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

// ✅ LoginPage Component
const LoginPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const cleanedEmail = email.trim().toLowerCase();
    const allowedExceptions = [
      "admin@example.com",
      "admin@ac.muj.in",
      "admin@muj.ac.in",
      "fpc01@example.com",
      "fpccse@example.com",
      "fpccce@example.com",
      "fpcaiml@example.com",
      "fpciot@example.com",
      "fpcit@example.com"
    ];
    const requiredDomain = "@muj.ac.in";

    // Validate email domain or allowed admin exceptions
    if (
      !cleanedEmail.endsWith(requiredDomain) &&
      !allowedExceptions.includes(cleanedEmail)
    ) {
      setError("Only @muj.ac.in or approved admin emails are allowed.");
      return;
    }

    setError("");

    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: cleanedEmail, password }),
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "Login failed");
        }
        return response.json();
      })
      // .then((data) => {
      //   if (!data.token) {
      //     setError(data.message || "Invalid response from server.");
      //     return;
      //   }

      //   // ✅ Save token and user data
      //   const user = {
      //     email: cleanedEmail,
      //     role: data.role || "admin",
      //   };

      //   localStorage.setItem("token", data.token);
      //   localStorage.setItem("user", JSON.stringify(user));

      //   if (onLoginSuccess) {
      //     onLoginSuccess({ token: data.token, user });
      //   }

      //   // ✅ Check user status
      //   if (data.status === "reset_required") {
      //     alert("Please reset your password before continuing.");
      //     navigate("/reset-password");
      //   } else if (data.status === "active") {
      //     alert("Login successful!");
      //     navigate("/");
      //   } else {
      //     setError("Your account is not active. Please contact admin.");
      //   }
      // })

      .then((data) => {
  if (!data.token) {
    setError(data.message || "Invalid response from server.");
    return;
  }

  const user = {
    email: cleanedEmail,
    role: data.role || "admin",
  };

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("status", data.status);  // 👈 store status

  if (onLoginSuccess) {
    onLoginSuccess({ token: data.token, user, status: data.status });  // pass status
  }

  if (data.status === "reset_required") {
    alert("Please reset your password before continuing.");
    navigate("/reset-password");
  } else if (data.status === "active") {
    alert("Login successful!");
    navigate("/select-batch");
  } else {
    setError("Your account is not active. Contact admin.");
  }
})

      .catch((error) => {
        console.error("Login error:", error);
        setError("Invalid credentials. Try again.");
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
