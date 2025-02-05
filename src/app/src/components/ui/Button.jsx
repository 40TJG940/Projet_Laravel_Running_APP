export const Button = ({ 
    children, 
    onClick, 
    type = 'button', 
    variant = 'primary', 
    fullWidth = false 
  }) => {
    const baseClasses = 'px-4 py-2 rounded font-medium transition-colors';
    const variants = {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white',
      danger: 'bg-red-600 hover:bg-red-700 text-white',
      outline: 'border border-gray-300 hover:bg-gray-100'
    };
    
    return (
      <button
        type={type}
        onClick={onClick}
        className={`${baseClasses} ${variants[variant]} ${fullWidth ? 'w-full' : ''}`}
      >
        {children}
      </button>
    );
  };


  export default Button;