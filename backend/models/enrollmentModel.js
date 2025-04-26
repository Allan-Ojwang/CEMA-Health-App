import sqlite3 from "sqlite3";
const db = new sqlite3.Database('./database/health_system.db');

export const createEnrollment = (enrollment, callback) => {
  const { program_id, program_name, user_id, user_name, enrollment_date } = enrollment;
  const stmt = db.prepare(`
    INSERT INTO enrollments (program_id, program_name, user_id, user_name, enrollment_date)
    VALUES (?, ?, ?, ?, ?)
  `);
  stmt.run(program_id, program_name, user_id, user_name, enrollment_date, function (err) {
    callback(err, this.lastID);
  });
};

export const deleteEnrollment = (id, callback) => {
  db.run(`DELETE FROM enrollments WHERE id = ?`, [id], function (err) {
    callback(err, this.changes);
  });
};

export const getAllEnrollments = (callback) => {
  db.all(`SELECT * FROM enrollments`, [], callback);
};

export const countEnrollmentsByProgram = (program_id, callback) => {
    db.get(`
      SELECT COUNT(*) AS count
      FROM enrollments
      WHERE program_id = ?
    `, [program_id], (err, row) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, row.count);
      }
    });
  };
  
  