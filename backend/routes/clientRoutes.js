import { Router } from "express";
const router = Router();
import {
  registerClient,
  viewClientProfile,
  deleteClient,
  listClients,
} from "../controllers/clientController.js";
import authenticateUser from "../middlewares/authMiddleware.js"; 


router.post("/", authenticateUser, registerClient);

router.get("/:id", authenticateUser, viewClientProfile);

router.delete("/:id", authenticateUser, deleteClient);

router.get("/", authenticateUser, listClients);

export default router;
