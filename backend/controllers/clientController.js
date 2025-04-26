const clientModel = require('../models/clientModel');

const createClient = (req, res) => {
  const { name, age } = req.body;
  clientModel.addClient(name, age);
  res.status(201).json({ message: 'Client created successfully' });
};

const getClient = (req, res) => {
  const { id } = req.params;
  clientModel.getClientById(id, (err, client) => {
    if (err || !client) return res.status(404).json({ message: 'Client not found' });
    res.json(client);
  });
};

module.exports = { createClient, getClient };
