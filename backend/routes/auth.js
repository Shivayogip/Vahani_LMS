import express from "express";
import admin from "../firebaseAdmin.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/firebase-login", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = await admin.auth().verifyIdToken(token);

    const { uid, email, name } = decoded;

    let user = await User.findOne({ firebaseUID: uid });

    if (!user) {
      user = new User({
        firebaseUID: uid,
        email: email,
        name: name || "New User"
      });

      await user.save();
    }

    res.json({ message: "User authenticated", user });

  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
});

export default router;