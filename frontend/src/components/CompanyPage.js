// import {
//   Alert,
//   Box,
//   Button,
//   Checkbox,
//   CircularProgress,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   FormControlLabel,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
// } from "@mui/material";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const CompanyPage = () => {
//   const { companyName } = useParams();
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [openDialog, setOpenDialog] = useState(false);
//   const [newStudent, setNewStudent] = useState({
//     reg_no: "",
//     student_name: "",
//     email: "",
//     stipend: "",
//     ppo: false,
//     ppo_i: false,
//     i: false,
//   });

//   useEffect(() => {
//     console.log("🧠 Fetching data for:", companyName);
//     if (!companyName) return;

//     setLoading(true);
//     setError(null);

//     axios
//       .get(`http://localhost:5002/companies/${companyName}/students`)
//       .then((response) => {
//         if (Array.isArray(response.data)) {
//           setStudents(response.data);
//         } else {
//           setStudents([]);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching students:", error);
//         setError("Failed to fetch students. Please try again later.");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [companyName]);

//   const handleAddStudentClick = () => {
//     setOpenDialog(true);
//   };

//   const handleDialogClose = () => {
//     setOpenDialog(false);
//     setNewStudent({
//       reg_no: "",
//       student_name: "",
//       email: "",
//       stipend: "",
//       ppo: false,
//       ppo_i: false,
//       i: false,
//     });
//     console.log("Dialog closed, newStudent reset:", newStudent);  // Debugging the reset
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewStudent((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleCheckboxChange = (e) => {
//     const { name, checked } = e.target;
//     setNewStudent((prev) => ({
//       ...prev,
//       [name]: checked,
//     }));
//   };

//   const handleAddStudent = () => {
//     const normalizedCompanyName = companyName.toLowerCase();
  
//     if (!newStudent.reg_no || !newStudent.student_name || !newStudent.email) {
//       alert("Please fill in all required fields.");
//       return;
//     }
  
//     const payload = {
//       students: [
//         {
//           reg_no: newStudent.reg_no,
//           student_name: newStudent.student_name,
//           email: newStudent.email,
//           stipend: Number(newStudent.stipend), // 👈 convert to number like Postman
//           ppo: newStudent.ppo,
//           ppo_i: newStudent.ppo_i,
//           i: newStudent.i,
//         },
//       ],
//     };
  
//     console.log("🚀 Sending payload to backend:", payload);
  
//     axios
//       .post(`http://localhost:5002/companies/${normalizedCompanyName}/students`, payload)
//       .then(() => {
//         return axios.get(`http://localhost:5002/companies/${normalizedCompanyName}/students`);
//       })
//       .then((res) => {
//         setStudents(res.data);
//         handleDialogClose();
//       })
//       .catch((error) => {
//         console.error("❌ Error adding student:", error.response?.data || error.message);
//         setError("Failed to add student. Please try again.");
//       });
//   };


//   const handleDeleteStudent = (studentId) => {
//     axios
//       .delete(`http://localhost:5002/companies/${companyName}/students`, {
//         data: [studentId],
//       })
//       .then((response) => {
//         alert("Student deleted successfully!");
//         setStudents(students.filter((student) => student.id !== studentId)); // Remove from UI
//       })
//       .catch((error) => {
//         console.error("Error deleting student:", error);
//         setError("Failed to delete student. Please try again.");
//       });
//   };

//   // Debugging: Log the student list every time it changes
//   useEffect(() => {
//     console.log("Updated students list:", students);
//   }, [students]);

//   return (
//     <div style={{ padding: "2rem" }}>
//       <Typography variant="h5" sx={{ color: "#E87722", marginBottom: "1rem" }}>
//         {companyName?.toUpperCase() || "Company"} Placement Details
//       </Typography>

//       {error && (
//         <Alert severity="error" sx={{ marginBottom: "1rem" }}>
//           {error}
//         </Alert>
//       )}

//       {loading ? (
//         <Box display="flex" justifyContent="center" mt={4}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <div>
//           <Button
//             variant="contained"
//             color="primary"
//             sx={{ marginBottom: "1rem" }}
//             onClick={handleAddStudentClick}
//           >
//             Add Student
//           </Button>

//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead sx={{ backgroundColor: "#E87722" }}>
//                 <TableRow>
//                   <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                     Reg No
//                   </TableCell>
//                   <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                     Name
//                   </TableCell>
//                   <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                     Email
//                   </TableCell>
//                   <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                     Stipend
//                   </TableCell>
//                   <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                     PPO
//                   </TableCell>
//                   <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                     PPO + I
//                   </TableCell>
//                   <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                     I
//                   </TableCell>
//                   <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                     Actions
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {students.length > 0 ? (
//                   students.map((student, index) => (
//                     <TableRow key={index}>
//                       <TableCell>{student.reg_no}</TableCell>
//                       <TableCell>{student.student_name}</TableCell>
//                       <TableCell>{student.email}</TableCell>
//                       <TableCell>{student.stipend}</TableCell>
//                       <TableCell>{student.ppo ? "Yes" : "No"}</TableCell>
//                       <TableCell>{student.ppo_i ? "Yes" : "No"}</TableCell>
//                       <TableCell>{student.i ? "Yes" : "No"}</TableCell>
//                       <TableCell>
//                         <Button
//                           variant="outlined"
//                           color="error"
//                           onClick={() => handleDeleteStudent(student.id)}
//                         >
//                           Delete
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={8} align="center">
//                       No students found for {companyName}
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </div>
//       )}

//       {/* Add Student Dialog */}
//       <Dialog open={openDialog} onClose={handleDialogClose}>
//         <DialogTitle>Add New Student</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Reg No"
//             variant="outlined"
//             fullWidth
//             value={newStudent.reg_no}
//             name="reg_no"
//             onChange={handleInputChange}
//             sx={{ marginBottom: "1rem" }}
//           />
//           <TextField
//             label="Name"
//             variant="outlined"
//             fullWidth
//             value={newStudent.student_name}
//             name="student_name"
//             onChange={handleInputChange}
//             sx={{ marginBottom: "1rem" }}
//           />
//           <TextField
//             label="Email"
//             variant="outlined"
//             fullWidth
//             value={newStudent.email}
//             name="email"
//             onChange={handleInputChange}
//             sx={{ marginBottom: "1rem" }}
//           />
//           <TextField
//             label="Stipend"
//             variant="outlined"
//             fullWidth
//             value={newStudent.stipend}
//             name="stipend"
//             onChange={handleInputChange}
//             sx={{ marginBottom: "1rem" }}
//           />
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={newStudent.ppo}
//                 onChange={handleCheckboxChange}
//                 name="ppo"
//               />
//             }
//             label="PPO"
//           />
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={newStudent.ppo_i}
//                 onChange={handleCheckboxChange}
//                 name="ppo_i"
//               />
//             }
//             label="PPO + I"
//           />
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={newStudent.i}
//                 onChange={handleCheckboxChange}
//                 name="i"
//               />
//             }
//             label="I"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleDialogClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleAddStudent} color="primary">
//             Add
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default CompanyPage;

import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CompanyPage = () => {
  const { companyName } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [newStudent, setNewStudent] = useState({
    reg_no: "",
    student_name: "",
    email: "",
    stipend: "",
    department: "",
    ppo: false,
    ppo_i: false,
    i: false,
  });

  useEffect(() => {
    console.log("🧠 Fetching data for:", companyName);
    if (!companyName) return;

    setLoading(true);
    setError(null);

    axios
      .get(`http://localhost:5002/companies/${companyName}/students`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setStudents(response.data);
        } else {
          setStudents([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
        setError("Failed to fetch students. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [companyName]);

  const handleAddStudentClick = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setNewStudent({
      reg_no: "",
      student_name: "",
      email: "",
      stipend: "",
      department: "",
      ppo: false,
      ppo_i: false,
      i: false,
    });
    console.log("Dialog closed, newStudent reset:", newStudent);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setNewStudent((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleAddStudent = () => {
    const normalizedCompanyName = companyName.toLowerCase();

    if (!newStudent.reg_no || !newStudent.student_name || !newStudent.email) {
      alert("Please fill in all required fields.");
      return;
    }

    const payload = {
      students: [
        {
          reg_no: newStudent.reg_no,
          student_name: newStudent.student_name,
          email: newStudent.email,
          stipend: Number(newStudent.stipend),
          department: newStudent.department,
          ppo: newStudent.ppo,
          ppo_i: newStudent.ppo_i,
          i: newStudent.i,
        },
      ],
    };

    console.log("🚀 Sending payload to backend:", payload);

    axios
      .post(`http://localhost:5002/companies/${normalizedCompanyName}/students`, payload)
      .then(() => {
        return axios.get(`http://localhost:5002/companies/${normalizedCompanyName}/students`);
      })
      .then((res) => {
        setStudents(res.data);
        handleDialogClose();
      })
      .catch((error) => {
        console.error("❌ Error adding student:", error.response?.data || error.message);
        setError("Failed to add student. Please try again.");
      });
  };

  const handleDeleteStudent = (studentId) => {
    axios
      .delete(`http://localhost:5002/companies/${companyName}/students`, {
        data: [studentId],
      })
      .then(() => {
        alert("Student deleted successfully!");
        setStudents(students.filter((student) => student.id !== studentId));
      })
      .catch((error) => {
        console.error("Error deleting student:", error);
        setError("Failed to delete student. Please try again.");
      });
  };

  useEffect(() => {
    console.log("Updated students list:", students);
  }, [students]);

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h5" sx={{ color: "#E87722", marginBottom: "1rem" }}>
        {companyName?.toUpperCase() || "Company"} Placement Details
      </Typography>

      {error && (
        <Alert severity="error" sx={{ marginBottom: "1rem" }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <div>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginBottom: "1rem" }}
            onClick={handleAddStudentClick}
          >
            Add Student
          </Button>

          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: "#E87722" }}>
                <TableRow>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Reg No
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Name
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Email
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Department
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Stipend
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    PPO
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    PPO + I
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    I
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.length > 0 ? (
                  students.map((student, index) => (
                    <TableRow key={index}>
                      <TableCell>{student.reg_no}</TableCell>
                      <TableCell>{student.student_name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.department}</TableCell>
                      <TableCell>{student.stipend}</TableCell>
                      <TableCell>{student.ppo ? "Yes" : "No"}</TableCell>
                      <TableCell>{student.ppo_i ? "Yes" : "No"}</TableCell>
                      <TableCell>{student.i ? "Yes" : "No"}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDeleteStudent(student.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} align="center">
                      No students found for {companyName}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Add New Student</DialogTitle>
        <DialogContent>
          <TextField
            label="Reg No"
            variant="outlined"
            fullWidth
            value={newStudent.reg_no}
            name="reg_no"
            onChange={handleInputChange}
            sx={{ marginBottom: "1rem" }}
          />
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={newStudent.student_name}
            name="student_name"
            onChange={handleInputChange}
            sx={{ marginBottom: "1rem" }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={newStudent.email}
            name="email"
            onChange={handleInputChange}
            sx={{ marginBottom: "1rem" }}
          />
          <TextField
            label="Department"
            variant="outlined"
            fullWidth
            value={newStudent.department}
            name="department"
            onChange={handleInputChange}
            sx={{ marginBottom: "1rem" }}
          />
          <TextField
            label="Stipend"
            variant="outlined"
            fullWidth
            value={newStudent.stipend}
            name="stipend"
            onChange={handleInputChange}
            sx={{ marginBottom: "1rem" }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={newStudent.ppo}
                onChange={handleCheckboxChange}
                name="ppo"
              />
            }
            label="PPO"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={newStudent.ppo_i}
                onChange={handleCheckboxChange}
                name="ppo_i"
              />
            }
            label="PPO + I"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={newStudent.i}
                onChange={handleCheckboxChange}
                name="i"
              />
            }
            label="I"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddStudent} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CompanyPage;
