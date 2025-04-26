import {
  createEnrollment,
  deleteEnrollment,
  getAllEnrollments,
  countEnrollmentsByProgram,
} from "../models/enrollmentModel.js";

export const enrollClient = (req, res) => {
  const { program_id, program_name, user_id, user_name, enrollment_date } =
    req.body;

  if (
    !program_id ||
    !program_name ||
    !user_id ||
    !user_name ||
    !enrollment_date
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  createEnrollment(
    { program_id, program_name, user_id, user_name, enrollment_date },
    (err, id) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Error enrolling client", error: err });
      res
        .status(201)
        .json({ message: "Client enrolled successfully", enrollmentId: id });
    }
  );
};

export const removeEnrollment = (req, res) => {
  const { id } = req.params;

  deleteEnrollment(id, (err, changes) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error deleting enrollment", error: err });
    if (changes === 0)
      return res.status(404).json({ message: "Enrollment not found" });
    res.json({ message: "Enrollment deleted successfully" });
  });
};

export const listEnrollments = (req, res) => {
  getAllEnrollments((err, rows) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error fetching enrollments", error: err });
    res.json(rows);
  });
};

export const countEnrolledUsers = (req, res) => {
  const { program_id } = req.params;

  countEnrollmentsByProgram(program_id, (err, count) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error counting enrollments", error: err });
    res.json({ program_id, enrolled_users: count });
  });
};
