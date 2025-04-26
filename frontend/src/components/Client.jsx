import { FaEye, FaTrash } from "react-icons/fa";

function Client() {
  const client = [
    {
      id: 1,
      name: "Mercy AwinoOkal",
      dob: "1990-04-02",
      gender: "female",
      email: "mercyawino@gmail.com",
      address: "200-40200, Juja, Kiambu.",
    },
    {
      id: 2,
      name: "Mary JaneOlumbe",
      dob: "2001-12-18",
      gender: "female",
      email: "maryolumbe66@gmail.com",
      address: "35- Limuru, Kiambu.",
    },
    {
      id: 3,
      name: "Joseph PaulsonKamau",
      dob: "1964-04-08",
      gender: "male",
      email: "joseph@gmail.com",
      address: "56, Nyamira",
    },
    {
      id: 4,
      name: "Moses Wanderi",
      dob: "1980-04-09",
      gender: "male",
      email: "moses@gmail.com",
      address: "23, Laikipia",
    },
  ];

  return (
    <div className="flex-1 p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Client Overview</h2>
        <input
          type="text"
          placeholder="Search client..."
          className="p-2 border rounded w-full"
        />
      </div>

      <div className="flex justify-end mb-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
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
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {client.map((client) => (
              <tr key={client.id} className="border-t">
                <td className="p-2">{client.id}</td>
                <td className="p-2">{client.name}</td>
                <td className="p-2">{client.dob}</td>
                <td className="p-2">{client.gender}</td>
                <td className="p-2">{client.email}</td>
                <td className="p-2">{client.address}</td>
                <td className="p-2 flex space-x-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEye />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Client;
