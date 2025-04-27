import express from "express";
import {
  addProgram,
  editProgram,
  removeProgram,
  getActiveProgramsCount, 
  getAllProgram
} from "../controllers/programController.js";
import authenticateUser from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateUser, getAllProgram);

router.get("/active-count", authenticateUser, getActiveProgramsCount);

router.post("/", authenticateUser, addProgram);

router.put("/:id", authenticateUser, editProgram);

router.delete("/:id", authenticateUser, removeProgram);

export default router;
