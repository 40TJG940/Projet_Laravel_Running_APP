export const Card = ({ children, className = '' }) => (
    <div className={`bg-white shadow-lg rounded-lg p-4 ${className}`}>
      {children}
    </div>
  );

export default Card;  