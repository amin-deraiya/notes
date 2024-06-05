'use client';
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'outlined-primary' | 'outlined-secondary' | 'outlined-success' | 'outlined-danger' | 'outlined-warning';
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant, onClick, disabled, className }) => {
  const baseStyles = 'py-2 px-4 rounded-md shadow-sm focus:outline-none';
  
  const variantStyles = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    success: 'bg-green-600 text-white hover:bg-green-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    warning: 'bg-yellow-600 text-white hover:bg-yellow-700',
    'outlined-primary': 'border border-indigo-600 text-indigo-600 hover:bg-indigo-100',
    'outlined-secondary': 'border border-gray-600 text-gray-600 hover:bg-gray-100',
    'outlined-success': 'border border-green-600 text-green-600 hover:bg-green-100',
    'outlined-danger': 'border border-red-600 text-red-600 hover:bg-red-100',
    'outlined-warning': 'border border-yellow-600 text-yellow-600 hover:bg-yellow-100',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className || ''}`}
    >
      {children}
    </button>
  );
};

export default Button;
