import { Router } from "express";

import {authMiddleware} from "../middlewares/auth.middleware.js"
import { createResturantController,
  getAllResturantController,
  getResturantByIdController,
  deleteResturantController
} from "../controllers/restaurant.controller.js"

const router = Router()

//routes
// CRAETE RESTURANT || POST
router.post("/create", authMiddleware, createResturantController);

// GET ALL RESTURANTS || GET
router.get("/getAll", getAllResturantController);

// GET RESTURANT BY ID || GET
router.get("/get/:id", getResturantByIdController);

// DELETE RESTURANT || DELETE
router.delete("/delete/:id", authMiddleware, deleteResturantController);

export default router