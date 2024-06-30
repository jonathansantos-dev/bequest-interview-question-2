import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

// Generates a JWT token based on SECRET_KEY
export const generateToken = (data: string): string => {
  return jwt.sign({ data }, SECRET_KEY, {
    expiresIn: "1h"
  });
};

// Verifies the token integrity and authenticity
export const verifyToken = (token: string): boolean  => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    
    return decoded === token;
  } catch (error) {
    return false;
  }
};