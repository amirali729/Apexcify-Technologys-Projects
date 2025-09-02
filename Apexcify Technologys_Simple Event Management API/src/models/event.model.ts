import mongoose, { Document, Schema } from "mongoose";

// interface
export interface IEvent extends Document {
  name: string;
  date: Date;
  location: string;
  description?: string;
  attendees: string[];
  createdBy: mongoose.Types.ObjectId;
}

const EventSchema: Schema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String },
  attendees: {
    type: [String],
    default: [],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model<IEvent>("Event", EventSchema);