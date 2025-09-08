import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(
  {
    event: { type: String, required: true },
    count: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Analytics", analyticsSchema);
