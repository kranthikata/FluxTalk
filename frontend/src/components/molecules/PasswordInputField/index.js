import { useState } from "react";
import PropTypes from "prop-types";
import { FaEye } from "react-icons/fa";
import { RiEyeCloseFill } from "react-icons/ri";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import Icon from "../../atoms/Icon";
import Paragraph from "../../atoms/Paragraph";

const PasswordInputField = ({
  placeholder,
  name,
  value,
  onChange,
  errorMessage,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          className="p-2 rounded-xl w-full border outline-none"
        />
        <Button type="button" onClick={togglePassword}>
          <Icon
            icon={showPassword ? FaEye : RiEyeCloseFill}
            className="absolute top-1/2 right-3 -translate-y-1/2"
          />
        </Button>
      </div>
      {errorMessage && (
        <Paragraph className="text-xs text-red-500 mt-[-10px]">
          {errorMessage}
        </Paragraph>
      )}
    </>
  );
};

PasswordInputField.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};
export default PasswordInputField;
