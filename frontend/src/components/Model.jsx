import { X } from "lucide-react"; // Import close (X) icon
import React from "react";

// Modal Component
// Props:
// - children: Content to show inside the modal
// - isOpen: Boolean (true = modal visible, false = hidden)
// - onclose: Function to close the modal
// - title: Text shown in header
// - hideHeader: Boolean (true = hide the header section)
const Modal = ({ children, isOpen, onclose, title, hideHeader }) => {
  // If modal is not open, render nothing
  if (!isOpen) return null;

  return (
    // Overlay background (semi-transparent black)
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {/* Modal container */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
        
        {/* Header (title + close button) */}
        {!hideHeader && (
          <div className="flex justify-between items-center mb-4">
            {/* Modal title */}
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>

            {/* Close button (calls onclose when clicked) */}
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700 transition"
              onClick={onclose}>
              <X size={20} /> {/* X icon from lucide-react */}
            </button>
          </div>
        )}

        {/* Modal body (dynamic content passed as children) */}
        <div className="text-gray-600">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
