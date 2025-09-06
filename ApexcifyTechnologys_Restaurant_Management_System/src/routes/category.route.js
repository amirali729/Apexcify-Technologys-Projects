import { Router } from "express";


import {authMiddleware}  from "../middlewares/auth.middleware.js"
import {
    createCatController,
    getAllCatController,
    updateCatController,
    deleteCatController
} from "../controllers/category.controller.js"
const router = Router()


//routes
// CREATE CAT
router.post("/create", authMiddleware, createCatController);

//GET ALL CAT
router.get("/getAll", getAllCatController);

// UPDATE CAT
router.put("/update/:id", authMiddleware, updateCatController);

// DLEETE CAT
router.delete("/delete/:id", authMiddleware, deleteCatController);
export default router