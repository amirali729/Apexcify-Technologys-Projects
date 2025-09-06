// controllers/foodController.js
import foodModel from "../models/foodModal.js";
import orderModel from "../models/orderModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// CREATE FOOD
const createFoodController = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    imageUrl,
    foodTags,
    catgeory,
    code,
    isAvailabe,
    resturnat,
    rating,
  } = req.body;

  if (!title || !description || !price || !resturnat) {
    throw new ApiError(400, "Please provide all required fields");
  }

  const newFood = new foodModel({
    title,
    description,
    price,
    imageUrl,
    foodTags,
    catgeory,
    code,
    isAvailabe,
    resturnat,
    rating,
  });

  await newFood.save();

  return res
    .status(201)
    .json(new ApiResponse(201, newFood, "New food item created successfully"));
});

// GET ALL FOODS
const getAllFoodsController = asyncHandler(async (req, res) => {
  const foods = await foodModel.find({});
  if (!foods || foods.length === 0) {
    throw new ApiError(404, "No food items found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { totalFoods: foods.length, foods }, "All foods fetched"));
});

// GET SINGLE FOOD
const getSingleFoodController = asyncHandler(async (req, res) => {
  const foodId = req.params.id;
  if (!foodId) throw new ApiError(400, "Please provide food ID");

  const food = await foodModel.findById(foodId);
  if (!food) throw new ApiError(404, "No food found with this ID");

  return res.status(200).json(new ApiResponse(200, food, "Food fetched successfully"));
});

// GET FOOD BY RESTAURANT
const getFoodByResturantController = asyncHandler(async (req, res) => {
  const resturantId = req.params.id;
  if (!resturantId) throw new ApiError(400, "Please provide restaurant ID");

  const foods = await foodModel.find({ resturnat: resturantId });
  if (!foods || foods.length === 0) {
    throw new ApiError(404, "No food items found for this restaurant");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, foods, "Foods fetched by restaurant successfully"));
});

// UPDATE FOOD
const updateFoodController = asyncHandler(async (req, res) => {
  const foodId = req.params.id;
  if (!foodId) throw new ApiError(400, "Please provide food ID");

  const food = await foodModel.findById(foodId);
  if (!food) throw new ApiError(404, "Food not found");

  const updatedFood = await foodModel.findByIdAndUpdate(foodId, req.body, { new: true });

  return res
    .status(200)
    .json(new ApiResponse(200, updatedFood, "Food item updated successfully"));
});

// DELETE FOOD
const deleteFoodController = asyncHandler(async (req, res) => {
  const foodId = req.params.id;
  if (!foodId) throw new ApiError(400, "Please provide food ID");

  const food = await foodModel.findById(foodId);
  if (!food) throw new ApiError(404, "Food not found");

  await foodModel.findByIdAndDelete(foodId);

  return res.status(200).json(new ApiResponse(200, null, "Food item deleted successfully"));
});

// PLACE ORDER
const placeOrderController = asyncHandler(async (req, res) => {
  const { cart } = req.body;
  if (!cart || cart.length === 0) {
    throw new ApiError(400, "Please provide a valid food cart");
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const newOrder = new orderModel({
    foods: cart,
    payment: total,
    buyer: req.body.id,
  });

  await newOrder.save();

  return res
    .status(201)
    .json(new ApiResponse(201, newOrder, "Order placed successfully"));
});

// CHANGE ORDER STATUS
const orderStatusController = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  if (!orderId) throw new ApiError(400, "Please provide valid order ID");

  const { status } = req.body;
  const order = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
  if (!order) throw new ApiError(404, "Order not found");

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order status updated successfully"));
});

export {
  createFoodController,
  getAllFoodsController,
  getSingleFoodController,
  getFoodByResturantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
};
