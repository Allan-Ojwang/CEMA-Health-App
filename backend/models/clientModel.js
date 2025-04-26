import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./database/health_system.db');

const createClient = (client, callback) => {
  const { name, dob, gender, email, address } = client;
  const stmt = db.prepare(`
    INSERT INTO clients (name, dob, gender, email, address)
    VALUES (?, ?, ?, ?, ?)
  `);
  stmt.run(name, dob, gender, email, address, function (err) {
    callback(err, this.lastID);
  });
};

const findClientByEmail = (email, callback) => {
  db.get("SELECT * FROM clients WHERE email = ?", [email], callback);
};

const getAllClients = (callback) => {
  db.all("SELECT * FROM clients", [], callback);
};

const findClientById = (id, callback) => {
  db.get("SELECT * FROM clients WHERE id = ?", [id], callback);
};

const deleteClient = (id, callback) => {
  const query = `DELETE FROM clients WHERE id = ?`;
  db.run(query, [id], function (err) {
    callback(err, this.changes);
  });
};

export { createClient, findClientByEmail, getAllClients, findClientById, deleteClient };
