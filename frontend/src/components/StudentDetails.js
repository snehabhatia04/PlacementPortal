import {
  Box,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlacementTable from "./PlacementTable";

const StudentDetails = () => {
  const { branch } = useParams();
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5001/students/", {
        headers: {
          Authorization: `Bearer ${token}`,  // attach token
        },
      });

      console.log("Fetched students:", res.data);

      const data = res.data;
      const filteredStudents = branch
        ? data.filter(
            (student) =>
              student.department.toLowerCase() === branch.toLowerCase()
          )
        : data;

      setStudents(filteredStudents);
    } catch (err) {
      console.error("Failed to fetch students:", err);
      setStudents([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, [branch]);

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Student Details {branch ? `- ${branch.toUpperCase()}` : ""}
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {loading ? (
        <CircularProgress />
      ) : (
        <PlacementTable studentData={students} />
      )}
    </Box>
  );
};

export default StudentDetails;
