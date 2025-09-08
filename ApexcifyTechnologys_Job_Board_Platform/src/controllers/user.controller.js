import User from "../models/user.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Register User
const register = asyncHandler(async (req, res) => {
  const { name, email, phone, password, role } = req.body;

  if (!name || !email || !phone || !password || !role) {
    throw new ApiError(400, "Please fill all fields");
  }

  const isEmail = await User.findOne({ email });
  if (isEmail) throw new ApiError(400, "Email already registered");

  const user = await User.create({ name, email, phone, password, role });
  const token = user.getJWTToken();

  res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    })
    .json(new ApiResponse(201, { user, token }, "User registered successfully"));
});

// Login User
const login = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    throw new ApiError(400, "Please provide email, password and role");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new ApiError(400, "Invalid email or password");

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) throw new ApiError(400, "Invalid email or password");

  if (user.role !== role) throw new ApiError(400, "User role does not match");

  const token = user.getJWTToken();
  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    })
    .json(new ApiResponse(200, { user, token }, "User logged in successfully"));
});

// Logout User
const logout = asyncHandler(async (req, res) => {
  res
    .status(200)
    .cookie("token", "", { httpOnly: true, expires: new Date(Date.now()) })
    .json(new ApiResponse(200, null, "Logged out successfully"));
});

// Get Current User
const getUser = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, req.user, "User fetched successfully"));
});

export { register, login, logout, getUser };
