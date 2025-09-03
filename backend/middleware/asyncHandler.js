/**
 * @desc    Higher-order function to handle async/await errors in Express routes
 * @param   {Function} fn - The async function (controller) to wrap
 * @returns {Function} Express middleware with centralized error handling
 * 
 * Usage:
 * Instead of writing try/catch inside every controller, wrap your controller:
 * 
 *   router.get("/users", asyncHandler(async (req, res) => {
 *     const users = await User.find();
 *     res.json(users);
 *   }));
 * 
 * If an error occurs, it will be caught here and a 500 response will be sent.
 */

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    // Send generic server error response if async function fails
    res.status(500).json({ message: error.message });
  });
};

export default asyncHandler;
