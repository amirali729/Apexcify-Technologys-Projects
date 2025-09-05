import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema(
  {
    foods: [{ type: mongoose.Schema.Types.ObjectId, ref: "Foods" }],
    payment: {},
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["preparing", "prepare", "on the way", "deliverd"],
      default: "preparing",
    },
  },
  { timestamps: true }
);
export const Order = mongoose.model("Order", ordersSchema)