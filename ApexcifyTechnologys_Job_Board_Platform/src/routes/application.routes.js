import express from "express";
import {
  postApplication,
  employerGetAllApplications,
  jobseekerGetAllApplications,
  jobseekerDeleteApplication,
  updateApplicationStatus,
} from "../controllers/applicationController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Jobseeker
router.post("/apply", isAuthenticated, isAuthorized("Job Seeker"), postApplication);
router.get("/jobseeker", isAuthenticated, isAuthorized("Job Seeker"), jobseekerGetAllApplications);
router.delete(
  "/jobseeker/:id",
  isAuthenticated,
  isAuthorized("Job Seeker"),
  jobseekerDeleteApplication
);

// Employer
router.get("/employer", isAuthenticated, isAuthorized("Employer"), employerGetAllApplications);
router.put(
  "/employer/:id",
  isAuthenticated,
  isAuthorized("Employer"),
  updateApplicationStatus
);

export default router;
