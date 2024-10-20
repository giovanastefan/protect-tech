import './Button.css';

export const Button = ({ children, onClickButton, className = '', ...props }) => {
  return (
    <button
      className={`button ${className}`}
      onClick={onClickButton}
      {...props}
    >
      {children}
    </button>
  );
};
