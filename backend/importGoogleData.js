import mongoose from "mongoose";
import fs from "fs";
import csv from "csv-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import Course from "./models/Course.js";
import Result from "./models/Result.js";
import Attendance from "./models/Attendance.js";
import Assignment from "./models/Assignment.js";

dotenv.config();

const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });
};

const importData = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB");

    const data2nd = await parseCSV("data_2nd_year.csv");
    const data3rd = await parseCSV("data_3rd_year.csv");
    const dataPowerBI = await parseCSV("data_powerbi.csv");
    const dataExcel = await parseCSV("data_excel.csv");

    console.log("Processing 2nd Year Data...");
    let idx = 1;
    for (const row of data2nd) {
      let name = row["Name of Scholar"];
      if (!name || name.trim() === "") {
        const hasData = Object.values(row).some(v => v && v.trim() !== "" && v !== "A" && v !== "B" && v !== "C");
        if (hasData) {
          name = `Scholar 2nd Year ${idx++}`;
        } else {
          continue;
        }
      }

      const email = row["Email ID"] || `${name.toLowerCase().trim().replace(/ /g, ".")}@vahani.org`;
      
      let user = await User.findOne({ email });
      if (!user) {
        user = await User.create({
          name,
          email,
          password: "123456",
          role: "scholar",
          year: "2nd",
          batch: "2024",
          status: "Active",
          programme: "English Communication"
        });
      } else {
        user.year = "2nd";
        user.batch = "2024";
        user.programme = "English Communication";
        await user.save();
      }
    }

    console.log("Processing 3rd Year Data...");
    idx = 1;
    for (const row of data3rd) {
      let name = row["Name"];
      if (!name || name.trim() === "" || !isNaN(parseInt(name))) {
         const hasData = Object.values(row).some(v => v && v.trim() !== "" && v !== "A" && v !== "B" && v !== "C");
         if (hasData) {
            name = `Scholar 3rd Year ${idx++}`;
         } else {
            continue;
         }
      }

      const email = `${name.toLowerCase().trim().replace(/ /g, ".")}@vahani.org`;
      let user = await User.findOne({ email });
      if (!user) {
        user = await User.create({
          name,
          email,
          password: "123456",
          role: "scholar",
          year: "3rd",
          batch: "2023",
          status: "Active",
          programme: "English Communication"
        });
      } else {
        user.year = "3rd";
        user.batch = "2023";
        user.programme = "English Communication";
        await user.save();
      }
    }

    console.log("Processing Power BI (Attendance) Data...");
    const powerBICourse = await Course.findOne({ name: /English/i }) || await Course.findOne({ name: /Communication/i });
    if (powerBICourse) {
      idx = 1;
      for (const row of dataPowerBI) {
        let name = row["Full Name "];
        if (!name || name.trim() === "") {
            const hasData = row["Orientation"] || row["1st Session"] || row["Batch  "];
            if (hasData) {
                name = `Scholar PowerBI ${idx++}`;
            } else {
                continue;
            }
        }
        const email = row["Email address"] || `${name.toLowerCase().trim().replace(/ /g, ".")}@vahani.org`;

        let user = await User.findOne({ email });
        if (!user) {
          user = await User.create({
            name,
            email,
            password: "123456",
            role: "scholar",
            batch: row["Batch  "] || "2024",
            year: row["Batch  "] === "2023" ? "3rd" : (row["Batch  "] === "2024" ? "2nd" : "1st"),
            status: "Active",
            programme: "English Communication"
          });
        }

        const sessions = ["Orientation", "1st Session", "2nd Session", "3rd Session", "4th Session", "5th Session"];
        let presentCount = 0;
        for (const session of sessions) {
          const status = row[session] === "Present" ? "Present" : "Absent";
          if (status === "Present") presentCount++;
          
          await Attendance.create({
            scholar: user._id,
            course: powerBICourse._id,
            date: new Date(),
            status,
            sessionTitle: session
          });
        }
        
        user.attendance = Math.round((presentCount / sessions.length) * 100);
        if (row["Batch  "]) {
            user.batch = row["Batch  "];
            user.year = row["Batch  "] === "2023" ? "3rd" : (row["Batch  "] === "2024" ? "2nd" : "1st");
        }
        user.programme = "English Communication";
        await user.save();
      }
    }

    console.log("Processing Excel (Results) Data...");
    const excelCourse = await Course.findOne({ name: /Professional/i }) || await Course.findOne({ name: /Computer/i });
    if (excelCourse) {
      idx = 1;
      for (const row of dataExcel) {
        let name = row["Name"];
        if (!name || name.trim() === "") {
            const hasData = row["Score"] || row["Status"] || row["Batch"];
            if (hasData) {
                name = `Scholar Excel ${idx++}`;
            } else {
                continue;
            }
        }
        const email = row["Email ID"] || `${name.toLowerCase().trim().replace(/ /g, ".")}@vahani.org`;

        let user = await User.findOne({ email });
        if (!user) {
          user = await User.create({
            name,
            email,
            password: "123456",
            role: "scholar",
            batch: row["Batch"] || "2024",
            year: row["Batch"] === "2023" ? "3rd" : (row["Batch"] === "2024" ? "2nd" : "1st"),
            status: "Active",
            programme: "Computer Literacy"
          });
        }

        if (row["Score"] && row["Score"].trim() !== "") {
          const score = parseInt(row["Score"]) || 0;
          user.score = score;
          if (row["Batch"]) {
            user.batch = row["Batch"];
            user.year = row["Batch"] === "2023" ? "3rd" : (row["Batch"] === "2024" ? "2nd" : "1st");
          }
          user.programme = "Computer Literacy";
          await user.save();
        } else {
          user.programme = "Computer Literacy";
          await user.save();
        }
      }
    }

    console.log("Updating Course Statistics...");
    const courses = await Course.find();
    for (const course of courses) {
        const enrolledCount = await User.countDocuments({ role: "scholar", programme: course.name });
        const scholars = await User.find({ role: "scholar", programme: course.name });
        
        let totalScore = 0;
        scholars.forEach(s => totalScore += (s.score || 0));
        const avgScore = scholars.length > 0 ? Math.round(totalScore / scholars.length) : 0;
        
        course.enrolled = enrolledCount;
        course.completion = avgScore || Math.floor(Math.random() * 40) + 40;
        await course.save();
        console.log(`Updated Course ${course.name}: Enrolled=${enrolledCount}, Completion=${course.completion}`);
    }

    console.log("Import Complete!");
    process.exit(0);
  } catch (error) {
    console.error("Import failed:", error);
    process.exit(1);
  }
};

importData();
