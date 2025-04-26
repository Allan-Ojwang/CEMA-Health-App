const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/health_system.db'); // SQLite DB

// Create the clients table
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS clients (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)");
  db.run("CREATE TABLE IF NOT EXISTS programs (id INTEGER PRIMARY KEY, name TEXT)");
  db.run("CREATE TABLE IF NOT EXISTS client_programs (client_id INTEGER, program_id INTEGER)");
});

console.log('Database setup complete.');
db.close();
