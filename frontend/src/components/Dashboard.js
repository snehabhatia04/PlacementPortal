// import LogoutIcon from "@mui/icons-material/Logout";
// import MenuIcon from "@mui/icons-material/Menu";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import SearchIcon from "@mui/icons-material/Search";
// import {
//   AppBar,
//   Box,
//   Button,
//   IconButton,
//   InputBase,
//   Menu, MenuItem,
//   Paper,
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Toolbar, Typography
// } from "@mui/material";
// import { styled } from "@mui/system";
// import React, { useState } from "react";

// const Content = styled(Box)(({ theme }) => ({
//   padding: theme.spacing(3),
//   marginTop: "64px",
//   backgroundColor: theme.palette.background.default,
//   minHeight: "calc(100vh - 64px)",
// }));

// const LogoutButton = styled(Button)({
//   backgroundColor: "white",
//   color: "#E87722",
//   fontWeight: "bold",
//   borderRadius: "12px",
//   padding: "6px 12px",
//   '&:hover': {
//     backgroundColor: "#cf6b1b",
//     color: "white",
//   },
// });

// const SearchBar = styled(Paper)(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   padding: "4px 10px",
//   borderRadius: "20px",
//   width: "100%",
//   maxWidth: 300,
//   marginLeft: "auto",
//   backgroundColor: "#fff2e6",
//   fontFamily: "'Segoe UI', sans-serif",
// }));

// const ToggleButton = styled(IconButton)(({ theme }) => ({
//   color: "white",
//   marginRight: theme.spacing(2),
// }));

// //const Dashboard = ({ user = "User" }) => {
//   const Dashboard = ({ user = "User", handleLogout }) => {
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleNotificationClick = (event) => setAnchorEl(event.currentTarget);
//   const handleNotificationClose = () => setAnchorEl(null);

//   return (
//     <>
//       <AppBar position="fixed" sx={{ backgroundColor: "#E87722", padding: "0.5rem" }}>
//         <Toolbar>
//           <ToggleButton edge="start">
//             <MenuIcon />
//           </ToggleButton>
//           <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", fontFamily: "'Segoe UI', sans-serif" }}>
//             Dashboard
//           </Typography>
//           <SearchBar>
//             <SearchIcon />
//             <InputBase placeholder="Search…" sx={{ ml: 1, flex: 1 }} />
//           </SearchBar>
//           <IconButton color="inherit" onClick={handleNotificationClick}>
//             <NotificationsIcon />
//           </IconButton>
//           <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleNotificationClose}>
//             <MenuItem onClick={handleNotificationClose}>New Placement Drive</MenuItem>
//             <MenuItem onClick={handleNotificationClose}>Internship Fair</MenuItem>
//           </Menu>
//           <Typography variant="body1" sx={{ mx: 2, fontWeight: 500 }}>{`229301245 :: ${user.toUpperCase()}`}</Typography>
//           <LogoutButton startIcon={<LogoutIcon />} onClick={handleLogout}>
//             Logout
//           </LogoutButton>
//         </Toolbar>
//       </AppBar>

//       <Content>
//         <Typography variant="h5" fontWeight="bold" color="#E87722" gutterBottom>
//           Notifications
//         </Typography>
//         <TableContainer component={Paper} sx={{ backgroundColor: "#fff8f1" }}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell><Typography fontWeight="bold">S. No.</Typography></TableCell>
//                 <TableCell><Typography fontWeight="bold">Description</Typography></TableCell>
//                 <TableCell><Typography fontWeight="bold">Date</Typography></TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               <TableRow>
//                 <TableCell>1</TableCell>
//                 <TableCell>Placement Drive for XYZ Company</TableCell>
//                 <TableCell>20-Feb-2025</TableCell>
//               </TableRow>
//               <TableRow>
//                 <TableCell>2</TableCell>
//                 <TableCell>Internship Fair Registration Open</TableCell>
//                 <TableCell>25-Feb-2025</TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Content>
//     </>
//   );
// };

// export default Dashboard;

// import LogoutIcon from "@mui/icons-material/Logout";
// import MenuIcon from "@mui/icons-material/Menu";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import SearchIcon from "@mui/icons-material/Search";
// import {
//   AppBar,
//   Box,
//   Button,
//   IconButton,
//   InputBase,
//   Menu,
//   MenuItem,
//   Paper,
//   Toolbar,
//   Typography,
//   Grid,
//   Card,
//   CardContent
// } from "@mui/material";
// import { styled } from "@mui/system";
// import React, { useState } from "react";

// // Styles
// const Content = styled(Box)(({ theme }) => ({
//   padding: theme.spacing(3),
//   marginTop: "64px",
//   backgroundColor: theme.palette.background.default,
//   minHeight: "calc(100vh - 64px)",
// }));

// const LogoutButton = styled(Button)({
//   backgroundColor: "white",
//   color: "#E87722",
//   fontWeight: "bold",
//   borderRadius: "12px",
//   padding: "6px 12px",
//   '&:hover': {
//     backgroundColor: "#cf6b1b",
//     color: "white",
//   },
// });

// const SearchBar = styled(Paper)(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   padding: "4px 10px",
//   borderRadius: "20px",
//   width: "100%",
//   maxWidth: 300,
//   marginLeft: "auto",
//   backgroundColor: "#fff2e6",
// }));

// const ToggleButton = styled(IconButton)(({ theme }) => ({
//   color: "white",
//   marginRight: theme.spacing(2),
// }));

// const SummaryCard = styled(Card)({
//   backgroundColor: "#fff8f1",
//   borderRadius: "16px",
//   boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//   minWidth: 160,
// });

// const Dashboard = ({ user = "User", handleLogout, batch = "2021-2025" }) => {
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleNotificationClick = (event) => setAnchorEl(event.currentTarget);
//   const handleNotificationClose = () => setAnchorEl(null);

//   return (
//     <>
//       <AppBar position="fixed" sx={{ backgroundColor: "#E87722", padding: "0.5rem" }}>
//         <Toolbar>
//           <ToggleButton edge="start">
//             <MenuIcon />
//           </ToggleButton>
//           <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", fontFamily: "'Segoe UI', sans-serif" }}>
//             Dashboard
//           </Typography>
//           <SearchBar>
//             <SearchIcon />
//             <InputBase placeholder="Search…" sx={{ ml: 1, flex: 1 }} />
//           </SearchBar>
//           <IconButton color="inherit" onClick={handleNotificationClick}>
//             <NotificationsIcon />
//           </IconButton>
//           <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleNotificationClose}>
//             <MenuItem onClick={handleNotificationClose}>New Placement Drive</MenuItem>
//             <MenuItem onClick={handleNotificationClose}>Internship Fair</MenuItem>
//           </Menu>
//           <Typography variant="body1" sx={{ mx: 2, fontWeight: 500 }}>{`229301245 :: ${user.toUpperCase()}`}</Typography>
//           <LogoutButton startIcon={<LogoutIcon />} onClick={handleLogout}>
//             Logout
//           </LogoutButton>
//         </Toolbar>
//       </AppBar>

//       <Content>
//         <Typography variant="h5" fontWeight="bold" color="#E87722" gutterBottom>
//           Batch: {batch}
//         </Typography>

//         <Grid container spacing={3} mt={1}>
//           {[
//             { label: "Total Students", value: 120 },
//             { label: "Placed", value: 85 },
//             { label: "On Campus", value: 60 },
//             { label: "Off Campus", value: 25 },
//             { label: "Higher Studies", value: 15 },
//             { label: "Entrepreneurship", value: 5 },
//             { label: "Business", value: 3 },
//           ].map(({ label, value }) => (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={label}>
//               <SummaryCard>
//                 <CardContent>
//                   <Typography variant="h6" color="#E87722" fontWeight="bold">
//                     {value}
//                   </Typography>
//                   <Typography variant="body1">{label}</Typography>
//                 </CardContent>
//               </SummaryCard>
//             </Grid>
//           ))}
//         </Grid>
//       </Content>
//     </>
//   );
// };

// // export default Dashboard;
// import LogoutIcon from "@mui/icons-material/Logout";
// import MenuIcon from "@mui/icons-material/Menu";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import SearchIcon from "@mui/icons-material/Search";
// import {
//   AppBar,
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Grid,
//   IconButton,
//   InputBase,
//   Menu,
//   MenuItem,
//   Paper,
//   Toolbar,
//   Typography
// } from "@mui/material";
// import { styled } from "@mui/system";
// import { useEffect, useState } from "react";
// import { usePlacement } from "../MainTable/MainPlacementTable";

// // Styles...
// const Content = styled(Box)(({ theme }) => ({
//   padding: theme.spacing(3),
//   marginTop: "64px",
//   backgroundColor: theme.palette.background.default,
//   minHeight: "calc(100vh - 64px)",
// }));

// const LogoutButton = styled(Button)({
//   backgroundColor: "white",
//   color: "#E87722",
//   fontWeight: "bold",
//   borderRadius: "12px",
//   padding: "6px 12px",
//   '&:hover': {
//     backgroundColor: "#cf6b1b",
//     color: "white",
//   },
// });

// const SearchBar = styled(Paper)(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   padding: "4px 10px",
//   borderRadius: "20px",
//   width: "100%",
//   maxWidth: 300,
//   marginLeft: "auto",
//   backgroundColor: "#fff2e6",
// }));

// const ToggleButton = styled(IconButton)(({ theme }) => ({
//   color: "white",
//   marginRight: theme.spacing(2),
// }));

// const SummaryCard = styled(Card)({
//   backgroundColor: "#fff8f1",
//   borderRadius: "16px",
//   boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//   minWidth: 160,
// });

// const Dashboard = ({ user = "User", handleLogout, batch = "2021-2025" }) => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const { allStudents, fetchAllStudents } = usePlacement();

//   useEffect(() => {
//     fetchAllStudents();
//   }, []);

//   const handleNotificationClick = (event) => setAnchorEl(event.currentTarget);
//   const handleNotificationClose = () => setAnchorEl(null);

//   const totalStudents = allStudents.length;
//   const onCampus = allStudents.filter(s => s.status === "OnCampus").length;
//   const offCampus = allStudents.filter(s => s.status === "OffCampus").length;
//   const higherStudies = allStudents.filter(s => s.status === "HigherStudies").length;
//   const entrepreneurship = allStudents.filter(s => s.status === "Entrepreneurship").length;
//   const business = allStudents.filter(s => s.status === "Business").length;
//   const placed = onCampus + offCampus;

//   const summaryData = [
//     { label: "Total Students", value: totalStudents },
//     { label: "Placed", value: placed },
//     { label: "On Campus", value: onCampus },
//     { label: "Off Campus", value: offCampus },
//     { label: "Higher Studies", value: higherStudies },
//     { label: "Entrepreneurship", value: entrepreneurship },
//     { label: "Business", value: business },
//   ];

//   return (
//     <>
//       <AppBar position="fixed" sx={{ backgroundColor: "#E87722", padding: "0.5rem" }}>
//         <Toolbar>
//           <ToggleButton edge="start">
//             <MenuIcon />
//           </ToggleButton>
//           <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", fontFamily: "'Segoe UI', sans-serif" }}>
//             Dashboard
//           </Typography>
//           <SearchBar>
//             <SearchIcon />
//             <InputBase placeholder="Search…" sx={{ ml: 1, flex: 1 }} />
//           </SearchBar>
//           <IconButton color="inherit" onClick={handleNotificationClick}>
//             <NotificationsIcon />
//           </IconButton>
//           <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleNotificationClose}>
//             <MenuItem onClick={handleNotificationClose}>New Placement Drive</MenuItem>
//             <MenuItem onClick={handleNotificationClose}>Internship Fair</MenuItem>
//           </Menu>
//           <Typography variant="body1" sx={{ mx: 2, fontWeight: 500 }}>{`229301245 :: ${user.toUpperCase()}`}</Typography>
//           <LogoutButton startIcon={<LogoutIcon />} onClick={handleLogout}>
//             Logout
//           </LogoutButton>
//         </Toolbar>
//       </AppBar>

//       <Content>
//         <Typography variant="h5" fontWeight="bold" color="#E87722" gutterBottom>
//           Batch: {batch}
//         </Typography>

//         <Grid container spacing={3} mt={1}>
//           {summaryData.map(({ label, value }) => (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={label}>
//               <SummaryCard>
//                 <CardContent>
//                   <Typography variant="h6" color="#E87722" fontWeight="bold">
//                     {value}
//                   </Typography>
//                   <Typography variant="body1">{label}</Typography>
//                 </CardContent>
//               </SummaryCard>
//             </Grid>
//           ))}
//         </Grid>
//       </Content>
//     </>
//   );
// };

// // export default Dashboard;
// import LogoutIcon from "@mui/icons-material/Logout";
// import MenuIcon from "@mui/icons-material/Menu";
// import {
//   AppBar,
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Grid,
//   IconButton,
//   Toolbar,
//   Typography,
// } from "@mui/material";
// import { styled } from "@mui/system";
// import { useEffect, useState } from "react";
// import { usePlacement } from "../MainTable/MainPlacementTable";

// // Styles...
// const Content = styled(Box)(({ theme }) => ({
//   padding: theme.spacing(3),
//   marginTop: "64px",
//   backgroundColor: theme.palette.background.default,
//   minHeight: "calc(100vh - 64px)",
// }));

// const LogoutButton = styled(Button)({
//   backgroundColor: "white",
//   color: "#E87722",
//   fontWeight: "bold",
//   borderRadius: "12px",
//   padding: "6px 12px",
//   '&:hover': {
//     backgroundColor: "#cf6b1b",
//     color: "white",
//   },
// });

// const ToggleButton = styled(IconButton)(({ theme }) => ({
//   color: "white",
//   marginRight: theme.spacing(2),
// }));

// const SummaryCard = styled(Card)({
//   backgroundColor: "#fff8f1",
//   borderRadius: "16px",
//   boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//   minWidth: 160,
// });

// const Dashboard = ({ handleLogout, batch = "2021-2025" }) => {
//   const [userName, setUserName] = useState("User");
//   const { allStudents, fetchAllStudents } = usePlacement();

//    useEffect(() => {
//   fetchAllStudents();
// }, [fetchAllStudents]); // ✅ fix warning

//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const parsed = JSON.parse(storedUser);
//       setUserName(parsed.name || parsed.email || "User");
//     }
//   }, []);

//   const totalStudents = allStudents.length;
//   const onCampus = allStudents.filter(s => s.status === "OnCampus").length;
//   const offCampus = allStudents.filter(s => s.status === "OffCampus").length;
//   const higherStudies = allStudents.filter(s => s.status === "HigherStudies").length;
//   const entrepreneurship = allStudents.filter(s => s.status === "Entrepreneurship").length;
//   const business = allStudents.filter(s => s.status === "Business").length;
//   const placed = onCampus + offCampus;

//   const summaryData = [
//     { label: "Total Students", value: totalStudents },
//     { label: "Placed", value: placed },
//     { label: "On Campus", value: onCampus },
//     { label: "Off Campus", value: offCampus },
//     { label: "Higher Studies", value: higherStudies },
//     { label: "Entrepreneurship", value: entrepreneurship },
//     { label: "Business", value: business },
//   ];

//   return (
//     <>
//       <AppBar position="fixed" sx={{ backgroundColor: "#E87722", padding: "0.5rem" }}>
//         <Toolbar>
//           <ToggleButton edge="start">
//             <MenuIcon />
//           </ToggleButton>
//           <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", fontFamily: "'Segoe UI', sans-serif" }}>
//             Dashboard
//           </Typography>

//           <Typography variant="body1" sx={{ mx: 2, fontWeight: 500 }}>
//             {userName}
//           </Typography>
//           <LogoutButton startIcon={<LogoutIcon />} onClick={handleLogout}>
//             Logout
//           </LogoutButton>
//         </Toolbar>
//       </AppBar>

//       <Content>
//         <Typography variant="h5" fontWeight="bold" color="#E87722" gutterBottom>
//           Batch: {batch}
//         </Typography>

//         <Grid container spacing={3} mt={1}>
//           {summaryData.map(({ label, value }) => (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={label}>
//               <SummaryCard>
//                 <CardContent>
//                   <Typography variant="h6" color="#E87722" fontWeight="bold">
//                     {value}
//                   </Typography>
//                   <Typography variant="body1">{label}</Typography>
//                 </CardContent>
//               </SummaryCard>
//             </Grid>
//           ))}
//         </Grid>
//       </Content>
//     </>
//   );
// };

// // export default Dashboard;
// import LogoutIcon from "@mui/icons-material/Logout";
// import MenuIcon from "@mui/icons-material/Menu";
// import {
//   AppBar,
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Grid,
//   IconButton,
//   Toolbar,
//   Typography,
// } from "@mui/material";
// import { styled } from "@mui/system";
// import { useEffect, useState } from "react";
// import { usePlacement } from "../MainTable/MainPlacementTable";

// // Styled components
// const Content = styled(Box)(({ theme }) => ({
//   padding: theme.spacing(3),
//   marginTop: "64px",
//   backgroundColor: theme.palette.background.default,
//   minHeight: "calc(100vh - 64px)",
// }));

// const LogoutButton = styled(Button)({
//   backgroundColor: "white",
//   color: "#E87722",
//   fontWeight: "bold",
//   borderRadius: "12px",
//   padding: "6px 12px",
//   '&:hover': {
//     backgroundColor: "#cf6b1b",
//     color: "white",
//   },
// });

// const ToggleButton = styled(IconButton)(({ theme }) => ({
//   color: "white",
//   marginRight: theme.spacing(2),
// }));

// const SummaryCard = styled(Card)({
//   backgroundColor: "#fff8f1",
//   borderRadius: "16px",
//   boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//   minWidth: 160,
// });

// const Dashboard = ({ handleLogout, batch = "2021-2025" }) => {
//   const [userName, setUserName] = useState("User");
//   const { allStudents, fetchAllStudents } = usePlacement();

//   useEffect(() => {
//     fetchAllStudents();

//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const parsed = JSON.parse(storedUser);
//       setUserName(parsed.name || parsed.email || "User");
//     }
//   }, [fetchAllStudents]);

//   const totalStudents = allStudents.length;
//   const onCampus = allStudents.filter(s => s.status === "OnCampus").length;
//   const offCampus = allStudents.filter(s => s.status === "OffCampus").length;
//   const higherStudies = allStudents.filter(s => s.status === "HigherStudies").length;
//   const entrepreneurship = allStudents.filter(s => s.status === "Entrepreneurship").length;
//   const business = allStudents.filter(s => s.status === "Business").length;
//   const placed = onCampus + offCampus;

//   const summaryData = [
//     { label: "Total Students", value: totalStudents },
//     { label: "Placed", value: placed },
//     { label: "On Campus", value: onCampus },
//     { label: "Off Campus", value: offCampus },
//     { label: "Higher Studies", value: higherStudies },
//     { label: "Entrepreneurship", value: entrepreneurship },
//     { label: "Business", value: business },
//   ];

//   return (
//     <>
//       <AppBar position="fixed" sx={{ backgroundColor: "#E87722", padding: "0.5rem" }}>
//         <Toolbar>
//           <ToggleButton edge="start">
//             <MenuIcon />
//           </ToggleButton>
//           <Typography
//             variant="h6"
//             sx={{ flexGrow: 1, fontWeight: "bold", fontFamily: "'Segoe UI', sans-serif" }}
//           >
//             Dashboard
//           </Typography>

//           <Typography variant="body1" sx={{ mx: 2, fontWeight: 500 }}>
//             {userName}
//           </Typography>
//           <LogoutButton startIcon={<LogoutIcon />} onClick={handleLogout}>
//             Logout
//           </LogoutButton>
//         </Toolbar>
//       </AppBar>

//       <Content>
//         <Typography variant="h5" fontWeight="bold" color="#E87722" gutterBottom>
//           Batch: {batch}
//         </Typography>

//         <Grid container spacing={3} mt={1}>
//           {summaryData.map(({ label, value }) => (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={label}>
//               <SummaryCard>
//                 <CardContent>
//                   <Typography variant="h6" color="#E87722" fontWeight="bold">
//                     {value}
//                   </Typography>
//                   <Typography variant="body1">{label}</Typography>
//                 </CardContent>
//               </SummaryCard>
//             </Grid>
//           ))}
//         </Grid>
//       </Content>
//     </>
//   );
// };

// export default Dashboard;
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
import { usePlacement } from "../MainTable/MainPlacementTable";

// Styled components
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
  "&:hover": {
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

const Dashboard = ({ handleLogout }) => {
  const [userName, setUserName] = useState("User");
  const [batch, setBatch] = useState("");
  const { allStudents, fetchAllStudents } = usePlacement();

  useEffect(() => {
    fetchAllStudents();

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUserName(parsed.name || parsed.email || "User");
    }

    const storedBatchId = localStorage.getItem("selectedBatch");
    const batchLabelMap = {
      1: "2021-2025",
      2: "2022-2026",
      3: "2023-2027",
      4: "2024-2028",
    };
    if (storedBatchId) {
      setBatch(batchLabelMap[parseInt(storedBatchId)] || "Unknown Batch");
    }
  }, [fetchAllStudents]);

  const totalStudents = allStudents.length;
  const onCampus = allStudents.filter((s) => s.status === "OnCampus").length;
  const offCampus = allStudents.filter((s) => s.status === "OffCampus").length;
  const higherStudies = allStudents.filter((s) => s.status === "HigherStudies").length;
  const entrepreneurship = allStudents.filter((s) => s.status === "Entrepreneurship").length;
  const business = allStudents.filter((s) => s.status === "Business").length;
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
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: "bold", fontFamily: "'Segoe UI', sans-serif" }}
          >
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
          Batch: {batch}
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
