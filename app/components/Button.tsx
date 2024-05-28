// Button.tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'gray';
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant, onClick, className }) => {
  const buttonClasses = `
    text-sm font-medium px-4 py-2 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
    ${variant === 'primary' ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : ''}
    ${variant === 'secondary' ? 'bg-gray-400 hover:bg-gray-500 text-white' : ''}
    ${variant === 'success' ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : ''}
    ${variant === 'danger' ? 'bg-red-600 hover:bg-red-700 text-white' : ''}
    ${variant === 'gray' || !variant ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' : ''}
    ${className || ''}
  `;

  return (
    <button type="button" className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
