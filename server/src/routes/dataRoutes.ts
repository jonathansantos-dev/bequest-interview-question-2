import { Router } from "express";
import { getData, updateData } from "../controllers/dataController";
import { authenticate } from "../controllers/authController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// router.get("/", authMiddleware, getData);
// router.put("/", authMiddleware, updateData);
router.post("/authenticate", authenticate);

export default router;