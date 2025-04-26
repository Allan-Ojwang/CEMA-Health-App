import * as clientModel from '../models/clientModel.js';

const registerClient = (req, res) => {
  const { name, dob, gender, email, address } = req.body;

  if (!name || !dob || !gender || !email || !address) {
    return res.status(400).json({ message: "All fields are required" });
  }

  clientModel.findClientByEmail(email, (err, client) => {
    if (client) {
      return res.status(400).json({ message: "Email already registered" });
    }

    clientModel.createClient({ name, dob, gender, email, address }, (err, clientId) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error creating client" });
      }
      res.status(201).json({ message: "Client registered successfully", clientId });
    });
  });
};

const listClients = (req, res) => {
  clientModel.getAllClients((err, clients) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching clients" });
    }
    res.status(200).json(clients);
  });
};

const viewClientProfile = (req, res) => {
  const { id } = req.params;

  clientModel.findClientById(id, (err, client) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching client" });
    }
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json(client);
  });
};

const deleteClient = (req, res) => {
  const { id } = req.params;

  clientModel.deleteClient(id, (err, changes) => {
    if (err) {
      return res.status(500).json({ message: "Error deleting client", error: err });
    }

    if (changes === 0) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json({ message: "Client deleted successfully" });
  });
};

export { registerClient, listClients, viewClientProfile, deleteClient };
