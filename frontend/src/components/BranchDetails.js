// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Box, Typography } from "@mui/material";
// import PlacementTable from "./PlacementTable";
// import { usePlacement } from "../MainTable/MainPlacementTable"; // Adjust if needed

// const BranchDetails = () => {
//   const { branch } = useParams();
//   const { students } = usePlacement(); // ✅ Only inside the component
//   const [filteredStudents, setFilteredStudents] = useState([]);

//   useEffect(() => {
//     if (!students || students.length === 0) {
//       setFilteredStudents([]);
//       return;
//     }

//     if (branch.toLowerCase() === "all") {
//       setFilteredStudents(students);
//     } else {
//       setFilteredStudents(
//         students.filter(
//           (s) => s.department?.toLowerCase() === branch.toLowerCase()
//         )
//       );
//     }
//   }, [branch, students]);

//   return (
//     <Box sx={{ flexGrow: 1, padding: 3}}>
//       <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
//         {branch} - Student Details
//       </Typography>

//       {Array.isArray(filteredStudents) && filteredStudents.length > 0 ? (
//         <PlacementTable studentData={filteredStudents} />
//       ) : (
//         <Typography>No students found for {branch}</Typography>
//       )}
//     </Box>
//   );
// };

// export default BranchDetails;


// import { Box, Button, Typography } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { usePlacement } from "../MainTable/MainPlacementTable"; // Adjust if needed
// import PlacementTable from "./PlacementTable";

// const BranchDetails = () => {
//   const { branch } = useParams();
//   const { students } = usePlacement(); // ✅ Only inside the component
//   const [filteredStudents, setFilteredStudents] = useState([]);

//   useEffect(() => {
//     if (!students || students.length === 0) {
//       setFilteredStudents([]);
//       return;
//     }

//     if (branch.toLowerCase() === "all") {
//       setFilteredStudents(students);
//     } else {
//       setFilteredStudents(
//         students.filter(
//           (s) => s.department?.toLowerCase() === branch.toLowerCase()
//         )
//       );
//     }
//   }, [branch, students]);

//   return (
//     <Box sx={{ flexGrow: 1, padding: 3 }}>
//       <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
//         {branch} - Student Details
//       </Typography>

//       {/* 🔶 View Summary Button for the Current Branch */}
//       <Button
//         variant="contained"
//         component={Link}
//         to={`/summary/${branch.toLowerCase()}`}
//         sx={{ backgroundColor: "#ec7000", color: "#fff", mb: 2 }}
//       >
//         View {branch} Summary
//       </Button>

//       {Array.isArray(filteredStudents) && filteredStudents.length > 0 ? (
//         <PlacementTable studentData={filteredStudents} />
//       ) : (
//         <Typography>No students found for {branch}</Typography>
//       )}
//     </Box>
//   );
// };

// export default BranchDetails;



// import { Box, Button, Typography } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { usePlacement } from "../MainTable/MainPlacementTable";
// import PlacementTable from "./PlacementTable";

// const BranchDetails = () => {
//   const { branch } = useParams();
//   const { students, fetchStudentsByDepartment } = usePlacement();
//   const [filteredStudents, setFilteredStudents] = useState([]);

//   // ✅ Fetch students for this branch when branch changes
//   useEffect(() => {
//     if (branch && branch.toLowerCase() !== "all") {
//       fetchStudentsByDepartment(branch.toUpperCase());
//     }
//   }, [branch]);

//   // ✅ Filter logic based on updated students
//   useEffect(() => {
//     if (!students || students.length === 0) {
//       setFilteredStudents([]);
//       return;
//     }

//     if (branch.toLowerCase() === "all") {
//       setFilteredStudents(students);
//     } else {
//       setFilteredStudents(
//         students.filter(
//           (s) => s.department?.toLowerCase() === branch.toLowerCase()
//         )
//       );
//     }
//   }, [branch, students]);

//   return (
//     <Box sx={{ flexGrow: 1, padding: 3 }}>
//       <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
//         {branch.toUpperCase()} - Student Details
//       </Typography>

//       <Button
//         variant="contained"
//         component={Link}
//         to={`/summary/${branch.toLowerCase()}`}
//         sx={{ backgroundColor: "#ec7000", color: "#fff", mb: 2 }}
//       >
//         View {branch.toUpperCase()} Summary
//       </Button>

//       {filteredStudents.length > 0 ? (
//         <PlacementTable studentData={filteredStudents} />
//       ) : (
//         <Typography>No students found for {branch.toUpperCase()}</Typography>
//       )}
//     </Box>
//   );
// };

// export default BranchDetails;


import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { usePlacement } from "../MainTable/MainPlacementTable";
import PlacementTable from "./PlacementTable";

const BranchDetails = () => {
  const { branch } = useParams();
  const { students, fetchStudentsByDepartment } = usePlacement();
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filter, setFilter] = useState("default");

  // Fetch based on department & filter
  // useEffect(() => {
  //   if (branch && branch.toLowerCase() !== "all") {
  //     fetchStudentsByDepartment(branch.toUpperCase(), filter);
  //   }
  // }, [branch, filter]);
  useEffect(() => {
    if (branch) {
      fetchStudentsByDepartment(branch.toUpperCase(), filter);
    }
  }, [branch, filter]);

  useEffect(() => {
    if (!students || students.length === 0) {
      setFilteredStudents([]);
      return;
    }

    if (branch.toLowerCase() === "all") {
      setFilteredStudents(students);
    } else {
      setFilteredStudents(
        students.filter(
          (s) => s.department?.toLowerCase() === branch.toLowerCase()
        )
      );
    }
  }, [branch, students]);

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        {branch.toUpperCase()} - Student Details
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Button
          variant="contained"
          component={Link}
          to={`/summary/${branch.toLowerCase()}`}
          sx={{ backgroundColor: "#ec7000", color: "#fff" }}
        >
          View {branch.toUpperCase()} Summary
        </Button>

        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Filter</InputLabel>
          <Select
            value={filter}
            label="Filter"
            onChange={(e) => setFilter(e.target.value)}
          >
            <MenuItem value="default">Default</MenuItem>
            <MenuItem value="stipend">Stipend High to Low</MenuItem>
            <MenuItem value="placed">Placed Students</MenuItem>
            <MenuItem value="notPlaced">Not placed Students</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {filteredStudents.length > 0 ? (
        <PlacementTable studentData={filteredStudents} />
      ) : (
        <Typography>No students found for {branch.toUpperCase()}</Typography>
      )}
    </Box>
  );
};

export default BranchDetails;
