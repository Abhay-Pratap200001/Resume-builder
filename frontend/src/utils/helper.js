// helper.js
// Simple email validation function
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // must contain @ and .
  return regex.test(email);
};
