import asyncHandler from "../middleware/asyncHandler.js";
import Resume from "../models/resumeModel.js";
import path from "path";
import fs from "fs";

// ---------------- CREATE RESUME ----------------
export const createResume = asyncHandler(async (req, res) => {
  try {
    const { title } = req.body;

    // Default structure for a new resume
    const defaultResumeData = {
      profileInfo: {
        profileImg: null,
        previewUrl: "",
        fullName: "",
        designation: "",
        summary: "",
      },
      contactInfo: {
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        github: "",
        website: "",
      },
      workExperience: [
        { company: "", role: "", startDate: "", endDate: "", description: "" },
      ],
      education: [
        { degree: "", institution: "", startDate: "", endDate: "" },
      ],
      skills: [{ name: "", progress: 0 }],
      projects: [
        { title: "", description: "", github: "", liveDemo: "" },
      ],
      certifications: [{ title: "", issuer: "", year: "" }],
      languages: [{ name: "", progress: 0 }],   // ✅ fixed
      interests: [""],
    };

    const newResume = await Resume.create({
      userId: req.user._id,
      title,
      ...defaultResumeData,
      ...req.body,
    });

    res.status(201).json(newResume);
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Failed to create resume" });
  }
});




// ---------------- GET ALL RESUMES OF LOGGED-IN USER ----------------
export const getUserResumes = asyncHandler(async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id }).sort({ updatedAt: -1 });
    res.status(200).json(resumes);   
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Failed to get resumes" });
  }
});




// ---------------- GET SINGLE RESUME BY ID ----------------
export const getResumeById = asyncHandler(async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,   
      userId: req.user._id,
    });

    if (!resume) return res.status(404).json({ message: "Resume not found" });

    res.json(resume);
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Failed to get specific resume" });
  }
});





// ---------------- UPDATE RESUME ----------------
export const updateResume = asyncHandler(async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,  
      userId: req.user._id,
    });

    if (!resume) return res.status(404).json({ message: "Resume not found" });

    Object.assign(resume, req.body);
    const savedResume = await resume.save();

    res.json(savedResume);
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Failed to update resume" });
  }
});





// ---------------- DELETE RESUME ----------------
export const deleteResume = asyncHandler(async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,   
      userId: req.user._id,
    });

    if (!resume) return res.status(404).json({ message: "Resume not found" });

    const uploadsFolder = path.join(process.cwd(), "uploads");

    // delete thumbnail if exists
    if (resume.thumbnailLink) {
      const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
      if (fs.existsSync(oldThumbnail)) fs.unlinkSync(oldThumbnail);
    }

    // delete profile preview if exists
    if (resume.profileInfo?.previewUrl) {   // ✅ fixed field name
      const oldProfile = path.join(uploadsFolder, path.basename(resume.profileInfo.previewUrl));
      if (fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile);
    }

    const deleted = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!deleted) return res.status(404).json({ message: "Not able to delete resume" });

    res.json({ message: "Resume deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Can't delete resume" });
  }
});
