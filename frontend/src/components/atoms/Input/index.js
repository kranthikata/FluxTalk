import PropTypes from "prop-types";
import React from "react";

const Input = ({
  type,
  placeholder,
  name,
  value,
  onChange,
  className,
  ...otherProps
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className={className}
      {...otherProps}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

export default Input;
