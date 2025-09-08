import express from "express";
import { saveJob, getSavedJobs, removeSavedJob } from "../controllers/savedJob.controller.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/save", isAuthenticated, isAuthorized("Job Seeker"), saveJob);
router.get("/", isAuthenticated, isAuthorized("Job Seeker"), getSavedJobs);
router.delete("/:id", isAuthenticated, isAuthorized("Job Seeker"), removeSavedJob);

export default router;
