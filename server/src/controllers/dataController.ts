import { Request, Response } from "express";
import { updateUserService } from "../services/dataService";

// Controller to update data
export const updateUser = async (req: Request, res: Response) => {
  try {
    const userEmail = req.params.userEmail;
    const userRequestEmail = req.userEmail;

    if (userEmail !== userRequestEmail) {
      return res.status(403).json({ message: 'Action not permited! users do not match.' });
    }

    const newData: { password?: string } = req.body;

    const result = await updateUserService(userEmail, newData);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating user', error });
  }
};