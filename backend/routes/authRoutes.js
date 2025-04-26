import { Router } from "express";
const router = Router();
import { signup, signin } from "../controllers/authController";

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/refresh-token", refreshAccessToken);

export default router;
