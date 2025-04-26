import express from "express";
import {
  addProgram,
  editProgram,
  removeProgram,
} from "../controllers/programController.js";
import authenticateUser from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateUser, addProgram);

router.put("/:id", authenticateUser, editProgram);

router.delete("/:id", authenticateUser, removeProgram);

export default router;
