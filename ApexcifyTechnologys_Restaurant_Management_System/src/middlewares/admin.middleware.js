// middlewares/adminMiddleware.js
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * Middleware to allow only admin users
 */
export const adminMiddleware = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.body.id);

  if (!user || user.usertype !== "admin") {
    throw new ApiError(401, "Only Admin Access");
  }

  next();
});


