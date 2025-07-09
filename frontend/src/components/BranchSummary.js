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
import { useParams } from "react-router-dom";
import { usePlacement } from "../MainTable/MainPlacementTable";

const BranchSummary = () => {
  const { branch } = useParams();
  const { students } = usePlacement();

  // Filter students by department
  const filtered = students.filter((s) =>
    branch === "all" ? true : s.department?.toLowerCase() === branch.toLowerCase()
  );

  const total = filtered.length;

  // Categorizing based on placement records (s.placements array)
  const placed = filtered.filter(
  (s) => s.placements?.some((p) => p.placement_status === "Placed")
).length;

const unplaced = filtered.filter(
  (s) =>
    !s.placements || // no placements at all
    !s.placements.some((p) => p.placement_status === "Placed") // no placed status
).length;

  const higherStudies = filtered.filter(
    (s) => s.placements?.some((p) => p.placement_status === "Higher Study")
  ).length;

  const entrepreneur = filtered.filter(
    (s) =>
      s.placements?.some(
        (p) =>
          p.placement_status === "Entrepreneur" ||
          p.placement_status === "Family Business"
      )
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
              <TableCell sx={{ fontWeight: "bold" }}>Higher Studies</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Entrepreneur/Family Business</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Unplaced</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{total}</TableCell>
              <TableCell>{placed}</TableCell>
              <TableCell>{higherStudies}</TableCell>
              <TableCell>{entrepreneur}</TableCell>
              <TableCell>{unplaced}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default BranchSummary;
