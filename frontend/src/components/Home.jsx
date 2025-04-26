import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ageGroupData = {
  labels: ["18–35", "36–50", "51+"],
  datasets: [
    {
      label: "Age Groups",
      data: [2, 1, 1], // replace with dynamic data if needed
      backgroundColor: ["#60a5fa", "#38bdf8", "#0ea5e9"],
      borderColor: ["#ffffff", "#ffffff", "#ffffff"],
      borderWidth: 1,
    },
  ],
};

function Home() {
  return (
    <div className="flex-1 p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Home Overview</h2>
        <p className="text-lg font-bold">
          Welcome Back, Dr. Johnson Kalukhe Mwenje
        </p>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-sky-200 p-6 rounded">
          <div className="text-lg font-semibold mb-2">Total Clients</div>
          <div className="text-2xl font-bold">4</div>
        </div>
        <div className="bg-sky-200 p-6 rounded">
          <div className="text-lg font-semibold mb-2">Active Programs</div>
          <div className="text-2xl font-bold">1</div>
        </div>
        <div className="bg-sky-200 p-6 rounded">
          <div className="text-lg font-semibold mb-2">Clients by Gender</div>
          <div className="text-sm">2 Male</div>
          <div className="text-sm">2 Female</div>
        </div>
        <div className="bg-sky-200 p-6 rounded col-span-1 mt-5 md:col-span-2">
          <div className="text-lg font-semibold mb-2">Clients by Age Group</div>
          <div style={{ width: "300px", height: "300px" }}>
            <Pie
              data={ageGroupData}
              width={300}
              height={300}
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
