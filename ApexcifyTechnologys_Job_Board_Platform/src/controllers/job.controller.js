import Job from "../models/Job.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Get all jobs
const getAllJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ expired: false });
  res.status(200).json(new ApiResponse(200, jobs, "Jobs fetched successfully"));
});

// Post a job
const postJob = asyncHandler(async (req, res) => {
  if (req.user.role === "Job Seeker") {
    throw new ApiError(403, "Job Seeker is not allowed to post jobs");
  }

  const { title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo } =
    req.body;

  if (!title || !description || !category || !country || !city || !location) {
    throw new ApiError(400, "Please provide full job details");
  }

  if ((!salaryFrom || !salaryTo) && !fixedSalary) {
    throw new ApiError(400, "Please either provide fixed salary or ranged salary");
  }

  if (salaryFrom && salaryTo && fixedSalary) {
    throw new ApiError(400, "Cannot enter fixed and ranged salary together");
  }

  const job = await Job.create({
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
    postedBy: req.user._id,
  });

  res.status(201).json(new ApiResponse(201, job, "Job posted successfully"));
});

// Get a single job by ID
const getSingleJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  res.status(200).json(new ApiResponse(200, job, "Job fetched successfully"));
});

// Update a job
const updateJob = asyncHandler(async (req, res) => {
  let job = await Job.findById(req.params.id);

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  if (job.postedBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to update this job");
  }

  job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(new ApiResponse(200, job, "Job updated successfully"));
});

// Delete a job
const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  if (job.postedBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to delete this job");
  }

  await job.deleteOne();

  res.status(200).json(new ApiResponse(200, null, "Job deleted successfully"));
});

// Get jobs posted by the logged-in employer
const getMyJobs = asyncHandler(async (req, res) => {
  if (req.user.role !== "Employer") {
    throw new ApiError(403, "Only employers can view their jobs");
  }

  const jobs = await Job.find({ postedBy: req.user._id });

  res.status(200).json(new ApiResponse(200, jobs, "Your jobs fetched successfully"));
});

export { getAllJobs,
  postJob,
  getMyJobs,
  updateJob,
  deleteJob,
  getSingleJob, };
