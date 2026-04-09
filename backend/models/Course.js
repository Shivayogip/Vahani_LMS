import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  capacity: { type: Number, default: 50 },
  enrolled: { type: Number, default: 0 },
  completion: { type: Number, default: 0 },
  resourcesCount: { type: Number, default: 0 },
  color: { type: String, default: "#0D1B5E" },
  status: { type: String, enum: ["Active", "Closed"], default: "Active" }
}, { timestamps: true });

export default mongoose.model("Course", courseSchema);