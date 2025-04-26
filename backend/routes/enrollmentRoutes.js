import { Router } from "express";
const router = Router();
import {
  enrollClient,
  removeEnrollment,
  listEnrollments,
  countEnrolledUsers,
} from "../controllers/enrollmentController.js";
import authenticateUser from "../middlewares/authMiddleware.js";

router.post("/", authenticateUser, enrollClient);

router.delete("/:id", authenticateUser, removeEnrollment);

router.get("/", authenticateUser, listEnrollments);

router.get("/count/:program_id", authenticateUser, countEnrolledUsers);

export default router;
