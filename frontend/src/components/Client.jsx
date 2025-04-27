import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

function Client() {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [newClient, setNewClient] = useState({
    name: "",
    dob: "",
    gender: "",
    email: "",
    address: "",
    age: "",
  });
  const [clientToDelete, setClientToDelete] = useState(null);

  const token = localStorage.getItem("accessToken");

  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  useEffect(() => {
    if (!token) {
      console.error("No token found, please login again.");
      return;
    }

    fetchClients();
  }, [token]);

  const fetchClients = () => {
    axiosInstance
      .get("/api/clients")
      .then((response) => {
        setClients(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewClient({
      ...newClient,
      [name]: name === "age" ? Number(value) : value,
    });
  };
  
  const handleAddClient = () => {
    // Check if all required fields are filled
    if (
      !newClient.name ||
      !newClient.dob ||
      !newClient.gender ||
      !newClient.email ||
      !newClient.address ||
      newClient.age === ""
    ) {
      alert("Please fill in all fields.");
      return;
    }

    // Ensure valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newClient.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Parse and validate age
    let clientAge = parseInt(newClient.age);

    if (isNaN(clientAge) || clientAge <= 0) {
      alert("Age must be a positive number greater than zero.");
      return; // Prevent submission if age is invalid
    }

    // If age is valid, proceed to send the data
    const { id, ...clientToAdd } = newClient;
    clientToAdd.age = clientAge;

    console.log("Client data being sent:", clientToAdd);

    axiosInstance
      .post("/api/clients", clientToAdd)
      .then(() => {
        fetchClients();
        setNewClient({
          name: "",
          dob: "",
          gender: "",
          email: "",
          address: "",
          age: "", // Reset age field
        });
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error adding client:", error);
        alert("Failed to add client, please try again.");
      });
  };

  const handleDeleteClick = (client) => {
    setClientToDelete(client);
    setDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (!clientToDelete) return;

    axiosInstance
      .delete(`/api/clients/${clientToDelete.id}`)
      .then(() => {
        fetchClients();
        setDeleteModal(false);
        setClientToDelete(null);
      })
      .catch((error) => {
        console.error("Error deleting client:", error);
        alert("Failed to delete client, please try again.");
        setDeleteModal(false);
        setClientToDelete(null);
      });
  };

  return (
    <div className="flex-1 p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Client Overview</h2>
        <input
          type="text"
          placeholder="Search client..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          + Add New Client
        </button>
      </div>

      <div className="bg-white rounded shadow">
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">D.O.B</th>
              <th className="p-2 text-left">Gender</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Address</th>
              <th className="p-2 text-left">Age</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients
              .filter(
                (client) =>
                  client.name &&
                  client.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((client) => (
                <tr key={client.id} className="border-t">
                  <td className="p-2">{client.id}</td>
                  <td className="p-2">{client.name}</td>
                  <td className="p-2">{client.dob}</td>
                  <td className="p-2">{client.gender}</td>
                  <td className="p-2">{client.email}</td>
                  <td className="p-2">{client.address}</td>
                  <td className="p-2">{client.age}</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleDeleteClick(client)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Add Client Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Client</h2>
            <div className="grid grid-cols-1 gap-3">
              {[
                { label: "Name", name: "name", type: "text" },
                { label: "D.O.B", name: "dob", type: "date" },
                { label: "Gender", name: "gender", type: "select" },
                { label: "Email", name: "email", type: "email" },
                { label: "Address", name: "address", type: "text" },
                { label: "Age", name: "age", type: "number" },
              ].map(({ label, name, type }) => (
                <div key={name}>
                  <label className="block text-sm font-medium mb-1">
                    {label}
                  </label>
                  {type === "select" ? (
                    <select
                      name={name}
                      value={newClient[name]}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  ) : (
                    <input
                      type={type}
                      name={name}
                      value={newClient[name]}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddClient}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Add Client
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Client Confirmation Modal */}
      {deleteModal && clientToDelete && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Confirm Deletion
            </h2>
            <p className="text-center mb-4">
              Are you sure you want to delete client:{" "}
              <strong>{clientToDelete.name}</strong>?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setDeleteModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Client;
