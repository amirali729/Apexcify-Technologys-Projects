import express from "express";
import {
  getAllJobs,
  postJob,
  getMyJobs,
  updateJob,
  deleteJob,
  getSingleJob,
} from "../controllers/jobController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getAllJobs);
router.get("/:id", getSingleJob);
router.post("/post", isAuthenticated, isAuthorized("Employer"), postJob);
router.get("/my/jobs", isAuthenticated, isAuthorized("Employer"), getMyJobs);
router.put("/update/:id", isAuthenticated, isAuthorized("Employer"), updateJob);
router.delete("/delete/:id", isAuthenticated, isAuthorized("Employer"), deleteJob);

export default router;
