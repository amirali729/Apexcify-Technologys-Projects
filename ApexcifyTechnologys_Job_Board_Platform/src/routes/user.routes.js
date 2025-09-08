import express from "express";
import { getUser } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/me", isAuthenticated, getUser);

export default router;
