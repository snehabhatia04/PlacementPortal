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
  const placed = filtered.filter((s) => s.offers && s.offers.length > 0).length;
  const unplaced = total - placed;

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
              <TableCell sx={{ fontWeight: "bold" }}>Placed Students</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Unplaced Students</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{total}</TableCell>
              <TableCell>{placed}</TableCell>
              <TableCell>{unplaced}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default BranchSummary;