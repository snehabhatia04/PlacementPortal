import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePlacement } from "../MainTable/MainPlacementTable";

const idToBatchMap = {
  1: "2021-25",
  2: "2022-26",
  3: "2023-27",
  4: "2024-28",
};

// Styles...
const Content = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: "64px",
  backgroundColor: theme.palette.background.default,
  minHeight: "calc(100vh - 64px)",
}));

const LogoutButton = styled(Button)({
  backgroundColor: "white",
  color: "#E87722",
  fontWeight: "bold",
  borderRadius: "12px",
  padding: "6px 12px",
  '&:hover': {
    backgroundColor: "#cf6b1b",
    color: "white",
  },
});

const ToggleButton = styled(IconButton)(({ theme }) => ({
  color: "white",
  marginRight: theme.spacing(2),
}));

const SummaryCard = styled(Card)({
  backgroundColor: "#fff8f1",
  borderRadius: "16px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  minWidth: 160,
});

const Dashboard = ({ handleLogout, selectedBatch, setSelectedBatch }) => {
  const { sessionId } = useParams();
  const [userName, setUserName] = useState("User");
  const { allStudents, fetchAllStudents } = usePlacement();

  useEffect(() => {
    fetchAllStudents();

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUserName(parsed.name || parsed.email || "User");
    }
  }, [fetchAllStudents]);

  useEffect(() => {
    if (sessionId) {
      setSelectedBatch(sessionId);
    }
  }, [sessionId, setSelectedBatch]);

  const totalStudents = allStudents.length;
  const onCampus = allStudents.filter(s => s.status === "OnCampus").length;
  const offCampus = allStudents.filter(s => s.status === "OffCampus").length;
  const higherStudies = allStudents.filter(s => s.status === "HigherStudies").length;
  const entrepreneurship = allStudents.filter(s => s.status === "Entrepreneurship").length;
  const business = allStudents.filter(s => s.status === "Business").length;
  const placed = onCampus + offCampus;

  const summaryData = [
    { label: "Total Students", value: totalStudents },
    { label: "Placed", value: placed },
    { label: "On Campus", value: onCampus },
    { label: "Off Campus", value: offCampus },
    { label: "Higher Studies", value: higherStudies },
    { label: "Entrepreneurship", value: entrepreneurship },
    { label: "Business", value: business },
  ];

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#E87722", padding: "0.5rem" }}>
        <Toolbar>
          <ToggleButton edge="start">
            <MenuIcon />
          </ToggleButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", fontFamily: "'Segoe UI', sans-serif" }}>
            Dashboard
          </Typography>

          <Typography variant="body1" sx={{ mx: 2, fontWeight: 500 }}>
            {userName}
          </Typography>
          <LogoutButton startIcon={<LogoutIcon />} onClick={handleLogout}>
            Logout
          </LogoutButton>
        </Toolbar>
      </AppBar>

      <Content>
        <Typography variant="h5" fontWeight="bold" color="#E87722" gutterBottom>
          Batch: {idToBatchMap[sessionId || selectedBatch] || "Not selected"}
        </Typography>

        <Grid container spacing={3} mt={1}>
          {summaryData.map(({ label, value }) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={label}>
              <SummaryCard>
                <CardContent>
                  <Typography variant="h6" color="#E87722" fontWeight="bold">
                    {value}
                  </Typography>
                  <Typography variant="body1">{label}</Typography>
                </CardContent>
              </SummaryCard>
            </Grid>
          ))}
        </Grid>
      </Content>
    </>
  );
};

export default Dashboard;
