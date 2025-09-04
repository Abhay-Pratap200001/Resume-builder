import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

export const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  // 1. Check Authorization header first
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // 2. If not found in header, fallback to cookie
  if (!token && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token provided");
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user (without password) to request
    req.user = await User.findById(decoded.userId).select("-password");

    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});
