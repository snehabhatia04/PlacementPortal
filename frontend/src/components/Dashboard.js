import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  InputBase,
  Menu, MenuItem,
  Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Toolbar, Typography
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";

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

const SearchBar = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "4px 10px",
  borderRadius: "20px",
  width: "100%",
  maxWidth: 300,
  marginLeft: "auto",
  backgroundColor: "#fff2e6",
  fontFamily: "'Segoe UI', sans-serif",
}));

const ToggleButton = styled(IconButton)(({ theme }) => ({
  color: "white",
  marginRight: theme.spacing(2),
}));

//const Dashboard = ({ user = "User" }) => {
  const Dashboard = ({ user = "User", handleLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleNotificationClick = (event) => setAnchorEl(event.currentTarget);
  const handleNotificationClose = () => setAnchorEl(null);

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
          <SearchBar>
            <SearchIcon />
            <InputBase placeholder="Search…" sx={{ ml: 1, flex: 1 }} />
          </SearchBar>
          <IconButton color="inherit" onClick={handleNotificationClick}>
            <NotificationsIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleNotificationClose}>
            <MenuItem onClick={handleNotificationClose}>New Placement Drive</MenuItem>
            <MenuItem onClick={handleNotificationClose}>Internship Fair</MenuItem>
          </Menu>
          <Typography variant="body1" sx={{ mx: 2, fontWeight: 500 }}>{`229301245 :: ${user.toUpperCase()}`}</Typography>
          <LogoutButton startIcon={<LogoutIcon />} onClick={handleLogout}>
            Logout
          </LogoutButton>
        </Toolbar>
      </AppBar>

      <Content>
        <Typography variant="h5" fontWeight="bold" color="#E87722" gutterBottom>
          Notifications
        </Typography>
        <TableContainer component={Paper} sx={{ backgroundColor: "#fff8f1" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography fontWeight="bold">S. No.</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">Description</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">Date</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>Placement Drive for XYZ Company</TableCell>
                <TableCell>20-Feb-2025</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>Internship Fair Registration Open</TableCell>
                <TableCell>25-Feb-2025</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Content>
    </>
  );
};

export default Dashboard;
