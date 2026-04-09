import mongoose from "mongoose";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import dotenv from "dotenv";

dotenv.config();

const checkData = async () => {
  await connectDB();
  const total = await User.countDocuments();
  const scholars = await User.find({ role: "scholar" });
  
  console.log(`Total Users: ${total}`);
  console.log(`Total Scholars: ${scholars.length}`);
  
  const years = {};
  scholars.forEach(s => {
    years[s.year] = (years[s.year] || 0) + 1;
  });
  
  console.log("Scholar Year Distribution:", years);
  
  const sample = scholars.slice(0, 5).map(s => ({ name: s.name, email: s.email, year: s.year, batch: s.batch, attendance: s.attendance, score: s.score }));
  console.log("Sample Scholars:", sample);
  
  process.exit(0);
};

checkData();
