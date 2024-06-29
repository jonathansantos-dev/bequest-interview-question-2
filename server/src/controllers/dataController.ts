import { Request, Response } from "express";
import { getDataService, updateDataService } from "../services/dataService";

// Controller to get data 
export const getData = (req: Request, res: Response) => {
  const data = getDataService();
  res.json({ data });
};

// Controller to update data
export const updateData = (req: Request, res: Response) => {
  const { data } = req.body;
  updateDataService(data);
  res.sendStatus(200);
};
