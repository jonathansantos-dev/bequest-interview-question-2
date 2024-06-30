import { Request, Response } from "express";
import { getDataService, updateDataService } from "../services/dataService";
import { generateToken } from "../utils/jwtUtil";

// Controller to get data
export const getData = (req: Request, res: Response) => {
  try {
    console.log('getting data')
    // const data = getDataService();
    // const token = ''
    // res.json({ data, token });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Controller to update data
export const updateData = (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    updateDataService(data);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    throw error;
  }  
};