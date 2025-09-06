import { Router } from "express";


import {authMiddleware} from "../middlewares/auth.middleware.js"
import {adminMiddleware} from "../middlewares/admin.middleware.js"
import {
    createFoodController,
  getAllFoodsController,
  getSingleFoodController,
  getFoodByResturantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController
} from "../controllers/food.controller.js"

const router = Router()

router.post("/create", authMiddleware, createFoodController);

//GET ALL FOOD
router.get("/getAll", getAllFoodsController);

// GET SINGLE FOOD
router.get("/get/:id", getSingleFoodController);

// GET  FOOD by rest
router.get("/getByResturant/:id", getFoodByResturantController);

// UPDATE FOOD
router.put("/update/:id", authMiddleware, updateFoodController);

// DELETE FOOD
router.delete("/delete/:id", authMiddleware, deleteFoodController);

router.post("/placeorder", authMiddleware, placeOrderController);

// ORDER STATUS
router.post(
  "/orderStatus/:id",
  authMiddleware,
  adminMiddleware,
  orderStatusController
);

export default router