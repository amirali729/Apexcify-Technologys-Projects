// controllers/resturantController.js
import { Restaurant } from "../models/restaurant.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// CREATE RESTAURANT
const createResturantController = asyncHandler(async (req, res) => {
  const {
    title,
    imageUrl,
    foods,
    time,
    pickup,
    delivery,
    isOpen,
    logoUrl,
    rating,
    ratingCount,
    code,
    coords,
  } = req.body;

  if (!title || !coords) {
    throw new ApiError(400, "Please provide title and address/coordinates");
  }

  const newResturant = new Restaurant({
    title,
    imageUrl,
    foods,
    time,
    pickup,
    delivery,
    isOpen,
    logoUrl,
    rating,
    ratingCount,
    code,
    coords,
  });

  await newResturant.save();

  return res
    .status(201)
    .json(new ApiResponse(201, newResturant, "New restaurant created successfully"));
});

// GET ALL RESTAURANTS
const getAllResturantController = asyncHandler(async (req, res) => {
  const resturants = await Restaurant.find({});
  if (!resturants || resturants.length === 0) {
    throw new ApiError(404, "No restaurants available");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { totalCount: resturants.length, resturants }, "All restaurants fetched")
    );
});

// GET RESTAURANT BY ID
const getResturantByIdController = asyncHandler(async (req, res) => {
  const resturantId = req.params.id;
  if (!resturantId) {
    throw new ApiError(400, "Please provide restaurant ID");
  }

  const resturant = await Restaurant.findById(resturantId);
  if (!resturant) {
    throw new ApiError(404, "No restaurant found with this ID");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, resturant, "Restaurant fetched successfully"));
});

// DELETE RESTAURANT
const deleteResturantController = asyncHandler(async (req, res) => {
  const resturantId = req.params.id;
  if (!resturantId) {
    throw new ApiError(400, "Please provide restaurant ID");
  }

  const resturant = await Restaurant.findByIdAndDelete(resturantId);
  if (!resturant) {
    throw new ApiError(404, "No restaurant found to delete");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Restaurant deleted successfully"));
});

export {
  createResturantController,
  getAllResturantController,
  getResturantByIdController,
  deleteResturantController,
};
