import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    description: {
        type: String,
        required: true,
        minLength: 50,
        maxLength: 350
    },
    category: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
        minLength: 20
    },
    fixedSalary: {
        type: Number,
        min: 1000,
        max: 999999999
    },
    salaryFrom: {
        type: Number,
        min: 1000,
        max: 999999999
    },
    salaryTo: {
        type: Number,
        min: 1000,
        max: 999999999
    },
    expired: {
        type: Boolean,
        default: false
    },
    jobPostedOn: {
        type: Date,
        default: Date.now
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    }
});

const Job = mongoose.model("Job", jobSchema);
export default Job;
