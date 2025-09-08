import { ApiError } from "../utils/ApiError.js";

// Middleware to check if file is uploaded
const uploadMiddleware = (req, res, next) => {
  if (!req.files || !req.files.resume) {
    throw new ApiError(400, "Resume file is required");
  }

  const { resume } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp", "application/pdf"];

  if (!allowedFormats.includes(resume.mimetype)) {
    throw new ApiError(
      400,
      "Invalid file type. Please upload PNG, JPG, WEBP, or PDF"
    );
  }

  next();
};

export { uploadMiddleware };
