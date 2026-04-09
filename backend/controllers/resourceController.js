import Resource from "../models/Resource.js";

export const getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find().populate("course", "name").populate("uploadedBy", "name");
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getResourcesByCourse = async (req, res) => {
  try {
    const resources = await Resource.find({ course: req.params.courseId }).populate("uploadedBy", "name");
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const uploadResource = async (req, res) => {
  try {
    const resource = new Resource(req.body);
    await resource.save();
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) return res.status(404).json({ error: "Resource not found" });
    res.json({ message: "Resource deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};