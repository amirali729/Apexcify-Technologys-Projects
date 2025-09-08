import express from "express";
import { getUser } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/me", isAuthenticated, getUser);

export default router;
