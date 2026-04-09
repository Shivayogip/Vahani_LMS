import User from "../models/User.js";
import jwt from "jsonwebtoken";
import admin from "../config/firebaseAdmin.js";

// Local Login (Email/Password)
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "lmssecret",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error during login" });
  }
};

// Local Register (Email/Password)
export const register = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    user = new User({
      email,
      password,
      name,
      role: role || "scholar"
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "lmssecret",
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error during registration" });
  }
};

// Keeping Firebase login as fallback if needed
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
        role: role || "scholar",
        password: Math.random().toString(36).slice(-8), // Dummy password for firebase users
        name: email.split("@")[0]
      });

      await user.save();
    }

    const localToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "lmssecret",
      { expiresIn: "1d" }
    );

    res.json({
      message: "User authenticated",
      token: localToken,
      user
    });

  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Invalid Firebase token" });
  }
};