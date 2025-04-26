import { createProgram, updateProgram, deleteProgram } from '../models/programModel.js';


const addProgram = (req, res) => {
  createProgram(req.body, (err, programId) => {
    if (err) {
      return res.status(500).json({ error: "Failed to create program." });
    }
    res.status(201).json({ message: "Program created successfully!", programId });
  });
};

const editProgram = (req, res) => {
  const { id } = req.params;
  updateProgram(id, req.body, (err, changes) => {
    if (err) {
      return res.status(500).json({ error: "Failed to update program." });
    }
    if (changes === 0) {
      return res.status(404).json({ error: "Program not found." });
    }
    res.json({ message: "Program updated successfully!" });
  });
};

const removeProgram = (req, res) => {
  const { id } = req.params;
  deleteProgram(id, (err, changes) => {
    if (err) {
      return res.status(500).json({ error: "Failed to delete program." });
    }
    if (changes === 0) {
      return res.status(404).json({ error: "Program not found." });
    }
    res.json({ message: "Program deleted successfully!" });
  });
};

export { addProgram, editProgram, removeProgram };
