'use client';
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant, onClick, disabled, className }) => {
  const baseStyles = 'py-2 px-4 rounded-md shadow-sm focus:outline-none';
  const primaryStyles = 'bg-indigo-600 text-white hover:bg-indigo-700';
  const secondaryStyles = 'bg-gray-600 text-white hover:bg-gray-700';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variant === 'primary' ? primaryStyles : secondaryStyles} ${
        className || ''
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
