import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  assignment: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment", required: true },
  scholar: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  files: [{
    name: String,
    size: String,
    url: String,
    uploadedAt: { type: Date, default: Date.now }
  }],
  submittedAt: { type: Date, default: Date.now },
  pointsAwarded: { type: Number, default: 0 },
  feedback: String,
  status: { type: String, enum: ["Submitted", "Graded", "Late"], default: "Submitted" }
}, { timestamps: true });

export default mongoose.model("Submission", submissionSchema);