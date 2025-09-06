// controllers/authController.js
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// REGISTER USER
const registerController = asyncHandler(async (req, res) => {
  const { userName, email, password, phone, address, answer } = req.body;

  if (!userName || !email || !password || !address || !phone || !answer) {
    throw new ApiError(400, "Please provide all required fields");
  }

  // Check existing user
  const existing = await User.findOne({ email });
  if (existing) {
    throw new ApiError(400, "Email already registered, please login");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const user = await User.create({
    userName,
    email,
    password: hashedPassword,
    address,
    phone,
    answer,
  });

  // Remove password from response
  user.password = undefined;

  return res
    .status(201)
    .json(new ApiResponse(201, user, "User registered successfully"));
});

// LOGIN USER
const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Please provide email and password");
  }

  // Check user existence
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  // Generate JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_SECRET_EXPIRY,
  });

  user.password = undefined;

  return res
    .status(200)
    .json(new ApiResponse(200, { token, user }, "Login successful"));
});

export { registerController, loginController };
