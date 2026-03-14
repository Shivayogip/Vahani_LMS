import admin from "../config/firebaseAdmin.js";
import User from "../models/User.js";

export const firebaseLogin = async (req, res) => {
  try {

    const token = req.headers.authorization.split(" ")[1];

    const decoded = await admin.auth().verifyIdToken(token);

    const { uid, email } = decoded;

    const { role } = req.body;

    let user = await User.findOne({ firebaseUID: uid });

    if (!user) {
      user = new User({
        firebaseUID: uid,
        email,
        role: role || "scholar"
      });

      await user.save();
    }

    res.json({
      message: "User authenticated",
      user
    });

  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Invalid Firebase token" });
  }
};