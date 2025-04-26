const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/health_system.db'); // SQLite DB

// Client model
const createClientTable = () => {
  db.run("CREATE TABLE IF NOT EXISTS clients (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)");
};

const addClient = (name, age) => {
  const stmt = db.prepare("INSERT INTO clients (name, age) VALUES (?, ?)");
  stmt.run(name, age);
};

const getClientById = (id, callback) => {
  db.get("SELECT * FROM clients WHERE id = ?", [id], callback);
};

module.exports = { createClientTable, addClient, getClientById };
