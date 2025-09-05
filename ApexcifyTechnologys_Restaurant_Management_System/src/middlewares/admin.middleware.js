// middlewares/adminMiddleware.js
import userModel from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * Middleware to allow only admin users
 */
const adminMiddleware = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.body.id);

  if (!user || user.usertype !== "admin") {
    throw new ApiError(401, "Only Admin Access");
  }

  next();
});

export default adminMiddleware;
