import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePlacement } from "../MainTable/MainPlacementTable";
import PlacementTable from "./PlacementTable";

const StudentsByDepartment = () => {
  const { department } = useParams();
  const { students, fetchStudentsByDepartment } = usePlacement();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (department) {
        setLoading(true);
        await fetchStudentsByDepartment(department.toUpperCase());
        setLoading(false);
      }
    };
    fetch();
  }, [department]);

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        {department?.toUpperCase()} Department Students
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <PlacementTable studentData={students} />
      )}
    </Box>
  );
};

export default StudentsByDepartment;
