import { Router } from "express";
import { updateUser } from "../controllers/dataController";
import { authenticate } from "../controllers/authController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.put("/:userEmail", authMiddleware, updateUser);
router.post("/authenticate", authenticate);

export default router;