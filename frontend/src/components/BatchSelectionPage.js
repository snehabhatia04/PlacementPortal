import { Box, Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useEffect } from "react";
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

const batchToIdMap = {
  "2021-2025": 1,
  "2022-2026": 2,
  "2023-2027": 3,
  "2024-2028": 4,
};

const BatchSelectionPage = ({ setSelectedBatch }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const selected = localStorage.getItem("selectedBatch");
    if (selected) {
      navigate("/"); // if already selected, redirect to dashboard
    }
  }, [navigate]);

  const handleBatchSelect = (batch) => {
    const sessionId = batchToIdMap[batch];
    localStorage.setItem("selectedBatch", sessionId);  // store the integer ID
    setSelectedBatch(sessionId);
    navigate("/");
  };

  return (
    <BatchContainer>
      <BatchBox>
        <Typography variant="h5" fontWeight="bold" color="#E87722" gutterBottom>
          Select Your Batch
        </Typography>
        {Object.entries(batchToIdMap).map(([batch, id]) => (
          <BatchButton key={id} onClick={() => handleBatchSelect(batch)}>
            {batch}
          </BatchButton>
        ))}
      </BatchBox>
    </BatchContainer>
  );
};

export default BatchSelectionPage;
