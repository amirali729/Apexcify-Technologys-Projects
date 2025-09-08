import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 30 },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (email) =>
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
      message: "Please provide a valid email"
    }
  },
  coverLetter: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  resume: {
    public_id: { type: String, required: true },
    url: { type: String, required: true }
  },
  applicantID: {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    role: { type: String, enum: ["Job Seeker"], required: true }
  },
  employerID: {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    role: { type: String, enum: ["Employer"], required: true }
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending"
  }
});

const Application = mongoose.model("Application", applicationSchema);
export default Application;
