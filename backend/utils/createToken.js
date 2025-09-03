import jwt from "jsonwebtoken";

/**
 * @desc    Generate JWT token and store it in an HTTP-only cookie
 * @param   {Object} res - Express response object (to set cookie)
 * @param   {String} userId - MongoDB User ID for payload
 * @returns {String} token - The generated JWT
 */

const generateToken = (res, userId) => {
  // Create a signed JWT with userId as payload
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Token validity: 30 days
  });

  // Set JWT in a cookie
  res.cookie("jwt", token, {
    httpOnly: true, // Prevents client-side JS from accessing the cookie (XSS protection)
    secure: process.env.NODE_ENV === "production", // Cookie only over HTTPS in production
    sameSite: "strict", // Protects against CSRF
    maxAge: 30 * 24 * 60 * 60 * 1000, // Cookie expiry: 30 days
  });

  return token;
};

export default generateToken;
