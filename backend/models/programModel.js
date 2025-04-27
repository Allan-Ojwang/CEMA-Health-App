import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./database/health_system.db');

const createProgram = (program, callback) => {
  const { title, description, status, start_date, end_date, target_group } = program;
  const query = `
    INSERT INTO programs (title, description, status, start_date, end_date, target_group)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.run(query, [title, description, status, start_date, end_date, target_group], function (err) {
    if (err) return callback(err);
    // Get the newly created program
    db.get("SELECT * FROM programs WHERE id = ?", [this.lastID], callback);
  });
};
const getAllPrograms = (callback) => {
  db.all("SELECT * FROM programs", [], callback);
};
const updateProgram = (id, program, callback) => {
  const { title, description, status, start_date, end_date, target_group } = program;
  const query = `
    UPDATE programs
    SET title = ?, description = ?, status = ?, start_date = ?, end_date = ?, target_group = ?
    WHERE id = ?
  `;
  db.run(query, [title, description, status, start_date, end_date, target_group, id], function (err) {
    callback(err, this.changes);
  });
};

const deleteProgram = (id, callback) => {
  const query = `DELETE FROM programs WHERE id = ?`;
  db.run(query, [id], function (err) {
    callback(err, this.changes);
  });
};

const countActivePrograms = (callback) => {
  const query = `
    SELECT COUNT(*) AS total
    FROM programs
    WHERE status = 'Active'
  `;
  db.get(query, [], callback);
};

export { createProgram, updateProgram, deleteProgram, countActivePrograms, getAllPrograms };
