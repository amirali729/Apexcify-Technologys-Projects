import express from "express";
import { trackEvent, getAnalytics } from "../controllers/analytics.controller.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/track", trackEvent);
router.get("/", isAuthenticated, isAuthorized("Employer"), getAnalytics);

export default router;
