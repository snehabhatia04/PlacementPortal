import React from "react";
import { useParams } from "react-router-dom";
import PlacementTable from "./PlacementTable";

// you can also pull student data from a backend or context
const studentData = [
  {
    regNo: "229301245",
    name: "Maahi Joshi",
    department: "CSE",
    email: "john@example.com",
    offers: [{ company: "Google", stipend: "", i: false, ppoI: false, ppo: false }],
  },
  {
    regNo: "22931",
    name: "Jane Smith",
    department: "CSE",
    email: "jane@example.com",
    offers: [{ company: "Microsoft", stipend: "", i: false, ppoI: false, ppo: false }],
  },
  {
    regNo: "2021CSE003",
    name: "Mike Johnson",
    department: "IT",
    email: "mike@example.com",
    offers: [{ company: "Amazon", stipend: "", i: false, ppoI: false, ppo: false }],
  },
];

const FilteredPlacementPage = () => {
  const { branch } = useParams();

  const filteredStudents =
    branch === "All" ? studentData : studentData.filter((student) => student.department === branch);

  return (
    <div style={{ marginLeft: "240px", padding: "20px" }}>
      <h2>{branch} Students</h2>
      <PlacementTable studentData={filteredStudents} />
    </div>
  );
};

export default FilteredPlacementPage;
