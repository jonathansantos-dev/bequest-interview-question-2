import { Request, Response, NextFunction } from "express";

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send("Unauthorized access");
  } else {
    console.error("Unexpected error:", err);
    res.status(500).send("Internal Server Error");
  }
}