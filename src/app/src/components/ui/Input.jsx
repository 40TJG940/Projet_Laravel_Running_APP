import React from 'react';

export const Input = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  name, 
  required = false,
  className = ''
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
      />
    </div>
  );
};

export default Input;