import React from "react";

const Input = (props) => {
  //destruct only parameters wich you use in the Component specifically
  const { name, label, error, focus = false, ...rest } = props;
  //rest is for such parameters as onChange={onChange}, value={value}, type={type}
  //...rest has not name, label, error and focus
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        name={name}
        className="form-control"
        id={name}
        autoFocus={focus}
      />{" "}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
