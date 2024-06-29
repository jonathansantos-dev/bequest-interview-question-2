// src/routes/dataRoutes.ts
import { Router } from "express";
import { getData, updateData } from "../controllers/dataController";

const router = Router();

// Rotas relacionadas aos dados
router.get("/", getData);
router.post("/", updateData);

export default router;