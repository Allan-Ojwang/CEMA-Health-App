import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./database/health_system.db');

const createDoctorTable = () => {
  db.run(`
    CREATE TABLE IF NOT EXISTS doctors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      license_number TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

const createDoctor = (doctor, callback) => {
  const { full_name, license_number, email, password } = doctor;
  const stmt = db.prepare(`
    INSERT INTO doctors (full_name, license_number, email, password)
    VALUES (?, ?, ?, ?)
  `);
  stmt.run(full_name, license_number, email, password, function(err) {
    callback(err, this.lastID);
  });
};

const findDoctorByEmail = (email, callback) => {
  db.get("SELECT * FROM doctors WHERE email = ?", [email], callback);
};

const findDoctorByLicenseNumber = (licenseNumber, callback) => {
  db.get("SELECT * FROM doctors WHERE license_number = ?", [licenseNumber], callback);
};
export{ createDoctorTable, createDoctor, findDoctorByEmail, findDoctorByLicenseNumber};
