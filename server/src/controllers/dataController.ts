import { Request, Response } from "express";
import { getDataService, updateDataService, recoverDataService } from "../services/dataService";
import { generateToken, verifyToken } from "../utils/jwtUtil";

// Controller to get data
export const getData = (req: Request, res: Response) => {
  const data = getDataService();
  const token = generateToken(data);
  res.json({ data, token });
};

// Controller to update data
export const updateData = (req: Request, res: Response) => {
  const { data } = req.body;
  updateDataService(data);
  res.sendStatus(200);
};

// Controller to verify data integrity
export const verifyData = (req: Request, res: Response) => {
  const data = getDataService();
  const isValid = verifyToken(data);
  res.json({ verified: isValid });
};

// Controller to recover backupt data
export const recoverData = (req: Request, res: Response) => {
  const data = recoverDataService();
  const token = generateToken(data);
  res.json({ data, token });
};
