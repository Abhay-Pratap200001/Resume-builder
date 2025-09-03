import multer from "multer";

// Configure storage for uploaded files
const storage = multer.diskStorage({
  // Set destination folder for files
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files inside 'uploads' folder
  },
  // Set unique filename to prevent overwriting
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); 
    // Example: "1693761234567-photo.png"
  },
});

// Allow only certain file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

  // Check if the uploaded file's type is allowed
  if (allowedTypes.includes(file.fileFilter)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Only .jpeg, .jpg, .png formats are allowed'), false); // Reject the file
  }
};

// Create multer instance with storage + file filter
const upload = multer({ storage, fileFilter });

export default upload;





