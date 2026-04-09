import express from "express";
import { getAllResources, getResourcesByCourse, uploadResource, deleteResource } from "../controllers/resourceController.js";

const router = express.Router();

router.get("/", getAllResources);
router.get("/course/:courseId", getResourcesByCourse);
router.post("/", uploadResource);
router.delete("/:id", deleteResource);

export default router;