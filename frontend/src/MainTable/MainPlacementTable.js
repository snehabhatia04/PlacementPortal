// import axios from "axios";
// import React, { createContext, useContext, useState } from "react";

// const PlacementContext = createContext();

// export const PlacementProvider = ({ children }) => {
//   const [students, setStudents] = useState([]);

//   // Fetch students by department
//   const fetchStudentsByDepartment = async (department) => {
//     try {
//       const response = await axios.get("http://localhost:5001/students/department", {
//         params: { dept: department },
//       });
//       console.log("Students fetched:", response.data);
//       setStudents(response.data || []);
//     } catch (error) {
//       console.error("Failed to fetch students by department:", error);
//       setStudents([]);
//     }
//   };

//   // Update student offers (frontend + backend)
//   const updateStudentOffers = async (regNo, newOffer) => {
//     const updatedStudent = students.find((s) => s.regNo === regNo);
//     if (!updatedStudent) {
//       console.warn(`Student not found for regNo: ${regNo}`);
//       return;
//     }

//     const updatedOffers = [...(updatedStudent.offers || []), newOffer];

//     const studentPayload = {
//       ...updatedStudent,
//       offers: updatedOffers, // ensure it's an array
//     };

//     try {
//       const response = await axios.put("http://localhost:5001/students/", studentPayload);
//       console.log("Offers updated on backend:", response.data);

//       // Update local state
//       setStudents((prev) =>
//         prev.map((s) =>
//           s.regNo === regNo ? { ...s, offers: updatedOffers } : s
//         )
//       );
//     } catch (error) {
//       console.error("Failed to update offers:", error.response?.data || error.message);
//     }
//   };

//   return (
//     <PlacementContext.Provider
//       value={{
//         students,
//         setStudents,
//         fetchStudentsByDepartment,
//         updateStudentOffers,
//       }}
//     >
//       {children}
//     </PlacementContext.Provider>
//   );
// };

// export const usePlacement = () => useContext(PlacementContext);

// import axios from "axios";
// import React, { createContext, useContext, useEffect, useState } from "react";

// const PlacementContext = createContext();

// export const PlacementProvider = ({ children }) => {
//   const [students, setStudents] = useState([]);
//   const [department, setDepartment] = useState(""); // 👈 dynamic department state

//   const fetchStudentsByDepartment = async (dept) => {
//     if (!dept) return;

//     try {
//       const response = await axios.get("http://localhost:5001/students/department", {
//         params: { dept },
//       });
//       console.log("✅ Students fetched:", response.data);
//       setStudents(response.data || []);
//     } catch (error) {
//       console.error("❌ Failed to fetch students by department:", error);
//       setStudents([]);
//     }
//   };

//   // ⛔ Only fetch when department is set (avoids infinite loop)
//   useEffect(() => {
//     fetchStudentsByDepartment(department);
//   }, [department]);

//   const updateStudentOffers = async (regNo, newOffer) => {
//     const updatedStudent = students.find((s) => s.regNo === regNo);
//     if (!updatedStudent) {
//       console.warn(`Student not found for regNo: ${regNo}`);
//       return;
//     }

//     const updatedOffers = [...(updatedStudent.offers || []), newOffer];

//     const studentPayload = {
//       ...updatedStudent,
//       offers: updatedOffers,
//     };

//     try {
//       const response = await axios.put("http://localhost:5001/students/", studentPayload);
//       console.log("✅ Offers updated on backend:", response.data);

//       setStudents((prev) =>
//         prev.map((s) =>
//           s.regNo === regNo ? { ...s, offers: updatedOffers } : s
//         )
//       );
//     } catch (error) {
//       console.error("❌ Failed to update offers:", error.response?.data || error.message);
//     }
//   };

//   return (
//     <PlacementContext.Provider
//       value={{
//         students,
//         setStudents,
//         fetchStudentsByDepartment,
//         updateStudentOffers,
//         department,
//         setDepartment, // 👈 expose so other components can set it
//       }}
//     >
//       {children}
//     </PlacementContext.Provider>
//   );
// };

// export const usePlacement = () => useContext(PlacementContext);



// import axios from "axios";
// import React, { createContext, useContext, useEffect, useState } from "react";

// const PlacementContext = createContext();

// export const PlacementProvider = ({ children }) => {
//   const [students, setStudents] = useState([]);
//   const [department, setDepartment] = useState(""); // no default

//   // ✅ Now this is available both inside and outside useEffect
//   const fetchStudentsByDepartment = async (dept = department) => {
//     if (!dept) return;

//     try {
//       const response = await axios.get("http://localhost:5001/students/department", {
//         params: { dept },
//       });
//       console.log("✅ Students fetched:", response.data);
//       setStudents(response.data || []);
//     } catch (error) {
//       console.error("❌ Failed to fetch students by department:", error);
//       setStudents([]);
//     }
//   };

//   // Automatically fetch when department changes
//   useEffect(() => {
//     fetchStudentsByDepartment();
//   }, [department]);

//   const updateStudentOffers = async (regNo, newOffer) => {
//     const student = students.find((s) => s.regNo === regNo);
//     if (!student) return;

//     const updatedOffers = [...(student.offers || []), newOffer];
//     const payload = { ...student, offers: updatedOffers };

//     try {
//       const response = await axios.put("http://localhost:5001/students/", payload);
//       console.log("✅ Offers updated:", response.data);
//       setStudents((prev) =>
//         prev.map((s) =>
//           s.regNo === regNo ? { ...s, offers: updatedOffers } : s
//         )
//       );
//     } catch (error) {
//       console.error("❌ Failed to update offers:", error.response?.data || error.message);
//     }
//   };

//   return (
//     <PlacementContext.Provider
//       value={{
//         students,
//         setStudents,
//         department,
//         setDepartment,
//         fetchStudentsByDepartment, // ✅ now available
//         updateStudentOffers,
//       }}
//     >
//       {children}
//     </PlacementContext.Provider>
//   );
// };

// export const usePlacement = () => useContext(PlacementContext);




// import axios from "axios";
// import React, { createContext, useContext, useEffect, useState } from "react";

// const PlacementContext = createContext();

// export const PlacementProvider = ({ children, initialDepartment = "" }) => {
//   const [students, setStudents] = useState([]);
//   const [department, setDepartment] = useState(initialDepartment);
//   const [filter, setFilter] = useState("default");

//   // ✅ Fetch students by department + optional filter
//   const fetchStudentsByDepartment = async (dept = department, customFilter = filter) => {
//     if (!dept) return;

//     try {
//       const response = await axios.get("http://localhost:5001/students/department", {
//         params: {
//           dept,
//           filter: customFilter !== "default" ? customFilter : undefined,
//         },
//       });
//       console.log("✅ Students fetched:", response.data);
//       setStudents(response.data || []);
//     } catch (error) {
//       console.error("❌ Failed to fetch students by department:", error);
//       setStudents([]);
//     }
//   };

//   // Automatically fetch when department or filter changes
//   useEffect(() => {
//     fetchStudentsByDepartment();
//   }, [department, filter]);

//   const updateStudentOffers = async (regNo, newOffer) => {
//     const student = students.find((s) => s.regNo === regNo);
//     if (!student) return;

//     const updatedOffers = [...(student.offers || []), newOffer];
//     const payload = { ...student, offers: updatedOffers };

//     try {
//       const response = await axios.put("http://localhost:5001/students/", payload);
//       console.log("✅ Offers updated:", response.data);
//       setStudents((prev) =>
//         prev.map((s) =>
//           s.regNo === regNo ? { ...s, offers: updatedOffers } : s
//         )
//       );
//     } catch (error) {
//       console.error("❌ Failed to update offers:", error.response?.data || error.message);
//     }
//   };

//   return (
//     <PlacementContext.Provider
//       value={{
//         students,
//         setStudents,
//         department,
//         setDepartment,
//         filter,
//         setFilter,
//         fetchStudentsByDepartment,
//         updateStudentOffers,
//       }}
//     >
//       {children}
//     </PlacementContext.Provider>
//   );
// };

// export const usePlacement = () => useContext(PlacementContext);


// import axios from "axios";
// import React, { createContext, useContext, useEffect, useState } from "react";

// const PlacementContext = createContext();

// export const PlacementProvider = ({ children, initialDepartment = "" }) => {
//   const [students, setStudents] = useState([]);
//   const [department, setDepartment] = useState(initialDepartment);
//   const [filter, setFilter] = useState("default");

//   // ✅ Unified function to fetch with department and filter
//   const fetchStudentsByDepartment = async (dept = department, selectedFilter = filter) => {
//     if (!dept) return;

//     try {
//       const response = await axios.get("http://localhost:5001/students/department", {
//         params: {
//           dept,
//           filter: selectedFilter !== "default" ? selectedFilter : undefined,
//         },
//       });
//       console.log("✅ Students fetched:", response.data);
//       setStudents(response.data || []);
//     } catch (error) {
//       console.error("❌ Failed to fetch students by department:", error);
//       setStudents([]);
//     }
//   };

//   // 🔁 Auto-fetch when department or filter changes
//   useEffect(() => {
//     if (department) {
//       fetchStudentsByDepartment(department, filter);
//     }
//   }, [department, filter]);

//   // ✅ Set filter and trigger refetch automatically
//   const handleFilterChange = (newFilter) => {
//     setFilter(newFilter);
//   };

//   const updateStudentOffers = async (regNo, newOffer) => {
//     const student = students.find((s) => s.regNo === regNo);
//     if (!student) return;

//     const updatedOffers = [...(student.offers || []), newOffer];
//     const payload = { ...student, offers: updatedOffers };

//     try {
//       const response = await axios.put("http://localhost:5001/students/", payload);
//       console.log("✅ Offers updated:", response.data);
//       setStudents((prev) =>
//         prev.map((s) =>
//           s.regNo === regNo ? { ...s, offers: updatedOffers } : s
//         )
//       );
//     } catch (error) {
//       console.error("❌ Failed to update offers:", error.response?.data || error.message);
//     }
//   };

//   return (
//     <PlacementContext.Provider
//       value={{
//         students,
//         setStudents,
//         department,
//         setDepartment,
//         filter,
//         setFilter: handleFilterChange,
//         fetchStudentsByDepartment,
//         updateStudentOffers,
//       }}
//     >
//       {children}
//     </PlacementContext.Provider>
//   );
// };

// export const usePlacement = () => useContext(PlacementContext);

// import axios from "axios";
// import React, { createContext, useContext, useState } from "react";

// const PlacementContext = createContext();

// export const PlacementProvider = ({ children }) => {
//   const [students, setStudents] = useState([]);
//   const [department, setDepartment] = useState("");
//   const [filter, setFilter] = useState("default");

//   const fetchStudentsByDepartment = async (dept, selectedFilter = "default") => {
//     if (!dept) return;

//     try {
//       setDepartment(dept); // ✅
//       setFilter(selectedFilter); // ✅

//       const response = await axios.get("http://localhost:5001/students/department", {
//         params: {
//           dept,
//           filter: selectedFilter !== "default" ? selectedFilter : undefined,
//         },
//       });

//       console.log("✅ Students fetched:", response.data);
//       setStudents(response.data || []);
//     } catch (error) {
//       console.error("❌ Failed to fetch students by department:", error);
//       setStudents([]);
//     }
//   };

//   const handleFilterChange = (newFilter) => {
//     setFilter(newFilter);
//   };

//   const updateStudentOffers = async (regNo, newOffer) => {
//     const student = students.find((s) => s.regNo === regNo);
//     if (!student) return;

//     const updatedOffers = [...(student.offers || []), newOffer];
//     const payload = { ...student, offers: updatedOffers };

//     try {
//       const response = await axios.put("http://localhost:5001/students/", payload);
//       console.log("✅ Offers updated:", response.data);
//       setStudents((prev) =>
//         prev.map((s) =>
//           s.regNo === regNo ? { ...s, offers: updatedOffers } : s
//         )
//       );
//     } catch (error) {
//       console.error("❌ Failed to update offers:", error.response?.data || error.message);
//     }
//   };

//   return (
//     <PlacementContext.Provider
//       value={{
//         students,
//         setStudents,
//         department,
//         setDepartment,
//         filter,
//         setFilter: handleFilterChange,
//         fetchStudentsByDepartment,
//         updateStudentOffers,
//       }}
//     >
//       {children}
//     </PlacementContext.Provider>
//   );
// };

// export const usePlacement = () => useContext(PlacementContext);

import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const PlacementContext = createContext();

export const PlacementProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [department, setDepartment] = useState("");
  const [filter, setFilter] = useState("default");

  // ✅ Auto-refetch when department or filter changes
  useEffect(() => {
    if (department) {
      fetchStudentsByDepartment(department, filter);
    }
  }, [department, filter]);

  const fetchStudentsByDepartment = async (dept, selectedFilter = "default") => {
    if (!dept) return;

    try {
      const response = await axios.get("http://localhost:5001/students/department", {
        params: {
          dept,
          filter: selectedFilter !== "default" ? selectedFilter : undefined,
        },
      });

      console.log("✅ Students fetched:", response.data);
      setStudents(response.data || []);
    } catch (error) {
      console.error("❌ Failed to fetch students by department:", error);
      setStudents([]);
    }
  };

  // ✅ Triggers useEffect to auto-fetch
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const updateStudentOffers = async (regNo, newOffer) => {
    const student = students.find((s) => s.regNo === regNo);
    if (!student) return;

    const updatedOffers = [...(student.offers || []), newOffer];
    const payload = { ...student, offers: updatedOffers };

    try {
      const response = await axios.put("http://localhost:5001/students/", payload);
      console.log("✅ Offers updated:", response.data);
      setStudents((prev) =>
        prev.map((s) =>
          s.regNo === regNo ? { ...s, offers: updatedOffers } : s
        )
      );
    } catch (error) {
      console.error("❌ Failed to update offers:", error.response?.data || error.message);
    }
  };

  return (
    <PlacementContext.Provider
      value={{
        students,
        setStudents,
        department,
        setDepartment,
        filter,
        setFilter: handleFilterChange,
        fetchStudentsByDepartment,
        updateStudentOffers,
      }}
    >
      {children}
    </PlacementContext.Provider>
  );
};

export const usePlacement = () => useContext(PlacementContext);
