import React from "react";

const Modal = ({ isOpen, onClose, title, message, onConfirm, showButtons = true }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-lg text-black font-bold mb-4">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        
        {showButtons && (
          <div className="flex justify-center space-x-4">
            <button
              onClick={onConfirm}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Yes
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
