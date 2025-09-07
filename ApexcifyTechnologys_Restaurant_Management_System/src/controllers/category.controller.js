// controllers/categoryController.js
import { Category } from "../models/category.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// CREATE CATEGORY
const createCatController = asyncHandler(async (req, res) => {
  const { title, imageUrl } = req.body;

  if (!title) {
    throw new ApiError(400, "Please provide category title");
  }

  const newCategory = new Category({ title, imageUrl });
  await newCategory.save();

  return res
    .status(201)
    .json(new ApiResponse(201, newCategory, "Category created successfully"));
});

// GET ALL CATEGORIES
const getAllCatController = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  if (!categories || categories.length === 0) {
    throw new ApiError(404, "No categories found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { totalCat: categories.length, categories },
        "All categories fetched successfully"
      )
    );
});

// UPDATE CATEGORY
const updateCatController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, imageUrl } = req.body;

  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    { title, imageUrl },
    { new: true }
  );

  if (!updatedCategory) {
    throw new ApiError(404, "Category not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedCategory, "Category updated successfully"));
});

// DELETE CATEGORY
const deleteCatController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new ApiError(400, "Please provide category ID");

  const category = await Category.findById(id);
  if (!category) throw new ApiError(404, "Category not found");

  await Category.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Category deleted successfully"));
});

export {
  createCatController,
  getAllCatController,
  updateCatController,
  deleteCatController,
};
