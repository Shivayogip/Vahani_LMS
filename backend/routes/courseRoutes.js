import express from "express";
import verifyFirebaseToken from "../middleware/firebaseAuth.js";

const router = express.Router();

router.get("/", verifyFirebaseToken, (req,res)=>{
  res.json({message:"Courses fetched"});
});

export default router;