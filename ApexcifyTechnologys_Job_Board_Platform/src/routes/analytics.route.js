import express from "express";
import { trackEvent, getAnalytics } from "../controllers/analyticsController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/track", trackEvent);
router.get("/", isAuthenticated, isAuthorized("Employer"), getAnalytics);

export default router;
