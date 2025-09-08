import Job from "../models/Job.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getAllJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ expired: false });
  res.status(200).json(new ApiResponse(200, jobs, "Jobs fetched successfully"));
});

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

// ... (update, delete, single job would be similar)

export { getAllJobs, postJob };
