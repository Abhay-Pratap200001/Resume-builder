import express from 'express'
import { authenticate } from '../middleware/authMiddleware.js'
import { createResume, deleteResume, getResumeById, getUserResumes, updateResume } from '../controllers/resumeController.js'
import { uploadResumeImage } from '../controllers/uploadImages.js'




 const resumeRouter = express.Router()

 resumeRouter.post('/', authenticate, createResume)
 resumeRouter.get('/', authenticate, getUserResumes)
 resumeRouter.get('/:id', authenticate, getResumeById)

 resumeRouter.put('/:id', authenticate, updateResume)
 resumeRouter.put('/:id/upload-images', authenticate, uploadResumeImage)

 resumeRouter.delete('/:id', authenticate, deleteResume)

 export default resumeRouter