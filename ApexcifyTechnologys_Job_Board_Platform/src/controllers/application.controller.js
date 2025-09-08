import Application from "../models/application.model.js";
import Job from "../models/Job.model.js";
import cloudinary from "cloudinary";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

// Post Application
const postApplication = asyncHandler(async (req, res) => {
  if (req.user.role === "Employer") {
    throw new ApiError(403, "Employer is not allowed to apply");
  }

  if (!req.files || !req.files.resume) {
    throw new ApiError(400, "Resume file required");
  }

  const { resume } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(resume.mimetype)) {
    throw new ApiError(400, "Invalid file type. Please upload PNG, JPG, or WEBP");
  }

  const cloudinaryResponse = await cloudinary.v2.uploader.upload(resume.tempFilePath);
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    throw new ApiError(500, "Failed to upload resume");
  }

  const { name, email, coverLetter, phone, address, jobId } = req.body;

  const jobDetails = await Job.findById(jobId);
  if (!jobDetails) throw new ApiError(404, "Job not found");

  const application = await Application.create({
    name,
    email,
    coverLetter,
    phone,
    address,
    applicantID: { user: req.user._id, role: "Job Seeker" },
    employerID: { user: jobDetails.postedBy, role: "Employer" },
    resume: { public_id: cloudinaryResponse.public_id, url: cloudinaryResponse.secure_url },
  });

  res.status(201).json(new ApiResponse(201, application, "Application submitted successfully"));
});

// Employer: Get All Applications
const employerGetAllApplications = asyncHandler(async (req, res) => {
  if (req.user.role === "Job Seeker") {
    throw new ApiError(403, "Job Seeker is not allowed");
  }

  const applications = await Application.find({ "employerID.user": req.user._id });
  res.status(200).json(new ApiResponse(200, applications, "Applications fetched successfully"));
});

// Jobseeker: Get All Applications
const jobseekerGetAllApplications = asyncHandler(async (req, res) => {
  if (req.user.role === "Employer") {
    throw new ApiError(403, "Employer is not allowed");
  }

  const applications = await Application.find({ "applicantID.user": req.user._id });
  res.status(200).json(new ApiResponse(200, applications, "Applications fetched successfully"));
});

// Jobseeker: Delete Application
const jobseekerDeleteApplication = asyncHandler(async (req, res) => {
  if (req.user.role === "Employer") {
    throw new ApiError(403, "Employer is not allowed");
  }

  const application = await Application.findById(req.params.id);
  if (!application) throw new ApiError(404, "Application not found");

  await application.deleteOne();
  res.status(200).json(new ApiResponse(200, null, "Application deleted successfully"));
});

// Employer: Update Application Status
const updateApplicationStatus = asyncHandler(async (req, res) => {
  if (req.user.role === "Job Seeker") {
    throw new ApiError(403, "Job Seeker is not allowed");
  }

  const { status } = req.body;
  if (!status) throw new ApiError(400, "Status is required");

  const application = await Application.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );

  if (!application) throw new ApiError(404, "Application not found");

  res
    .status(200)
    .json(new ApiResponse(200, application, "Application status updated successfully"));
});

export {
  postApplication,
  employerGetAllApplications,
  jobseekerGetAllApplications,
  jobseekerDeleteApplication,
  updateApplicationStatus,
};
