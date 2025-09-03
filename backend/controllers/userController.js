import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/createToken.js";

/**
 * @desc    Register a new user
 * @route   POST /api/users/register
 * @access  Public
 */


export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input fields
  if (!name || !email || !password) {
    throw new Error("All inputs are required");
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ success: false, message: "User already exists" });
  }

  // Check password length
  if (password.length < 7) {
    return res.status(400).json({ success: false, message: "Password must be at least 7 characters" });
  }

  // Generate salt & hash password
  const salt = await bcrypt.genSalt(7);  
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user instance
  const newUser = new User({ name, email, password: hashedPassword });

  try {
    await newUser.save();

    // Generate JWT and set cookie
    generateToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});



/**
 * @desc    Authenticate user & get token
 * @route   POST /api/users/login
 * @access  Public
 */


export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (isPasswordValid) {
      // Generate JWT token in cookie
      generateToken(res, existingUser._id);

      return res.status(200).json({
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        message: "User logged in successfully",
      });
    }
  }
  // If no match, send error response
  res.status(401).json({ success: false, message: "Invalid email or password" });
});



/**
 * @desc    Get logged-in user's profile
 * @route   GET /api/users/profile
 * @access  Private (requires JWT)
 */


export const getUserProfile = asyncHandler(async (req, res) => {
  // req.user is populated in authMiddleware.js after JWT verification
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404).json({ success: false, message: "User not found" });
  }
});



/**
 * @desc    Logout user (clear JWT cookie)
 * @route   POST /api/users/logout
 * @access  Private
 */


export const logoutUser = asyncHandler(async (req, res) => {
  // Clear JWT cookie by setting it to empty with expiry
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    message: "Logged out successfully",
  });
});
