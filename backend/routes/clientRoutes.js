import { Router } from "express";
const router = Router();
import {
  registerClient,
  viewClientProfile,
  deleteClient,
  listClients,
  countClients,
  countClientsByGender,
  countClientsByAgeGroup
} from "../controllers/clientController.js";
import authenticateUser from "../middlewares/authMiddleware.js";

router.post("/", authenticateUser, registerClient);

router.get("/count", authenticateUser, countClients);
router.get("/count/gender", authenticateUser, countClientsByGender);
router.get("/count/age-group", authenticateUser, countClientsByAgeGroup);

router.get("/", authenticateUser, listClients);
router.get("/:id", authenticateUser, viewClientProfile);

router.delete("/:id", authenticateUser, deleteClient);


export default router;
