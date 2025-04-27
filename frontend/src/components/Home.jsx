// Home.jsx
import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

// Default chart structure
const ageGroupData = {
  labels: ["18–35", "36–50", "51+"],
  datasets: [
    {
      label: "Age Groups",
      data: [2, 1, 1], // Default placeholders
      backgroundColor: ["#60a5fa", "#d6c7bd", "#8b5e3c"],
      borderColor: ["#ffffff", "#ffffff", "#ffffff"],
      borderWidth: 1,
    },
  ],
};

function Home() {
  const [totalClients, setTotalClients] = useState(0);
  const [clientsByGender, setClientsByGender] = useState({
    male: 0,
    female: 0,
  });
  const [activePrograms, setActivePrograms] = useState(0);
  const [clientsByAgeGroup, setClientsByAgeGroup] = useState([0, 0, 0]);
  const [doctorName, setDoctorName] = useState(
    localStorage.getItem("doctorName") || localStorage.getItem("full_name")
  );

  // Token from localStorage
  const token = localStorage.getItem("accessToken");

  // Setup axios instance
  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      Authorization: token ? `Bearer ${token}` : "", // Only set if token exists
    },
  });

  useEffect(() => {
    if (!token) {
      console.error("No token found, please login again.");
      return;
    }

    axiosInstance
      .get("/api/clients/count")
      .then((response) => {
        setTotalClients(response.data.count || 0);
      })
      .catch((error) => {
        console.error("Error fetching total clients:", error);
      });

    axiosInstance
      .get("/api/clients/count/gender")
      .then((response) => {
        const genderData = response.data || {};

        setClientsByGender({
          male: genderData.Male || 0,
          female: genderData.Female || 0,
        });
      })
      .catch((error) => {
        console.error("Error fetching clients by gender:", error);
      });

    axiosInstance
      .get("/api/programs/active-count")
      .then((response) => {
        setActivePrograms(response.data.activeProgramsCount || 0);
      })
      .catch((error) => {
        console.error("Error fetching active programs count:", error);
      });

    axiosInstance
      .get("/api/clients/count/age-group")
      .then((response) => {
        setClientsByAgeGroup(response.data || [0, 0, 0]);
      })
      .catch((error) => {
        console.error("Error fetching clients by age group:", error);
      });
  }, [token]);

  // Prepare updated chart data
  const updatedAgeGroupData = {
    ...ageGroupData,
    datasets: [
      {
        ...ageGroupData.datasets[0],
        data: clientsByAgeGroup,
      },
    ],
  };
  const displayName =
    doctorName && doctorName !== "null" && doctorName !== "undefined"
      ? doctorName
      : "User";

  return (
    <div className="flex-1 p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Home Overview</h2>
        <p className="text-lg font-bold">Welcome Back, {displayName}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-sky-200 p-6 rounded">
          <div className="text-lg font-semibold mb-2">Total Clients</div>
          <div className="text-2xl font-bold">{totalClients}</div>
        </div>
        <div className="bg-sky-200 p-6 rounded">
          <div className="text-lg font-semibold mb-2">Active Programs</div>
          <div className="text-2xl font-bold">{activePrograms}</div>
        </div>
        <div className="bg-sky-200 p-6 rounded">
          <div className="text-lg font-semibold mb-2">Clients by Gender</div>
          <div className="text-sm">{clientsByGender.male} Male</div>
          <div className="text-sm">{clientsByGender.female} Female</div>
        </div>

        <div className="bg-sky-200 p-6 rounded col-span-1 mt-5 md:col-span-2">
          <div className="text-lg font-semibold mb-2">Clients by Age Group</div>
          <div style={{ width: "300px", height: "300px" }}>
            <Pie
              data={updatedAgeGroupData}
              options={{
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
