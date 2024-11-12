import PropTypes from "prop-types";
import Input from "../../atoms/Input";
import Paragraph from "../../atoms/Paragraph";

const InputField = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  errorMessage,
}) => {
  return (
    <>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        className="p-2 rounded-xl w-full border outline-none"
      />
      {errorMessage && (
        <Paragraph className="text-xs text-red-500 mt-[-10px]">
          {errorMessage}
        </Paragraph>
      )}
    </>
  );
};

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputField;
