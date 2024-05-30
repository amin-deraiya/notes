'use client';
import React from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 relative">
        <button className="absolute top-2 right-2 text-gray-600" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
