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

// import axios from "axios";
// import React, { createContext, useContext, useEffect, useState } from "react";

// const PlacementContext = createContext();

// export const PlacementProvider = ({ children }) => {
//   const [students, setStudents] = useState([]);
//   const [department, setDepartment] = useState("");
//   const [filter, setFilter] = useState("default");

//   // ✅ Auto-refetch when department or filter changes
//   useEffect(() => {
//     if (department) {
//       fetchStudentsByDepartment(department, filter);
//     }
//   }, [department, filter]);

//   const fetchStudentsByDepartment = async (dept, selectedFilter = "default") => {
//     if (!dept) return;

//     try {
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

//   // ✅ Triggers useEffect to auto-fetch
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

// import axios from "axios";
// import React, { createContext, useContext, useEffect, useState } from "react";

// const PlacementContext = createContext();

// export const PlacementProvider = ({ children }) => {
//   const [students, setStudents] = useState([]);         // department-wise
//   const [allStudents, setAllStudents] = useState([]);   // all students
//   const [department, setDepartment] = useState("");
//   const [filter, setFilter] = useState("default");

//   // Auto-fetch department students
//   useEffect(() => {
//     if (department) {
//       fetchStudentsByDepartment(department, filter);
//     }
//   }, [department, filter]);

//   // 🔶 Fetch all students (for dashboard, offcampus, etc.)
//   const fetchAllStudents = async () => {
//     try {
//       const response = await axios.get("http://localhost:5001/students/");
//       console.log("✅ All students fetched:", response.data);
//       setAllStudents(response.data || []);
//     } catch (error) {
//       console.error("❌ Failed to fetch all students:", error);
//       setAllStudents([]);
//     }
//   };

//   // 🔶 Fetch students by department + optional filter
//   const fetchStudentsByDepartment = async (dept, selectedFilter = "default") => {
//     if (!dept) return;

//     try {
//       const response = await axios.get("http://localhost:5001/students/department", {
//         params: {
//           dept,
//           filter: selectedFilter !== "default" ? selectedFilter : undefined,
//         },
//       });

//       console.log("✅ Department students fetched:", response.data);
//       setStudents(response.data || []);
//     } catch (error) {
//       console.error("❌ Failed to fetch department students:", error);
//       setStudents([]);
//     }
//   };

//   // 🔶 Add student (to backend + context state)
//   const addStudent = async (student) => {
//     try {
//       const response = await axios.post("http://localhost:5001/students/", student);
//       const savedStudent = response.data;
//       await fetchAllStudents();
//       // Update both lists
//       setAllStudents(prev => [...prev, savedStudent]);
//       if (savedStudent.department?.toLowerCase() === department?.toLowerCase()) {
//         setStudents(prev => [...prev, savedStudent]);
//       }

//       return savedStudent;
//     } catch (error) {
//       console.error("❌ Failed to add student:", error.response?.data || error.message);
//       throw error;
//     }
//   };

//   // 🔶 Update offers
//   const updateStudentOffers = async (regNo, newOffer) => {
//     const student = allStudents.find((s) => s.regNo === regNo);
//     if (!student) return;

//     const updatedOffers = [...(student.offers || []), newOffer];
//     const payload = { ...student, offers: updatedOffers };

//     try {
//       const response = await axios.put("http://localhost:5001/students/", payload);
//       console.log("✅ Offers updated:", response.data);

//       setAllStudents(prev =>
//         prev.map(s => s.regNo === regNo ? { ...s, offers: updatedOffers } : s)
//       );

//       // Also update department state if applicable
//       if (student.department?.toLowerCase() === department?.toLowerCase()) {
//         setStudents(prev =>
//           prev.map(s => s.regNo === regNo ? { ...s, offers: updatedOffers } : s)
//         );
//       }
//     } catch (error) {
//       console.error("❌ Failed to update offers:", error.response?.data || error.message);
//     }
//   };

//   // 🔶 Handle placement filter (placed/unplaced/etc)
//   const handleFilterChange = (newFilter) => {
//     setFilter(newFilter);
//   };

//   return (
//     <PlacementContext.Provider
//       value={{
//         // scoped to current department
//         students,
//         setStudents,
//         department,
//         setDepartment,
//         filter,
//         setFilter: handleFilterChange,
//         fetchStudentsByDepartment,

//         // global
//         allStudents,
//         fetchAllStudents,
//         addStudent,
//         updateStudentOffers,
//       }}
//     >
//       {children}
//     </PlacementContext.Provider>
//   );
// };

// export const usePlacement = () => useContext(PlacementContext);






import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance"; // use the instance with token attached

const PlacementContext = createContext();

export const PlacementProvider = ({ children }) => {
  const [students, setStudents] = useState([]);         // department-wise
  const [allStudents, setAllStudents] = useState([]);   // all students
  const [department, setDepartment] = useState("");
  const [filter, setFilter] = useState("default");

  // Auto-fetch department students
  useEffect(() => {
    if (department) {
      fetchStudentsByDepartment(department, filter);
    }
  }, [department, filter]);

  // 🔶 Fetch all students (for dashboard, offcampus, etc.)
  const fetchAllStudents = async () => {
    try {
      const response = await axiosInstance.get("/students/");
      console.log("✅ All students fetched:", response.data);
      setAllStudents(response.data || []);
    } catch (error) {
      console.error("❌ Failed to fetch all students:", error);
      setAllStudents([]);
    }
  };

  // 🔶 Fetch students by department + optional filter
  const fetchStudentsByDepartment = async (dept, selectedFilter = "default") => {
    if (!dept) return;

    try {
      const response = await axiosInstance.get("/students/department", {
        params: {
          dept,
          filter: selectedFilter !== "default" ? selectedFilter : undefined,
        },
      });

      console.log("✅ Department students fetched:", response.data);
      setStudents(response.data || []);
    } catch (error) {
      console.error("❌ Failed to fetch department students:", error);
      setStudents([]);
    }
  };

  // 🔶 Add student (to backend + context state)
  const addStudent = async (student) => {
    try {
      const response = await axiosInstance.post("/students/", student);
      const savedStudent = response.data;
      await fetchAllStudents();

      // Update both lists
      setAllStudents(prev => [...prev, savedStudent]);
      if (savedStudent.department?.toLowerCase() === department?.toLowerCase()) {
        setStudents(prev => [...prev, savedStudent]);
      }

      return savedStudent;
    } catch (error) {
      console.error("❌ Failed to add student:", error.response?.data || error.message);
      throw error;
    }
  };

  // 🔶 Update offers
  const updateStudentOffers = async (regNo, newOffer) => {
    const student = allStudents.find((s) => s.regNo === regNo);
    if (!student) return;

    const updatedOffers = [...(student.offers || []), newOffer];
    const payload = { ...student, offers: updatedOffers };

    try {
      const response = await axiosInstance.put("/students/", payload);
      console.log("✅ Offers updated:", response.data);

      setAllStudents(prev =>
        prev.map(s => s.regNo === regNo ? { ...s, offers: updatedOffers } : s)
      );

      // Also update department state if applicable
      if (student.department?.toLowerCase() === department?.toLowerCase()) {
        setStudents(prev =>
          prev.map(s => s.regNo === regNo ? { ...s, offers: updatedOffers } : s)
        );
      }
    } catch (error) {
      console.error("❌ Failed to update offers:", error.response?.data || error.message);
    }
  };

  // 🔶 Handle placement filter (placed/unplaced/etc)
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <PlacementContext.Provider
      value={{
        // scoped to current department
        students,
        setStudents,
        department,
        setDepartment,
        filter,
        setFilter: handleFilterChange,
        fetchStudentsByDepartment,

        // global
        allStudents,
        fetchAllStudents,
        addStudent,
        updateStudentOffers,
      }}
    >
      {children}
    </PlacementContext.Provider>
  );
};

export const usePlacement = () => useContext(PlacementContext);
