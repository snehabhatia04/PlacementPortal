import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";

const Content = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
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
  width: "240px",
  marginLeft: theme.spacing(2),
  backgroundColor: "#fff2e6",
}));

const ToggleButton = styled(IconButton)(({ theme }) => ({
  color: "white",
}));

const SummaryCard = styled(Card)({
  backgroundColor: "#fff6ed",
  borderRadius: "16px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  minWidth: 160,
});

const Dashboard = ({ user = "User", handleLogout, batch = "2021-2025" }) => {
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#E87722", padding: "0.5rem" }}>
  <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

    {/* Centered Search Bar */}
    <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
      <SearchBar>
        <SearchIcon />
        <InputBase placeholder="Search…" sx={{ ml: 1, flex: 1 }} />
      </SearchBar>
    </Box>

    {/* Right-side Icons and User Info */}
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton sx={{ color: "white" }}>
        <NotificationsNoneIcon />
      </IconButton>

      <Typography variant="body1" sx={{ mx: 2, fontWeight: 600, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
  229301245 :: {user.toUpperCase()}
</Typography>


      <LogoutButton startIcon={<LogoutIcon />} onClick={handleLogout}>
        Logout
      </LogoutButton>
    </Box>

  </Toolbar>
</AppBar>


      {/* Page Content */}
      <Content>
        <Typography variant="h5" fontWeight="bold" color="#E87722" gutterBottom>
          Batch: {batch}
        </Typography>

        <Grid container spacing={3} mt={1}>
          {[
            { label: "Total Students", value: 120 },
            { label: "Placed", value: 85 },
            { label: "On Campus", value: 60 },
            { label: "Off Campus", value: 25 },
            { label: "Higher Studies", value: 15 },
            { label: "Entrepreneurship", value: 5 },
            { label: "Business", value: 3 },
          ].map(({ label, value }) => (
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

