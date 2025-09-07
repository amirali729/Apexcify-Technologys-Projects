// controllers/userController.js
import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// GET USER INFO
const getUserController = asyncHandler(async (req, res) => {
  const user = await User.findById({_id: req.user.id}).select("-password");
  if (!user) throw new ApiError(404, "User Not Found");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User fetched successfully"));
});

// UPDATE USER
const updateUserController = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) throw new ApiError(404, "User Not Found");

  const { userName, address, phone } = req.body;
  if (userName) user.userName = userName;
  if (address) user.address = address;
  if (phone) user.phone = phone;

  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User updated successfully"));
});

// UPDATE USER PASSWORD
const updatePasswordController = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) throw new ApiError(404, "User Not Found");

  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new ApiError(400, "Please provide old and new password");
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) throw new ApiError(400, "Invalid old password");

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Password updated successfully"));
});

// RESET PASSWORD
const resetPasswordController = asyncHandler(async (req, res) => {
  const { email, newPassword, answer } = req.body;
  if (!email || !newPassword || !answer) {
    throw new ApiError(400, "Please provide all required fields");
  }

  const user = await User.findOne({ email, answer });
  if (!user) throw new ApiError(404, "User not found or invalid answer");

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Password reset successfully"));
});

// DELETE PROFILE
const deleteProfileController = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) throw new ApiError(404, "User not found");

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Your account has been deleted"));
});

export {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteProfileController,
};
