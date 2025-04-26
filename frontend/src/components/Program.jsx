import React, { useState } from "react";

const Program = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const programs = [
    {
      title: "Malaria and Epidemics Volunteer",
      description:
        "This programme focuses on mobilizing volunteers to support the prevention, control, and response to malaria and epidemic outbreaks in the Nyanza region. Volunteers will be trained to conduct community sensitization, support surveillance and reporting efforts, assist in distributing malaria prevention tools such as insecticide-treated nets, and work closely with healthcare providers during epidemic responses. The initiative aims to strengthen local capacity, raise awareness, and reduce the burden of malaria and other infectious diseases in vulnerable communities.",
      status: "closed",
      startDate: "2025-05-01",
      endDate: "2025-07-01",
    },
    {
      title: "Maternal and Child Health Outreach Programme – Nyanza Region",
      description:
        "This programme aims to improve maternal and child health outcomes in underserved areas of Nyanza. By mobilizing community health volunteers and engaging local health facilities, the initiative focuses on increasing access to prenatal and postnatal care, improving child immunization coverage, and promoting nutrition and hygiene education among mothers and caregivers.",
      status: "active",
      startDate: "2025-05-10",
      endDate: "2025-07-19",
    },
    {
      title: "HIV",
      description: "HIV Care",
      status: "closed",
      startDate: "2025-04-30",
      endDate: "2025-05-09",
    },
  ];

  const filteredPrograms = programs.filter((program) =>
    program.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-purple-700 mb-4">
        Health Programs
      </h1>

      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search programs..."
          className="border border-gray-300 rounded-lg p-2 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2 mb-6">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">
          ➕ Create New Program
        </button>
        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg">
          📃 Enroll Client To Program
        </button>
      </div>

      {/* Program Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredPrograms.map((program, index) => (
          <div
            key={index}
            className="border rounded-lg p-6 shadow hover:shadow-md transition"
          >
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-semibold">{program.title}</h2>
              <span
                className={`text-xs font-bold px-2 py-1 rounded ${
                  program.status === "active"
                    ? "bg-green-500 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                {program.status}
              </span>
            </div>
            <p className="text-gray-700 mb-4">{program.description}</p>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span className="mr-2">📅</span>
              {program.startDate} -- {program.endDate}
            </div>
            <div className="flex gap-2">
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded">
                View
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Program;
