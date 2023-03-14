const Button = ({ onClick, className = "", children }) => {
  return (
    <button className={className} onClick={onClick} type="button">
      {children}
    </button>
  );
};

export default Button;
