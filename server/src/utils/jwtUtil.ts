import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

interface TokenPayload extends JwtPayload {
  userEmail: string;
}

// Generates a JWT token based on SECRET_KEY
export const generateToken = (userEmail: string): string => {
  return jwt.sign({ userEmail }, SECRET_KEY, {
    expiresIn: "1h"
  });
};

// Verifies the token integrity and authenticity
export const verifyToken = (token: string): TokenPayload  => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as TokenPayload;
    return decoded;
  } catch (error) {
    throw error;
  }
};