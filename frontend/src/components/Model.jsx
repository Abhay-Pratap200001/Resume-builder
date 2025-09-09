import { X } from "lucide-react"; // Import close (X) icon
import React from "react";

// Modal Component
// Props:
// - children: Content to show inside the modal
// - isOpen: Boolean (true = modal visible, false = hidden)
// - onclose: Function to close the modal
// - title: Text shown in header
// - hideHeader: Boolean (true = hide the header section)
const Modal = ({
  children,
  isOpen,
  onClose,
  title,
  hideHeader,
  showActionBtn,
  actionBtnIcon = null,
  actionBtnText,
  actionBtnClassName = "",
  onActionClick = () => {}, 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
        {/* Header */}
        {!hideHeader && (
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>

            <div className="flex items-center gap-2">
              {showActionBtn && (
                <button
                  onClick={onActionClick}
                  className={`flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-lg shadow transition ${actionBtnClassName}`}
                >
                  {actionBtnIcon && <span>{actionBtnIcon}</span>}
                  {actionBtnText}
                </button>
              )}
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 transition"
                onClick={onClose}
              >
                <X size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Body */}
        <div className="text-gray-600">{children}</div>
      </div>
    </div>
  );
};

export default Modal;