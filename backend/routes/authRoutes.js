import express from "express";
import { firebaseLogin, login, register } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/firebase-login", firebaseLogin);

export default router;