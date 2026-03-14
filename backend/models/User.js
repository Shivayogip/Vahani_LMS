import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firebaseUID: String,
  email: String,
  name: String,
  role: {
    type: String,
    default: "student"
  }
});

export default mongoose.model("User", userSchema);