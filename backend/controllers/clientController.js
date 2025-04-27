import * as clientModel from '../models/clientModel.js';

const registerClient = (req, res) => {
  const { name, dob, gender, email, address,age } = req.body;

  if (!name || !dob || !gender || !email || !address || !age) {
    return res.status(400).json({ message: "All fields are required" });
  }


  clientModel.findClientByEmail(email, (err, client) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    if (client) {
      return res.status(400).json({ message: "Email already registered" });
    }

    clientModel.createClient({ name, dob, gender, email, address, age }, (err, clientId) => {
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

const countClients = (req, res) => {
  clientModel.countAllClients((err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error counting clients" });
    }
    res.status(200).json({ count: result.total }); 
  });
};

const countClientsByGender = (req, res) => {
  clientModel.countClientsByGender((err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error counting clients by gender" });
    }

    const genderCounts = results.reduce((acc, item) => {
      acc[item.gender] = item.count;
      return acc;
    }, {});

    res.status(200).json(genderCounts);
  });
};

const countClientsByAgeGroup = (req, res) => {
  clientModel.countClientsByAgeGroup((err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error counting clients by age group" });
    }


    const ageGroupCounts = [0, 0, 0];
    results.forEach(item => {
      if (item.age_group === '18-35') ageGroupCounts[0] = item.count;
      else if (item.age_group === '36-50') ageGroupCounts[1] = item.count;
      else if (item.age_group === '51+') ageGroupCounts[2] = item.count;
    });

    res.status(200).json(ageGroupCounts);
  });
};

export {
  registerClient,
  listClients,
  viewClientProfile,
  deleteClient,
  countClients,
  countClientsByGender,
  countClientsByAgeGroup
};
