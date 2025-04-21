// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   TextField,
//   Checkbox,
//   FormControlLabel,
// } from "@mui/material";
// import { usePlacement } from "../MainTable/MainPlacementTable";

// const PlacementTable = ({ studentData }) => {
//   const { updateStudentOffers } = usePlacement();
//   const [students, setStudents] = useState(studentData || []);
//   const [newOffer, setNewOffer] = useState({});
//   const [showFormIndex, setShowFormIndex] = useState(null);

//   // Sync props to local state
//   useEffect(() => {
//     setStudents(studentData || []);
//   }, [studentData]);

//   const handleAddOffer = (index) => {
//     const updatedStudents = [...students];
//     const student = updatedStudents[index];

//     if (!student.offers) student.offers = [];
//     if (student.offers.length >= 3) return;

//     student.offers.push(newOffer);
//     setStudents(updatedStudents);
//     updateStudentOffers(student.regNo, student.offers); // Optional global sync

//     setShowFormIndex(null); // Close form
//     setNewOffer({}); // Reset form
//   };

//   const handleChange = (e) => {
//     const { name, value, checked, type } = e.target;
//     setNewOffer({
//       ...newOffer,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow sx={{ backgroundColor: "#ec7000" }}>
//             <TableCell sx={{ fontWeight: "bold" }}>Reg No</TableCell>
//             <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
//             <TableCell sx={{ fontWeight: "bold" }}>Department</TableCell>
//             <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
//             <TableCell sx={{ fontWeight: "bold" }}>Offers</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {students.map((student, idx) => (
//             <TableRow key={idx}>
//               <TableCell>{student.regNo}</TableCell>
//               <TableCell>{student.name}</TableCell>
//               <TableCell>{student.department}</TableCell>
//               <TableCell>{student.email}</TableCell>
//               <TableCell>
//                 {student.offers?.map((offer, i) => (
//                   <div key={i} style={{ marginBottom: "8px" }}>
//                     <strong>{offer.company}</strong>
//                     <div>Stipend: ₹{offer.stipend}</div>
//                     {offer.ppo && <div>PPO</div>}
//                     {offer.ppoI && <div>PPO + Internship</div>}
//                     {offer.i && !offer.ppoI && !offer.ppo && <div>Internship</div>}
//                   </div>
//                 ))}

//                 {showFormIndex === idx && (
//                   <div style={{ marginTop: "10px" }}>
//                     <TextField
//                       label="Company"
//                       name="company"
//                       size="small"
//                       onChange={handleChange}
//                       sx={{ mr: 1, mb: 1 }}
//                     />
//                     <TextField
//                       label="Stipend"
//                       name="stipend"
//                       size="small"
//                       type="number"
//                       onChange={handleChange}
//                       sx={{ mr: 1, mb: 1 }}
//                     />
//                     <div>
//                       <FormControlLabel
//                         control={
//                           <Checkbox name="ppo" onChange={handleChange} />
//                         }
//                         label="PPO"
//                       />
//                       <FormControlLabel
//                         control={
//                           <Checkbox name="ppoI" onChange={handleChange} />
//                         }
//                         label="PPO + Intern"
//                       />
//                       <FormControlLabel
//                         control={<Checkbox name="i" onChange={handleChange} />}
//                         label="Internship"
//                       />
//                     </div>
//                     <Button
//                       variant="contained"
//                       onClick={() => handleAddOffer(idx)}
//                       sx={{ mt: 1 }}
//                     >
//                       Save Offer
//                     </Button>
//                   </div>
//                 )}

//                 {student.offers?.length < 3 && showFormIndex !== idx && (
//                   <Button
//                     variant="outlined"
//                     size="small"
//                     onClick={() => setShowFormIndex(idx)}
//                     sx={{ mt: 1 }}
//                   >
//                     Add Offer
//                   </Button>
//                 )}
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default PlacementTable;



// import {
//   Button,
//   Checkbox,
//   FormControlLabel,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { usePlacement } from "../MainTable/MainPlacementTable";

// const PlacementTable = ({ studentData }) => {
//   const { updateStudentOffers } = usePlacement();
//   const [students, setStudents] = useState([]);
//   const [newOffer, setNewOffer] = useState({});
//   const [showFormIndex, setShowFormIndex] = useState(null);

//   useEffect(() => {
//     // Normalize the studentData and flatten fields like { String, Valid }
//     const normalize = (val) => {
//       if (typeof val === "object" && val !== null && "String" in val) {
//         return val.String;
//       }
//       return val ?? "";
//     };

//     const transformed = (studentData || []).map((s) => ({
//       regNo: normalize(s.reg_no || s.regNo),
//       name: normalize(s.name),
//       department: normalize(s.department),
//       email: normalize(s.email),
//       offers: s.offers || [],
//     }));

//     setStudents(transformed);
//   }, []);

//   const handleAddOffer = (index) => {
//     const updatedStudents = [...students];
//     const student = updatedStudents[index];
    
//     const updatedOffers = [...(student.offers || []), newOffer];
//     student.offers = updatedOffers;
    
//     setStudents(updatedStudents); // local state update
//     // updateStudentOffers(student.regNo, updatedOffers);
//     updateStudentOffers(student.regNo, newOffer);

//     setShowFormIndex(null);
//     setNewOffer({});
//   };
    
  
//   const handleChange = (e) => {
//     const { name, value, checked, type } = e.target;
//     setNewOffer({
//       ...newOffer,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow sx={{ backgroundColor: "#ec7000" }}>
//             <TableCell sx={{ fontWeight: "bold", color: "white" }}>Reg No</TableCell>
//             <TableCell sx={{ fontWeight: "bold", color: "white" }}>Name</TableCell>
//             <TableCell sx={{ fontWeight: "bold", color: "white" }}>Department</TableCell>
//             <TableCell sx={{ fontWeight: "bold", color: "white" }}>Email</TableCell>
//             <TableCell sx={{ fontWeight: "bold", color: "white" }}>Offers</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {students.map((student, idx) => (
//             <TableRow key={idx}>
//               <TableCell>{student.regNo}</TableCell>
//               <TableCell>{student.name}</TableCell>
//               <TableCell>{student.department}</TableCell>
//               <TableCell>{student.email}</TableCell>
//               <TableCell>
//                 {student.offers?.map((offer, i) => (
//                   <div key={i} style={{ marginBottom: "8px" }}>
//                     <strong>{offer.company}</strong>
//                     <div>Stipend: ₹{offer.stipend}</div>
//                     {offer.ppo && <div>PPO</div>}
//                     {offer.ppoI && <div>PPO + Internship</div>}
//                     {offer.i && !offer.ppoI && !offer.ppo && <div>Internship</div>}
//                   </div>
//                 ))}

//                 {showFormIndex === idx && (
//                   <div style={{ marginTop: "10px" }}>
//                     <TextField
//                       label="Company"
//                       name="company"
//                       size="small"
//                       onChange={handleChange}
//                       sx={{ mr: 1, mb: 1 }}
//                     />
//                     <TextField
//                       label="Stipend"
//                       name="stipend"
//                       size="small"
//                       type="number"
//                       onChange={handleChange}
//                       sx={{ mr: 1, mb: 1 }}
//                     />
//                     <div>
//                       <FormControlLabel
//                         control={<Checkbox name="ppo" onChange={handleChange} />}
//                         label="PPO"
//                       />
//                       <FormControlLabel
//                         control={<Checkbox name="ppoI" onChange={handleChange} />}
//                         label="PPO + Intern"
//                       />
//                       <FormControlLabel
//                         control={<Checkbox name="i" onChange={handleChange} />}
//                         label="Internship"
//                       />
//                     </div>
//                     <Button
//                       variant="contained"
//                       onClick={() => handleAddOffer(idx)}
//                       sx={{ mt: 1 }}
//                     >
//                       Save Offer
//                     </Button>
//                   </div>
//                 )}

//                 {student.offers?.length < 3 && showFormIndex !== idx && (
//                   <Button
//                     variant="outlined"
//                     size="small"
//                     onClick={() => setShowFormIndex(idx)}
//                     sx={{ mt: 1 }}
//                   >
//                     Add Offer
//                   </Button>
//                 )}
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default PlacementTable;



import {
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { usePlacement } from "../MainTable/MainPlacementTable";

const PlacementTable = ({ studentData }) => {
  const { updateStudentOffers } = usePlacement();
  const [students, setStudents] = useState([]);
  const [newOffer, setNewOffer] = useState({});
  const [showFormIndex, setShowFormIndex] = useState(null);

  useEffect(() => {
    const normalize = (val) => {
      if (typeof val === "object" && val !== null && "String" in val) {
        return val.String;
      }
      return val ?? "";
    };

    const transformed = (studentData || []).map((s) => ({
      regNo: normalize(s.reg_no || s.regNo),
      name: normalize(s.name),
      department: normalize(s.department),
      email: normalize(s.email),
      offers: s.offers || [],
    }));

    setStudents(transformed);
  }, [studentData]);

  const handleAddOffer = (index) => {
    const updatedStudents = [...students];
    const student = updatedStudents[index];

    const offer = {
      company: newOffer.company?.trim() || "",
      stipend: parseFloat(newOffer.stipend || 0),
      ppo: !!newOffer.ppo,
      ppoI: !!newOffer.ppoI,
      i: !!newOffer.i,
    };

    if (!offer.company) {
      alert("Company name is required.");
      return;
    }

    student.offers = [...(student.offers || []), offer];

    setStudents(updatedStudents); // Update UI
    updateStudentOffers(student.regNo, offer); // Push to backend

    setShowFormIndex(null); // Close form
    setNewOffer({});
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setNewOffer((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#ec7000" }}>
            <TableCell sx={{ fontWeight: "bold", color: "white" }}>Reg No</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "white" }}>Name</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "white" }}>Department</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "white" }}>Email</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "white" }}>Offers</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student, idx) => (
            <TableRow key={idx}>
              <TableCell>{student.regNo}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.department}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>
                {student.offers?.map((offer, i) => (
                  <div key={i} style={{ marginBottom: "8px" }}>
                    <strong>{offer.company}</strong>
                    <div>Stipend: ₹{offer.stipend}</div>
                    {offer.ppoI && <div>PPO + Internship</div>}
                    {!offer.ppoI && offer.ppo && <div>PPO</div>}
                    {!offer.ppoI && !offer.ppo && offer.i && <div>Internship</div>}
                  </div>
                ))}

                {showFormIndex === idx && (
                  <div style={{ marginTop: "10px" }}>
                    <TextField
                      label="Company"
                      name="company"
                      size="small"
                      value={newOffer.company || ""}
                      onChange={handleChange}
                      sx={{ mr: 1, mb: 1 }}
                    />
                    <TextField
                      label="Stipend"
                      name="stipend"
                      size="small"
                      type="number"
                      value={newOffer.stipend || ""}
                      onChange={handleChange}
                      sx={{ mr: 1, mb: 1 }}
                    />
                    <div>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="ppo"
                            checked={!!newOffer.ppo}
                            onChange={handleChange}
                          />
                        }
                        label="PPO"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="ppoI"
                            checked={!!newOffer.ppoI}
                            onChange={handleChange}
                          />
                        }
                        label="PPO + Intern"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="i"
                            checked={!!newOffer.i}
                            onChange={handleChange}
                          />
                        }
                        label="Internship"
                      />
                    </div>
                    <Button
                      variant="contained"
                      onClick={() => handleAddOffer(idx)}
                      sx={{ mt: 1 }}
                    >
                      Save Offer
                    </Button>
                  </div>
                )}

                {student.offers?.length < 3 && showFormIndex !== idx && (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setShowFormIndex(idx)}
                    sx={{ mt: 1 }}
                  >
                    Add Offer
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlacementTable;