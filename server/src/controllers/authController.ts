import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { getInitializedDatabase } from '../mocks/dataBase';
import { generateToken } from '../utils/jwtUtil';

// get user by userEmail in the database
const findUserByEmail = async (userEmail: string) => {
  const database = await getInitializedDatabase();
  return database.find(user => user.userEmail === userEmail);
};

export const authenticate = async (req: Request, res: Response) => {
  try {
    const { userEmail, password } = req.body; 

    // get user in database
    const user = await findUserByEmail(userEmail);
    if (!user) {
      return res.status(400).json({ error: 'user not found' });
    }
    
    // Compare hashes
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Generate token 
    const token = generateToken(userEmail);

    // Send aswer if token
    res.status(200).json({
      userEmail,
      token
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};