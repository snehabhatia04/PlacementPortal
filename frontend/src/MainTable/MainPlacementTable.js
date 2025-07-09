import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const PlacementContext = createContext();

export const PlacementProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [department, setDepartment] = useState("");
  const [filter, setFilter] = useState("default");

  useEffect(() => {
    if (department) {
      fetchStudentsByDepartment(department, filter);
    }
  }, [department, filter]);

  const mapStudentCompaniesToOffers = (students) => {
    return students.map((student) => ({
      ...student,
      placement_status: student.placement_status,
      offers: (student.companies || []).map((c) => ({
        company: c.company_name,
        offer_type: c.ppo ? "PPO" : c.ppo_i ? "PPO+I" : c.i ? "I" : "-",
        stipend: c.stipend,
        internship: c.i ? "Yes" : "No",
        package: c.package,
      })),
    }));
  };

  const fetchAllStudents = async () => {
    try {
      const response = await axiosInstance.get("/students/");
      const mapped = mapStudentCompaniesToOffers(response.data || []);
      console.log("✅ All students fetched:", mapped);
      setAllStudents(mapped);
    } catch (error) {
      console.error("❌ Failed to fetch all students:", error);
      setAllStudents([]);
    }
  };

  const fetchStudentsByDepartment = async (dept, selectedFilter = "default") => {
  if (!dept) return;

  const sessionID = localStorage.getItem("selectedBatch"); // or your key for session_id
  if (!sessionID) {
    console.error("No session ID found in localStorage.");
    return;
  }

  try {
    const response = await axiosInstance.get("/students/department", {
      params: {
        dept,
        filter: selectedFilter !== "default" ? selectedFilter : undefined,
        session_id: sessionID,
      },
    });


      const mapped = mapStudentCompaniesToOffers(response.data || []);
      console.log("✅ Department students fetched:", mapped);
      setStudents(mapped);
    } catch (error) {
      console.error("❌ Failed to fetch department students:", error);
      setStudents([]);
    }
  };

  const addStudent = async (student) => {
    try {
      const response = await axiosInstance.post("/students/", student);
      await fetchAllStudents();
      return response.data;
    } catch (error) {
      console.error("❌ Failed to add student:", error.response?.data || error.message);
      throw error;
    }
  };

  const updateStudentOffers = async (regNo, newOffer) => {
    const student = allStudents.find((s) => s.regNo === regNo);
    if (!student) return;

    const updatedOffers = [...(student.offers || []), newOffer];
    const payload = { ...student, offers: updatedOffers };

    try {
      const response = await axiosInstance.put("/students/", payload);
      console.log("✅ Offers updated:", response.data);

      await fetchAllStudents();
      if (student.department?.toLowerCase() === department?.toLowerCase()) {
        await fetchStudentsByDepartment(department, filter);
      }
    } catch (error) {
      console.error("❌ Failed to update offers:", error.response?.data || error.message);
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
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
