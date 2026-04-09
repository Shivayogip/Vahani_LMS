import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["Sports", "Cultural", "Academic", "Creative"], default: "Academic" },
  date: { type: String, required: true },
  capacity: { type: Number, default: 50 },
  registered: { type: Number, default: 0 },
  description: String,
  status: { type: String, enum: ["Open", "Closed"], default: "Open" }
}, { timestamps: true });

export default mongoose.model("Activity", activitySchema);