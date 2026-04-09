import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import User from "./models/User.js";
import Course from "./models/Course.js";
import Assignment from "./models/Assignment.js";
import Resource from "./models/Resource.js";
import Activity from "./models/Activity.js";

dotenv.config();

const SCHOLARS = [
  {name:"Aarav Mehta",email:"aarav@vahani.org",password:"123456",year:"2nd",programme:"Computer Science",attendance:94,score:88,status:"Active",batch:"2024"},
  {name:"Priya Sharma",email:"priya@vahani.org",password:"123456",year:"1st",programme:"Engineering",attendance:87,score:76,status:"Active",batch:"2025"},
  {name:"Rohan Verma",email:"rohan@vahani.org",password:"123456",year:"3rd",programme:"Medicine",attendance:91,score:92,status:"Active",batch:"2023"},
  {name:"Sneha Patel",email:"sneha@vahani.org",password:"123456",year:"2nd",programme:"Law",attendance:78,score:65,status:"At Risk",batch:"2024"},
  {name:"Kabir Singh",email:"kabir@vahani.org",password:"123456",year:"1st",programme:"Architecture",attendance:96,score:84,status:"Active",batch:"2025"},
  {name:"Anjali Nair",email:"anjali@vahani.org",password:"123456",year:"3rd",programme:"Computer Science",attendance:72,score:58,status:"At Risk",batch:"2023"},
  {name:"Dev Joshi",email:"dev@vahani.org",password:"123456",year:"2nd",programme:"Engineering",attendance:89,score:91,status:"Active",batch:"2024"},
  {name:"Meera Iyer",email:"meera@vahani.org",password:"123456",year:"1st",programme:"Medicine",attendance:100,score:97,status:"Active",batch:"2025"}
];

const TRAINERS = [
  {name:"Dr. Sunita Rao",email:"sunita@vahani.org",password:"123456",subject:"English Communication",sessions:28,rating:4.8},
  {name:"Prof. Alok Gupta",email:"alok@vahani.org",password:"123456",subject:"Professional Literacy",sessions:32,rating:4.6},
  {name:"Ms. Ritu Kapoor",email:"ritu@vahani.org",password:"123456",subject:"Computer Literacy",sessions:24,rating:4.9},
  {name:"Mr. Vikram Nair",email:"vikram@vahani.org",password:"123456",subject:"Career Development",sessions:18,rating:4.7}
];

const PROGRAMMES = [
  {name:"English Communication",enrolled:45,capacity:50,completion:90,resourcesCount:12,trainerName:"Dr. Sunita Rao",color:"#0D1B5E"},
  {name:"Professional Literacy",enrolled:60,capacity:60,completion:75,resourcesCount:8,trainerName:"Prof. Alok Gupta",color:"#1A7F5A"},
  {name:"Computer Literacy",enrolled:55,capacity:60,completion:60,resourcesCount:15,trainerName:"Ms. Ritu Kapoor",color:"#5B35B0"},
  {name:"Career Development",enrolled:40,capacity:50,completion:95,resourcesCount:10,trainerName:"Mr. Vikram Nair",color:"#C0392B"},
  {name:"Leadership Workshop",enrolled:30,capacity:35,completion:45,resourcesCount:6,trainerName:"Dr. Sunita Rao",color:"#0E6E8C"},
  {name:"Financial Literacy",enrolled:50,capacity:50,completion:80,resourcesCount:9,trainerName:"Prof. Alok Gupta",color:"#7C3AED"}
];

const ASSIGNMENTS = [
  {title:"Resume Workshop Draft",programme:"Career Development",due:new Date("2026-03-18"),dueTime:"23:59",totalSubmissions:40,status:"Open",points:100,instructions:"Create the first polished draft of your one-page resume. Highlight your education, achievements, leadership roles, and any project work that supports the career path you want to pursue.",checklist:["One-page resume in PDF format","Clear headline and summary","At least two quantified achievements"]},
  {title:"Excel Data Analysis",programme:"Computer Literacy",due:new Date("2026-03-20"),dueTime:"18:00",totalSubmissions:55,status:"Open",points:25,instructions:"Download the learner dataset, clean the raw values, create three formulas, and present your findings in a single workbook with a summary sheet for key trends.",checklist:["Completed workbook with formulas","Summary sheet with three insights","Clearly labelled tabs and charts"]},
  {title:"English Essay – Leadership",programme:"English Communication",due:new Date("2026-03-15"),dueTime:"23:59",totalSubmissions:45,status:"Closed",points:15,instructions:"Write a short reflective essay on leadership using one real example from your academic or community experience. Focus on clarity, structure, and persuasive language.",checklist:["700 to 900 words","One personal example","Strong introduction and conclusion"]},
  {title:"Business Case Study",programme:"Professional Literacy",due:new Date("2026-03-25"),dueTime:"17:30",totalSubmissions:60,status:"Open",points:30,instructions:"Read the provided business scenario and prepare a concise case study response covering the core challenge, your recommendation, and the expected outcome for the organisation.",checklist:["Problem statement","Recommended action plan","Expected impact in 3 bullet points"]},
  {title:"Public Speaking Recording",programme:"English Communication",due:new Date("2026-03-30"),dueTime:"20:00",totalSubmissions:45,status:"Open",points:10,instructions:"Record a two-minute speaking practice video based on the topic shared in class. Your submission should demonstrate confidence, pacing, and clear articulation.",checklist:["Video under 2 minutes","Visible speaker frame","Confident opening and closing"]}
];

const RESOURCES = [
  {title:"English Grammar Masterclass",type:"Video",programme:"English Communication",url:"#",tags:["Grammar","Video"]},
  {title:"Resume Templates Pack",type:"Document",programme:"Career Development",url:"#",tags:["Template"]},
  {title:"Excel Advanced Formulas",type:"Document",programme:"Computer Literacy",url:"#",tags:["Excel"]},
  {title:"Power BI Dashboard Tutorial",type:"Video",programme:"Computer Literacy",url:"#",tags:["Data"]},
  {title:"Professional Email Writing",type:"Document",programme:"Professional Literacy",url:"#",tags:["Writing"]},
  {title:"Financial Planning Basics",type:"Document",programme:"Financial Literacy",url:"#",tags:["Finance"]}
];

const ACTIVITIES = [
  {name:"Public Speaking Workshop",type:"Academic",date:"15 Mar 2026",capacity:40,registered:28},
  {name:"Annual Cultural Fest",type:"Cultural",date:"22 Mar 2026",capacity:120,registered:95},
  {name:"Football Tournament",type:"Sports",date:"28 Mar 2026",capacity:60,registered:42},
  {name:"UI/UX Design Sprint",type:"Creative",date:"05 Apr 2026",capacity:30,registered:18}
];

const seedDB = async () => {
  try {
    await connectDB();

    console.log("Clearing Existing Data...");
    try { await User.collection.drop(); } catch (e) {}
    try { await Course.collection.drop(); } catch (e) {}
    try { await Assignment.collection.drop(); } catch (e) {}
    try { await Resource.collection.drop(); } catch (e) {}
    try { await Activity.collection.drop(); } catch (e) {}

    console.log("Creating Admin...");
    await User.create({
      name: "Admin User",
      email: "admin@vahani.org",
      password: "adminpassword",
      role: "admin"
    });

    console.log("Creating Trainers...");
    const trainerDict = {};
    for (let t of TRAINERS) {
      const user = await User.create({
        ...t,
        role: "trainer",
        status: "Active"
      });
      trainerDict[t.name] = user._id;
    }

    console.log("Creating Scholars...");
    for (let s of SCHOLARS) {
      await User.create({
        ...s,
        role: "scholar"
      });
    }

    console.log("Creating Courses...");
    const courseDict = {};
    for (let p of PROGRAMMES) {
      const course = await Course.create({
        name: p.name,
        capacity: p.capacity,
        enrolled: p.enrolled,
        completion: p.completion,
        resourcesCount: p.resourcesCount,
        color: p.color,
        description: "A standard programme",
        trainer: trainerDict[p.trainerName]
      });
      courseDict[p.name] = course._id;
    }

    console.log("Creating Assignments...");
    for (let a of ASSIGNMENTS) {
      const cID = courseDict[a.programme];
      if(cID) {
        await Assignment.create({
          ...a,
          course: cID
        });
      }
    }

    console.log("Creating Resources...");
    for (let r of RESOURCES) {
      const cID = courseDict[r.programme];
      if(cID) {
         await Resource.create({
          title: r.title,
          type: r.type,
          url: r.url,
          tags: r.tags,
          course: cID
        });
      }
    }

    console.log("Creating Activities...");
    for (let a of ACTIVITIES) {
      await Activity.create(a);
    }

    console.log("Data Seeded Successfully!");
    process.exit(0);

  } catch (error) {
    console.error("Error with data import: ", error);
    process.exit(1);
  }
};

seedDB();