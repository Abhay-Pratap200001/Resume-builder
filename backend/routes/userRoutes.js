import express from 'express';
import { 
  getUserProfile, 
  loginUser, 
  logoutUser, 
  registerUser 
} from '../controllers/userController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const userRouter = express.Router();

/**
 * @route   POST /api/users/register
 * @desc    Register a new user
 * @access  Public
 */
userRouter.post('/register', registerUser);


/**
 * @route   POST /api/users/login
 * @desc    Authenticate user & get token
 * @access  Public
 */
userRouter.post('/login', loginUser);


/**
 * @route   POST /api/users/logout
 * @desc    Logout user (clear JWT cookie)
 * @access  Private
 */
userRouter.post('/logout', logoutUser);


/**
 * @route   GET /api/users/profile
 * @desc    Get logged-in user's profile
 * @access  Private (requires JWT authentication)
 */
userRouter.get('/profile', authenticate, getUserProfile);

export default userRouter;
