import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./database/health_system.db');

const createClient = (client, callback) => {
  const { name, dob, gender, email, address, age } = client;
  const stmt = db.prepare(`
    INSERT INTO clients (name, dob, gender, email, address, age)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  stmt.run(name, dob, gender, email, address, age, function (err) {
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
const countAllClients = (callback) => {
  const query = "SELECT COUNT(*) AS total FROM clients";
  db.get(query, [], callback);
};

const countClientsByGender = (callback) => {
  const query = `
    SELECT gender, COUNT(*) AS count
    FROM clients
    GROUP BY gender
  `;
  db.all(query, [], callback);
};

const countClientsByAgeGroup = (callback) => {
  const query = `
    SELECT
      CASE
        WHEN age BETWEEN 18 AND 35 THEN '18-35'
        WHEN age BETWEEN 36 AND 50 THEN '36-50'
        WHEN age >= 51 THEN '51+'
        ELSE 'Unknown'
      END AS age_group,
      COUNT(*) AS count
    FROM clients
    GROUP BY age_group
  `;
  db.all(query, [], callback);
};

export { createClient, findClientByEmail, getAllClients, findClientById, deleteClient, countAllClients, countClientsByGender, countClientsByAgeGroup };
