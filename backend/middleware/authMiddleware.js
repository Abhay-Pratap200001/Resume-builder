import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

/**
 * @desc    Middleware to protect routes by verifying JWT token
 * @usage   Add this to any route that requires authentication
 *          Example: router.get("/profile", authenticate, getUserProfile);
 */
export const authenticate = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt; // JWT is expected from HTTP-only cookie

  if (token) {
    try {
      // Verify token with secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user object (without password) to request
      req.user = await User.findById(decoded.userId).select("-password");

      // Move to the next middleware or controller
      next();
    } catch (error) {
      // If token verification fails
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    // If no token provided
    res.status(401);
    throw new Error("Not authorized, no token provided");
  }
});
