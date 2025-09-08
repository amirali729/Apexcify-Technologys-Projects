import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { fileURLToPath } from "url";
import path from "path";

import userRoutes from "./routes/user.routes.js";
import jobRoutes from "./routes/job.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CORS,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Routes
app.use("/api/user", userRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/application", applicationRoutes);

// Global Error Middleware
app.use(errorMiddleware);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((error) => console.error("❌ MongoDB connection error:", error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
