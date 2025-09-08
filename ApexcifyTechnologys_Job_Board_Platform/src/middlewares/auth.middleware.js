import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

// Check if user is authenticated
const isAuthenticated = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new ApiError(401, "Not authenticated. Please log in.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      throw new ApiError(401, "User not found. Please log in again.");
    }

    next();
  } catch (err) {
    throw new ApiError(401, "Invalid or expired token");
  }
});

// Authorize roles
const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, `Role: ${req.user.role} is not allowed to access this resource`);
    }
    next();
  };
};

export { isAuthenticated, isAuthorized };
