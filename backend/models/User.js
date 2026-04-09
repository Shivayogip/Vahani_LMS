import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: {
    type: String,
    enum: ["scholar", "trainer", "admin"],
    default: "scholar"
  },
  firebaseUID: { type: String }, // Optional now and not unique
  // Scholar specific fields
  year: String,
  programme: String,
  attendance: { type: Number, default: 0 },
  score: { type: Number, default: 0 },
  status: { type: String, enum: ["Active", "At Risk", "Inactive"], default: "Active" },
  batch: String,
  // Trainer specific fields
  subject: String,
  sessions: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  joined: { type: Date, default: Date.now }
}, { timestamps: true });

// Hash password before saving
userSchema.pre("save", async function() {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", userSchema);