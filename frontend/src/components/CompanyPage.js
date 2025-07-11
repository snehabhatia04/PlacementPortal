// import {
//   Alert,
//   Box, Button,
//   Checkbox,
//   CircularProgress,
//   Dialog, DialogActions, DialogContent, DialogTitle,
//   FormControlLabel,
//   TextField, Typography
// } from "@mui/material";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { usePlacement } from "../MainTable/MainPlacementTable";
// import PlacementTable from "./PlacementTable";
// import { hasPermission, getCurrentUser } from "../utils/permissions";


// const CompanyPage = () => {
//   const { companyName } = useParams();
//   const [openDialog, setOpenDialog] = useState(false);
//   const [error, setError] = useState(null);

//   const [newStudent, setNewStudent] = useState({
//     reg_no: "",
//     student_name: "",
//     email: "",
//     stipend: "",
//     department: "",
//     ppo: false,
//     ppo_i: false,
//     i: false,
//   });

//   const {
//     allStudents,
//     fetchAllStudents,
//     addStudent
//   } = usePlacement();

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const load = async () => {
//       setLoading(true);
//       try {
//         await fetchAllStudents();
//       } catch (err) {
//         console.error("Error fetching students:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, [companyName]);

//   const companyStudents = allStudents.filter((student) =>
//     (student.offers || []).some(
//       (offer) => offer.company?.toLowerCase() === companyName.toLowerCase()
//     )
//   );

//   const handleDialogClose = () => {
//     setOpenDialog(false);
//     setNewStudent({
//       reg_no: "",
//       student_name: "",
//       email: "",
//       stipend: "",
//       department: "",
//       ppo: false,
//       ppo_i: false,
//       i: false,
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewStudent((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCheckboxChange = (e) => {
//     const { name, checked } = e.target;
//     setNewStudent((prev) => ({ ...prev, [name]: checked }));
//   };

//   const handleAddStudent = async () => {
//     if (!newStudent.reg_no || !newStudent.student_name || !newStudent.email) {
//       alert("Please fill in all required fields.");
//       return;
//     }

//     const payload = {
//       regNo: newStudent.reg_no,
//       name: newStudent.student_name,
//       email: newStudent.email,
//       department: newStudent.department,
//       status: "OnCampus",
//       offers: [
//         {
//           company: companyName,
//           offer_type: newStudent.ppo
//             ? "PPO"
//             : newStudent.ppo_i
//             ? "PPO + I"
//             : newStudent.i
//             ? "I"
//             : "",
//           stipend: parseFloat(newStudent.stipend),
//           internship: newStudent.i,
//           package: "",
//         },
//       ],
//     };

//     try {
//       await addStudent(payload);
//       handleDialogClose();
//     } catch (err) {
//       console.error("❌ Error adding student:", err);
//       setError("Failed to add student. Please try again.");
//     }
//   };

//   return (
//     <Box sx={{ padding: "2rem" }}>
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
//         <PlacementTable studentData={companyStudents} companyView={companyName} />
//       )}

//       <Button
//         variant="contained"
//         color="primary"
//         sx={{ marginTop: "1.5rem" }}
//         onClick={() => setOpenDialog(true)}
//       >
//         Add Student
//       </Button>

//       <Dialog open={openDialog} onClose={handleDialogClose}>
//         <DialogTitle>Add New Student</DialogTitle>
//         <DialogContent>
//           {["reg_no", "student_name", "email", "department", "stipend"].map((field) => (
//             <TextField
//               key={field}
//               label={field.replace("_", " ").toUpperCase()}
//               variant="outlined"
//               fullWidth
//               value={newStudent[field]}
//               name={field}
//               onChange={handleInputChange}
//               sx={{ marginBottom: "1rem" }}
//             />
//           ))}
//           {["ppo", "ppo_i", "i"].map((flag) => (
//             <FormControlLabel
//               key={flag}
//               control={
//                 <Checkbox
//                   checked={newStudent[flag]}
//                   onChange={handleCheckboxChange}
//                   name={flag}
//                 />
//               }
//               label={flag.toUpperCase()}
//             />
//           ))}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleDialogClose}>Cancel</Button>
//           <Button variant="contained" onClick={handleAddStudent}>
//             Add
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default CompanyPage;

// import {
//   Alert,
//   Box, Button,
//   Checkbox,
//   CircularProgress,
//   Dialog, DialogActions, DialogContent, DialogTitle,
//   FormControlLabel,
//   TextField, Typography
// } from "@mui/material";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { usePlacement } from "../MainTable/MainPlacementTable";
// import PlacementTable from "./PlacementTable";
// import { hasPermission, getCurrentUser } from "../utils/permissions";


// const CompanyPage = () => {
//   const { companyName } = useParams();
//   const [openDialog, setOpenDialog] = useState(false);
//   const [error, setError] = useState(null);

//   const [newStudent, setNewStudent] = useState({
//     reg_no: "",
//     student_name: "",
//     email: "",
//     stipend: "",
//     department: "",
//     ppo: false,
//     ppo_i: false,
//     i: false,
//   });

//   const {
//     allStudents,
//     fetchAllStudents,
//     addStudent
//   } = usePlacement();

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const load = async () => {
//       setLoading(true);
//       try {
//         await fetchAllStudents();
//       } catch (err) {
//         console.error("Error fetching students:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, [companyName]);

//   const companyStudents = allStudents.filter((student) =>
//     (student.offers || []).some(
//       (offer) => offer.company?.toLowerCase() === companyName.toLowerCase()
//     )
//   );

//   const handleDialogClose = () => {
//     setOpenDialog(false);
//     setNewStudent({
//       reg_no: "",
//       student_name: "",
//       email: "",
//       stipend: "",
//       department: "",
//       ppo: false,
//       ppo_i: false,
//       i: false,
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewStudent((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCheckboxChange = (e) => {
//     const { name, checked } = e.target;
//     setNewStudent((prev) => ({ ...prev, [name]: checked }));
//   };

//   const handleAddStudent = async () => {
//     if (!newStudent.reg_no || !newStudent.student_name || !newStudent.email) {
//       alert("Please fill in all required fields.");
//       return;
//     }

//     const payload = {
//       regNo: newStudent.reg_no,
//       name: newStudent.student_name,
//       email: newStudent.email,
//       department: newStudent.department,
//       status: "OnCampus",
//       offers: [
//         {
//           company: companyName,
//           offer_type: newStudent.ppo
//             ? "PPO"
//             : newStudent.ppo_i
//             ? "PPO + I"
//             : newStudent.i
//             ? "I"
//             : "",
//           stipend: parseFloat(newStudent.stipend),
//           internship: newStudent.i,
//           package: "",
//         },
//       ],
//     };

//     try {
//       await addStudent(payload);
//       handleDialogClose();
//     } catch (err) {
//       console.error("❌ Error adding student:", err);
//       setError("Failed to add student. Please try again.");
//     }
//   };

//   return (
//     <Box sx={{ padding: "2rem" }}>
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
//         <PlacementTable studentData={companyStudents} companyView={companyName} />
//       )}

//       <Button
//         variant="contained"
//         color="primary"
//         sx={{ marginTop: "1.5rem" }}
//         onClick={() => setOpenDialog(true)}
//       >
//         Add Student
//       </Button>

//       <Dialog open={openDialog} onClose={handleDialogClose}>
//         <DialogTitle>Add New Student</DialogTitle>
//         <DialogContent>
//           {["reg_no", "student_name", "email", "department", "stipend"].map((field) => (
//             <TextField
//               key={field}
//               label={field.replace("_", " ").toUpperCase()}
//               variant="outlined"
//               fullWidth
//               value={newStudent[field]}
//               name={field}
//               onChange={handleInputChange}
//               sx={{ marginBottom: "1rem" }}
//             />
//           ))}
//           {["ppo", "ppo_i", "i"].map((flag) => (
//             <FormControlLabel
//               key={flag}
//               control={
//                 <Checkbox
//                   checked={newStudent[flag]}
//                   onChange={handleCheckboxChange}
//                   name={flag}
//                 />
//               }
//               label={flag.toUpperCase()}
//             />
//           ))}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleDialogClose}>Cancel</Button>
//           <Button variant="contained" onClick={handleAddStudent}>
//             Add
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default CompanyPage;
import {
  Alert,
  Box, Button,
  Checkbox,
  CircularProgress,
  Dialog, DialogActions, DialogContent, DialogTitle,
  FormControlLabel,
  TextField, Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePlacement } from "../MainTable/MainPlacementTable";
import PlacementTable from "./PlacementTable";
import { hasPermission, getCurrentUser } from "../utils/permissions";

const CompanyPage = () => {
  const { companyName } = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState(null);

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

  const {
    allStudents,
    fetchAllStudents,
    addStudent
  } = usePlacement();

  const [loading, setLoading] = useState(true);

  const user = getCurrentUser();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        await fetchAllStudents();
      } catch (err) {
        console.error("Error fetching students:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [companyName]);

  let visibleStudents = [];
  const companyStudents = allStudents.filter((student) =>
    (student.offers || []).some(
      (offer) => offer.company?.toLowerCase() === companyName.toLowerCase()
    )
  );

  if (hasPermission("view_companywise_students")) {
    visibleStudents = companyStudents;
  } else if (hasPermission("view_companywise_students_own_dept", user.department)) {
    visibleStudents = companyStudents.filter(s => s.department === user.department);
  }

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
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setNewStudent((prev) => ({ ...prev, [name]: checked }));
  };

  const handleAddStudent = async () => {
    if (!newStudent.reg_no || !newStudent.student_name || !newStudent.email) {
      alert("Please fill in all required fields.");
      return;
    }

    const payload = {
      regNo: newStudent.reg_no,
      name: newStudent.student_name,
      email: newStudent.email,
      department: newStudent.department,
      status: "OnCampus",
      offers: [
        {
          company: companyName,
          offer_type: newStudent.ppo
            ? "PPO"
            : newStudent.ppo_i
            ? "PPO + I"
            : newStudent.i
            ? "I"
            : "",
          stipend: parseFloat(newStudent.stipend),
          internship: newStudent.i,
          package: "",
        },
      ],
    };

    try {
      await addStudent(payload);
      handleDialogClose();
    } catch (err) {
      console.error("❌ Error adding student:", err);
      setError("Failed to add student. Please try again.");
    }
  };

  return (
    <Box sx={{ padding: "2rem" }}>
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
        <PlacementTable studentData={visibleStudents} companyView={companyName} />
      )}

      {hasPermission("manage_company_students", user.department) && (
        <>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: "1.5rem" }}
            onClick={() => setOpenDialog(true)}
          >
            Add Student
          </Button>

          <Dialog open={openDialog} onClose={handleDialogClose}>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogContent>
              {["reg_no", "student_name", "email", "department", "stipend"].map((field) => (
                <TextField
                  key={field}
                  label={field.replace("_", " ").toUpperCase()}
                  variant="outlined"
                  fullWidth
                  value={newStudent[field]}
                  name={field}
                  onChange={handleInputChange}
                  sx={{ marginBottom: "1rem" }}
                />
              ))}
              {["ppo", "ppo_i", "i"].map((flag) => (
                <FormControlLabel
                  key={flag}
                  control={
                    <Checkbox
                      checked={newStudent[flag]}
                      onChange={handleCheckboxChange}
                      name={flag}
                    />
                  }
                  label={flag.toUpperCase()}
                />
              ))}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Cancel</Button>
              <Button variant="contained" onClick={handleAddStudent}>
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  );
};

export default CompanyPage;
