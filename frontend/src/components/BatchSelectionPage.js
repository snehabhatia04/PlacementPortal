import { Box, Button, Container, Typography } from "@mui/material";
// import { styled } from "@mui/system";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const BatchContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "#f8f8f8",
});

const BatchBox = styled(Box)({
  backgroundColor: "white",
  padding: "2rem",
  borderRadius: "8px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  width: "100%",
  maxWidth: "400px",
});

const BatchButton = styled(Button)({
  backgroundColor: "#E87722",
  color: "white",
  marginTop: "1rem",
  width: "100%",
  "&:hover": {
    backgroundColor: "#cf6b1b",
  },
});

const BatchSelectionPage = () => {
  const navigate = useNavigate();

  const handleBatchSelect = (batch) => {
    navigate(`/dashboard/${batch}`);
  };

  return (
    <BatchContainer>
      <BatchBox>
        <Typography variant="h5" fontWeight="bold" color="#E87722" gutterBottom>
          Select Your Batch
        </Typography>
        {["2021-2025", "2022-2026", "2023-2027", "2024-2028"].map((batch) => (
          <BatchButton key={batch} onClick={() => handleBatchSelect(batch)}>
            {batch}
          </BatchButton>
        ))}
      </BatchBox>
    </BatchContainer>
  );
};

export default BatchSelectionPage;