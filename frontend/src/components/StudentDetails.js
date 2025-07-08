import { Box, CircularProgress, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BranchDetails from "./BranchDetails"; // ✅ Import it
import PlacementTable from "./PlacementTable"; // or replace with OverviewTable

const StudentDetails = () => {
  const { branch } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [branch]); // re-run if branch changes

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Student Details {branch ? `- ${branch.toUpperCase()}` : ""}
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {loading ? (
        <CircularProgress />
      ) : branch ? (
        <BranchDetails />
      ) : (
        <PlacementTable />
      )}
    </Box>
  );
};

export default StudentDetails;
