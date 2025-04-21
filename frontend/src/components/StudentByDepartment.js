// StudentsByDepartment.js
import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePlacement } from "../MainTable/MainPlacementTable";
import PlacementTable from "./PlacementTable";

const StudentsByDepartment = () => {
  const { department } = useParams();
  const { students, fetchStudentsByDepartment } = usePlacement();

  useEffect(() => {
    if (department) {
      fetchStudentsByDepartment(department.toUpperCase());
    }
  }, [department, fetchStudentsByDepartment]);

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        {department.toUpperCase()} Department Students
      </Typography>
      {students.length === 0 ? (
        <CircularProgress />
      ) : (
        <PlacementTable studentData={students} />
      )}
    </Box>
  );
};

export default StudentsByDepartment;


