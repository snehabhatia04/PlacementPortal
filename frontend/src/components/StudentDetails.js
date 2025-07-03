// import {
//   Box,
//   CircularProgress,
//   Divider,
//   List,
//   ListItem,
//   ListItemText,
//   Paper,
//   Typography,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { usePlacement } from "../MainTable/MainPlacementTable"; // ✅ Correct path
// import PlacementTable from "./PlacementTable";

// const branches = ["CSE", "AIML", "IT", "IoT", "CCE", "Data Science", "All"];

// const StudentDetails = () => {
//   const { students, fetchStudentsByDepartment } = usePlacement();
//   const [selectedBranch, setSelectedBranch] = useState("All");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const loadData = async () => {
//       setLoading(true);
//       if (selectedBranch === "All") {
//         await fetchStudentsByDepartment(""); // "" or "All" to get all
//       } else {
//         await fetchStudentsByDepartment(selectedBranch);
//       }
//       setLoading(false);
//     };
//     loadData();
//   }, [selectedBranch]);

//   return (
//     <Box sx={{ flexGrow: 1, padding: 3 }}>
//       <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
//         Student Details
//       </Typography>

//       <Paper sx={{ padding: 2, mb: 3 }}>
//         <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
//           View by Branch
//         </Typography>
//         <List sx={{ display: "flex", flexWrap: "wrap" }}>
//           {branches.map((branch) => (
//             <ListItem
//               button
//               key={branch}
//               onClick={() => setSelectedBranch(branch)}
//               sx={{
//                 width: "auto",
//                 px: 2,
//                 borderRadius: 2,
//                 backgroundColor: selectedBranch === branch ? "#ec7000" : "inherit",
//                 color: selectedBranch === branch ? "white" : "inherit",
//                 mr: 1,
//               }}
//             >
//               <ListItemText primary={branch} />
//             </ListItem>
//           ))}
//         </List>
//       </Paper>

//       <Divider sx={{ mb: 3 }} />

//       <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
//         {selectedBranch === "All" ? "All" : selectedBranch.toUpperCase()} Department Student Placement Offers
//       </Typography>

//       {loading ? <CircularProgress /> : <PlacementTable studentData={students} />}
//     </Box>
//   );
// };

// export default StudentDetails;

// import {
//   Box,
//   Divider,
//   List,
//   ListItem,
//   ListItemText,
//   Paper,
//   Typography,
// } from "@mui/material";
// import React from "react";
// import { Link } from "react-router-dom";

// const branches = ["CSE", "AIML", "IT", "IoT", "CCE", "Data Science", "All"];

// const StudentDetails = () => {
//   return (
//     <Box sx={{ flexGrow: 1, padding: 3 }}>
//       <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
//         Student Details
//       </Typography>

//       <Paper sx={{ padding: 2, mb: 3 }}>
//         <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
//           View by Branch
//         </Typography>
//         <List sx={{ display: "flex", flexWrap: "wrap" }}>
//           {branches.map((branch) => (
//             <ListItem
//               button
//               key={branch}
//               component={Link}
//               to={`/students/${branch.toLowerCase()}`}
//               sx={{
//                 width: "auto",
//                 px: 2,
//                 borderRadius: 2,
//                 backgroundColor: "#f5f5f5",
//                 mr: 1,
//                 mb: 1,
//               }}
//             >
//               <ListItemText primary={branch} />
//             </ListItem>
//           ))}
//         </List>
//       </Paper>

//       <Divider sx={{ mb: 3 }} />

//       <Typography variant="body1">
//         Select a branch above to view students in that department.
//       </Typography>
//     </Box>
//   );
// };

// export default StudentDetails;




// import {
//   Box,
//   CircularProgress,
//   Divider,
//   List,
//   ListItem,
//   ListItemText,
//   Paper,
//   Typography,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { usePlacement } from "../MainTable/MainPlacementTable";
// import PlacementTable from "./PlacementTable";

// // const branches = ["CSE", "AIML", "IT", "IoT", "CCE", "Data Science", "All"];

// const StudentDetails = () => {
//   const { students, fetchStudentsByDepartment } = usePlacement();
//   const [selectedBranch, setSelectedBranch] = useState("All");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const loadData = async () => {
//       setLoading(true);
//       const branch = selectedBranch === "All" ? "" : selectedBranch;
//       await fetchStudentsByDepartment(branch);
//       setLoading(false);
//     };
//     loadData();
//   }, [selectedBranch, fetchStudentsByDepartment]);

//   return (
//     <Box sx={{ flexGrow: 1, padding: 3 }}>
//       <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
//         Student Details
//       </Typography>
// {/* 
//       <Paper sx={{ padding: 2, mb: 3 }}>
//         <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
//           View by Branch
//         </Typography>
//         <List sx={{ display: "flex", flexWrap: "wrap" }}>
//           {branches.map((branch) => (
//             <ListItem
//               button
//               key={branch}
//               onClick={() => setSelectedBranch(branch)}
//               sx={{
//                 width: "auto",
//                 px: 2,
//                 borderRadius: 2,
//                 backgroundColor: selectedBranch === branch ? "#ec7000" : "inherit",
//                 color: selectedBranch === branch ? "white" : "inherit",
//                 mr: 1,
//               }}
//             >
//               <ListItemText primary={branch} />
//             </ListItem>
//           ))}
//         </List>
//       </Paper> */}

//       <Divider sx={{ mb: 3 }} />
// {/* 
//       <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
//         {selectedBranch === "All"
//           ? "All Students"
//           : `${selectedBranch.toUpperCase()} Department`} Placement Offers
//       </Typography> */}

//       {loading ? <CircularProgress /> : <PlacementTable studentData={students} />}
//     </Box>
//   );
// };

// export default StudentDetails;

// import {
//   Box,
//   CircularProgress,
//   Divider,
//   Typography,
// } from "@mui/material";
// import React, { useState, useEffect } from "react";
// import PlacementTable from "./PlacementTable";

// const dummyStudents = [
//   {
//     reg_no: "CSE1001",
//     name: "Alice Johnson",
//     department: "CSE",
//     email: "alice@example.com",
//     status: "OnCampus",
//     offers: [
//       {
//         company: "Infosys",
//         ppo: false,
//         ppoI: false,
//         i: true,
//         stipend: 20000,
//         package: 6.5,
//       },
//       {
//         company: "Wipro",
//         ppo: true,
//         ppoI: false,
//         i: false,
//         stipend: 0,
//         package: 7.2,
//       },
//       {
//         company: "TCS",
//         ppo: false,
//         ppoI: true,
//         i: true,
//         stipend: 18000,
//         package: 6,
//       },
//     ],
//   },
//   {
//     reg_no: "CSE1002",
//     name: "Bob Smith",
//     department: "CSE",
//     email: "bob@example.com",
//     status: "OffCampus",
//     offers: [
//       {
//         company: "Google",
//         ppo: true,
//         ppoI: false,
//         i: false,
//         stipend: 0,
//         package: 25,
//       },
//     ],
//   },
//   {
//     reg_no: "CSE1003",
//     name: "Charlie Brown",
//     department: "CSE",
//     email: "charlie@example.com",
//     status: "Entrepreneurship or Business",
//     firm_name: "CodeCraft Ltd.",
//     firm_reg_no: "REG123456",
//     gst_no: "GSTIN7890XYZ",
//     role_in_firm: "Founder & CEO",
//     offers: [],
//   },
//   {
//     reg_no: "CSE1004",
//     name: "Diana Prince",
//     department: "CSE",
//     email: "diana@example.com",
//     status: "HigherStudies",
//     higher_study_college: "Stanford University",
//     higher_study_degree: "MS in Computer Science",
//     higher_study_country: "USA",
//     offers: [],
//   },
// ];

// const StudentDetails = () => {
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     const timer = setTimeout(() => setLoading(false), 500);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <Box sx={{ flexGrow: 1, padding: 3 }}>
//       <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
//         Student Details
//       </Typography>
//       <Divider sx={{ mb: 3 }} />

//       {loading ? (
//         <CircularProgress />
//       ) : (
//         <PlacementTable studentData={dummyStudents} />
//       )}
//     </Box>
//   );
// };

// export default StudentDetails;

import {
  Box,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import PlacementTable from "./PlacementTable";
import { useParams } from "react-router-dom";


const StudentDetails = () => {
   const { branch } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500); // simulate short load
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Student Details {branch ? `- ${branch.toUpperCase()}` : ""}
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {loading ? (
        <CircularProgress />
      ) : (
        <PlacementTable /> // ← no dummy props passed
      )}
    </Box>
  );
};

export default StudentDetails;
