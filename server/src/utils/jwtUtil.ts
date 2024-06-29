import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

// Generates a JWT token based on SECRET_KEY
export const generateToken = (data: string): string => {
  return jwt.sign({ data }, SECRET_KEY);
};

// Verifies the token integrity and authenticy
export const verifyToken = (data: string): boolean => {
  try {
    const decoded = jwt.verify(generateToken(data), SECRET_KEY);
    return (decoded as { data: string }).data === data;
  } catch (e) {
    return false;
  }
};