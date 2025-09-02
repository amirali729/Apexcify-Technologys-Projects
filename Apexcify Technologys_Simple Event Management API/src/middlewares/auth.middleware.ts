import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return;
  }

  try {
    if (!process.env.JWT_SECRET) {
      res
        .status(500)
        .json({ message: "authentication error contact administrator" });
      return;
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    (req as any).user = decoded;

    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};