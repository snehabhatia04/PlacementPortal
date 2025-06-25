import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const PlacementContext = createContext();

export const PlacementProvider = ({ children, initialDepartment = "" }) => {
  const [students, setStudents] = useState([]);
  const [department, setDepartment] = useState(initialDepartment);
  const [filter, setFilter] = useState("default");

  // ✅ Unified function to fetch with department and filter
  const fetchStudentsByDepartment = async (dept = department, selectedFilter = filter) => {
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

  // 🔁 Auto-fetch when department or filter changes
  useEffect(() => {
    if (department) {
      fetchStudentsByDepartment(department, filter);
    }
  }, [department, filter]);

  // ✅ Set filter and trigger refetch automatically
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
