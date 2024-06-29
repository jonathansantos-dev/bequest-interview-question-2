import { Router } from "express";
import { getData, updateData, verifyData, recoverData } from "../controllers/dataController";

const router = Router();

// Data-related routes
router.get("/", getData);
router.post("/", updateData);
router.get("/verify", verifyData);
router.get("/recover", recoverData);

export default router;