import Analytics from "../models/analytics.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Increment event count
const trackEvent = asyncHandler(async (req, res) => {
  const { event } = req.body;
  let record = await Analytics.findOne({ event });

  if (record) {
    record.count += 1;
    await record.save();
  } else {
    record = await Analytics.create({ event, count: 1 });
  }

  res.status(200).json(new ApiResponse(200, record, "Event tracked successfully"));
});

// Get analytics
const getAnalytics = asyncHandler(async (req, res) => {
  const analytics = await Analytics.find();
  res.status(200).json(new ApiResponse(200, analytics, "Analytics fetched successfully"));
});

export { trackEvent, getAnalytics };
