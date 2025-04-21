import { Box, Paper, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CompanyDetails = () => {
  const [companies, setCompanies] = useState([]);

  // Fetch companies from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5002/companies")
      .then((response) => {
        setCompanies(response.data.companies); // Assuming the response has a 'companies' field
      })
      .catch((error) => {
        console.error("There was an error fetching the companies!", error);
      });
  }, []);

  return (
    <Box sx={{ flexGrow: 1, padding: 3, marginLeft: "240px" }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Company Details
      </Typography>
      {companies.length === 0 ? (
        <Typography>No companies found.</Typography>
      ) : (
        companies.map((company) => (
          <Paper key={company.name} sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="h6">
              <Link
                to={`/companies/${company.name}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                {company.name}
              </Link>
            </Typography>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default CompanyDetails;
