const Button = ({ text, handleClick, disabled = false }) => {
  return (
    <button
      className={`f6 link dim br2 ph3 pv2 mb2 dib white ml2 mr2 ${
        disabled ? 'bg-light-gray' : 'bg-dark-blue'
      }`}
      onClick={handleClick}
      disabled={disabled}
      type="button"
    >
      {text}
    </button>
  );
};

export default Button;