import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Program = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false); 
  const [currentProgramId, setCurrentProgramId] = useState(null);
  const [newProgram, setNewProgram] = useState({
    title: "",
    description: "",
    status: "Active",
    startDate: "",
    endDate: "",
    targetGroup: "",
  });
  const [programs, setPrograms] = useState([]);
  const token = localStorage.getItem("accessToken");

  const fetchPrograms = async () => {
    if (!token) {
      console.error("No token found, please login again.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/programs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response && response.data) {
        setPrograms(response.data);
      }
    } catch (error) {
      console.error("Error fetching programs", error);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, [token]);

  const filteredPrograms = programs.filter((program) =>
    `${program.title} ${program.description} ${program.status}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const openCreateModal = () => {
    setIsEditing(false);
    setNewProgram({
      title: "",
      description: "",
      status: "Active",
      startDate: "",
      endDate: "",
      targetGroup: "",
    });
    setShowModal(true);
  };

  const openEditModal = (program) => {
    setIsEditing(true);
    setCurrentProgramId(program.id);
    setNewProgram({
      title: program.title,
      description: program.description,
      status: program.status,
      startDate: program.start_date,
      endDate: program.end_date,
      targetGroup: program.target_group,
    });
    setShowModal(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      console.error("No token found, please login again.");
      return;
    }

    try {
      const payload = {
        title: newProgram.title,
        description: newProgram.description,
        status: newProgram.status,
        start_date: newProgram.startDate,
        end_date: newProgram.endDate,
        target_group: newProgram.targetGroup,
      };

      if (isEditing && currentProgramId) {
        // Update existing program
        await axios.put(
          `http://localhost:5000/api/programs/${currentProgramId}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Program updated successfully!");

      } else {
        // Create new program
        await axios.post(
          "http://localhost:5000/api/programs",
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Program created successfully!"); 
      }

      await fetchPrograms(); 
      setShowModal(false);
      setNewProgram({
        title: "",
        description: "",
        status: "Active",
        startDate: "",
        endDate: "",
        targetGroup: "",
      });
      setIsEditing(false);
      setCurrentProgramId(null);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div className="p-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-4">Health Programs</h1>

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
        <button
          onClick={openCreateModal}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
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
                  program.status === "Active"
                    ? "bg-green-500 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                {program.status}
              </span>
            </div>
            <p className="text-gray-700 mb-4">{program.description}</p>
            <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
              <div className="flex items-center">
                <span className="mr-2">📅</span>
                {program.start_date} -- {program.end_date}
              </div>
              <div className="flex items-center mr-10">
                <span className="mr-2">🎯</span>
                {program.target_group || "Not set"}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => openEditModal(program)}
                className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-semibold mb-4">
              {isEditing ? "Edit Program" : "Create New Program"}
            </h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={newProgram.title}
                  onChange={(e) =>
                    setNewProgram({ ...newProgram, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={newProgram.description}
                  onChange={(e) =>
                    setNewProgram({ ...newProgram, description: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Status</label>
                <select
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={newProgram.status}
                  onChange={(e) =>
                    setNewProgram({ ...newProgram, status: e.target.value })
                  }
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Start Date</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={newProgram.startDate}
                  onChange={(e) =>
                    setNewProgram({ ...newProgram, startDate: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">End Date</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={newProgram.endDate}
                  onChange={(e) =>
                    setNewProgram({ ...newProgram, endDate: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Target Group</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={newProgram.targetGroup}
                  onChange={(e) =>
                    setNewProgram({ ...newProgram, targetGroup: e.target.value })
                  }
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setIsEditing(false);
                    setCurrentProgramId(null);
                  }}
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                >
                  {isEditing ? "Update Program" : "Create Program"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Program;
