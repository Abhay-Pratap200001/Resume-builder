import fs from "fs";
import path from "path";
import Resume from "../models/resumeModel.js";
import upload from "../middleware/uploadMiddleware.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const uploadResumeImage = asyncHandler(async (req, res) => {
  try {
    // Multer middleware for handling two file fields
    upload.fields([{ name: "thumbnail" }, { name: "profileImage" }])
    (req, res, async (error) => {

        if (error) {
          return res.status(400).json({error: error.message, message: "Failed to upload file",});
        }

        // Find the resume for the logged-in user
        const resumeId = req.params.id;
        const resume = await Resume.findOne({ _id:resumeId, userId:req.user._id,});

        if (!resume) {
          return res.status(404).json({
            message: "Resume not found or you are not authorized",
          });
        }

        // Get base upload folder and base URL
        const uploadsFolder = path.join(process.cwd(), "uploads");
        const baseUrl = `${req.protocol}://${req.get("host")}`;

        // Extract uploaded files
        const newThumbnail = req.files.thumbnail?.[0];
        const newProfileImage = req.files.profileImage?.[0];


        // Handle thumbnail upload
        if (newThumbnail) {
          if (resume.thumbnailLink) {

            // Delete old thumbnail if it exists
            const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
            if (fs.existsSync(oldThumbnail)) {
              fs.unlinkSync(oldThumbnail);
            }
          }
          // Save new thumbnail link
          resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`;
        }


        // Handle profile image upload
        if (newProfileImage) {
          if (resume.profileInfo?.ProfilePreviewUrl) {

            // Delete old profile image if it exists
            const oldProfile = path.join(uploadsFolder,path.basename(resume.profileInfo.ProfilePreviewUrl));
            if (fs.existsSync(oldProfile)) {
              fs.unlinkSync(oldProfile);
            }
          }
          // Save new profile image link
          resume.profileInfo.ProfilePreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`;
        }

        // Save resume after updating image paths
        await resume.save();

        res.status(201).json({
          message: "Image(s) uploaded successfully",
          thumbnailLink: resume.thumbnailLink,
          ProfilePreviewUrl: resume.profileInfo.ProfilePreviewUrl,
        });
      }
    );

  } catch (error) {
      console.log("Error uploading images:", error);
      res.status(500).json({
      message: "Failed to upload images",
      error: error.message,
    });
  }
});
