// import {
//     Box,
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableRow,
//     Typography,
// } from "@mui/material";
// import React from "react";
// import { useParams } from "react-router-dom";
// import { usePlacement } from "../MainTable/MainPlacementTable";

// const BranchSummary = () => {
//   const { branch } = useParams();
//   const { students } = usePlacement();

//   const filtered = students.filter((s) =>
//     branch === "all" ? true : s.department?.toLowerCase() === branch.toLowerCase()
//   );

//   const total = filtered.length;
//   const placed = filtered.filter((s) => s.offers && s.offers.length > 0).length;
//   const unplaced = total - placed;

//   return (
//     <Box sx={{ padding: 4 }}>
//       <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
//         {branch.toUpperCase()} Placement Summary
//       </Typography>

//       <Paper sx={{ width: "fit-content", mx: "auto" }}>
//         <Table>
//           <TableHead>
//             <TableRow sx={{ backgroundColor: "#ec7000" }}>
//               <TableCell sx={{ fontWeight: "bold" }}>Total Students</TableCell>
//               <TableCell sx={{ fontWeight: "bold" }}>Placed Students</TableCell>
//               <TableCell sx={{ fontWeight: "bold" }}>Unplaced Students</TableCell>
//               <TableCell sx={{ fontWeight: "bold" }}>OffCampus</TableCell>
//               <TableCell sx={{ fontWeight: "bold" }}>HigherStudies</TableCell>
//               <TableCell sx={{ fontWeight: "bold" }}>Business/Entrepreneurship</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             <TableRow>
//               <TableCell>{total}</TableCell>
//               <TableCell>{placed}</TableCell>
//               <TableCell>{unplaced}</TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </Paper>
//     </Box>
//   );
// };

// export default BranchSummary;
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { usePlacement } from "../MainTable/MainPlacementTable";

const BranchSummary = () => {
  const { branch } = useParams();
  const { students } = usePlacement();

  const filtered = students.filter((s) =>
    branch === "all" ? true : s.department?.toLowerCase() === branch.toLowerCase()
  );

  const total = filtered.length;
  const placed = filtered.filter((s) => s.status === "Placed").length;
  const unplaced = filtered.filter((s) => s.status === "Not Placed").length;
  const offCampus = filtered.filter((s) =>
    s.offcampus === true || s.status?.toLowerCase().includes("off")
  ).length;
  const higherStudies = filtered.filter((s) =>
    s.status === "Higher Study"
  ).length;
  const business = filtered.filter((s) =>
    s.status === "Entrepreneur/Family Business"
  ).length;

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
        {branch.toUpperCase()} Placement Summary
      </Typography>

      <Paper sx={{ width: "fit-content", mx: "auto" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#ec7000" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Total Students</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Placed</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Unplaced</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Off Campus</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Higher Studies</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Business/Entrepreneurship</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{total}</TableCell>
              <TableCell>{placed}</TableCell>
              <TableCell>{unplaced}</TableCell>
              <TableCell>{offCampus}</TableCell>
              <TableCell>{higherStudies}</TableCell>
              <TableCell>{business}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default BranchSummary;
