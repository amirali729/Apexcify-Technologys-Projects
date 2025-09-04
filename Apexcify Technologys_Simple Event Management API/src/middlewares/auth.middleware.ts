import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Authentication Middleware
// Purpose: Protect routes by verifying JWT tokens
// Usage: Add this middleware to routes that require authentication
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Extract token from "Authorization" header (format: "Bearer <token>")
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    // If no token is provided → reject request
    res.status(401).json({ message: "Access denied. No token provided." });
    return;
  }

  try {
    // Ensure JWT secret exists in environment variables
    if (!process.env.JWT_SECRET) {
      res
        .status(500)
        .json({ message: "authentication error contact administrator" });
      return;
    }
    // Verify the token using the secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach decoded user info to request object for use in controllers
    (req as any).user = decoded;

    next();
  } catch (error) {
    // If token is invalid → reject request
    res.status(400).json({ message: "Invalid token" });
  }
};