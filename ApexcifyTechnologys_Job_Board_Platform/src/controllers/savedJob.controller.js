import SavedJob from "../models/SavedJob.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Save a Job
const saveJob = asyncHandler(async (req, res) => {
  const { jobId } = req.body;
  if (!jobId) throw new ApiError(400, "Job ID is required");

  const saved = await SavedJob.create({ job: jobId, user: req.user._id });
  res.status(201).json(new ApiResponse(201, saved, "Job saved successfully"));
});

// Get Saved Jobs
const getSavedJobs = asyncHandler(async (req, res) => {
  const jobs = await SavedJob.find({ user: req.user._id }).populate("job");
  res.status(200).json(new ApiResponse(200, jobs, "Saved jobs fetched successfully"));
});

// Remove Saved Job
const removeSavedJob = asyncHandler(async (req, res) => {
  const savedJob = await SavedJob.findOneAndDelete({ job: req.params.id, user: req.user._id });
  if (!savedJob) throw new ApiError(404, "Saved job not found");

  res.status(200).json(new ApiResponse(200, null, "Saved job removed successfully"));
});

export { saveJob, getSavedJobs, removeSavedJob };
