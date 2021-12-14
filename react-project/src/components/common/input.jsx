const Input = ({ name, label,  error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        id={name}
        name={name}

        className="form-control"
      />
      <span className="text-danger">{error}</span>
    </div>
  );
};
export default Input;
