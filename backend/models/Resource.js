import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ["PDF", "Video", "Link", "Document"], default: "Document" },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  url: { type: String, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  tags: [String]
}, { timestamps: true });

export default mongoose.model("Resource", resourceSchema);