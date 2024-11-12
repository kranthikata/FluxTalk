import PropTypes from "prop-types";
import { TailSpin } from "react-loader-spinner";
import Button from "../../atoms/Button";
import Icon from "../../atoms/Icon";
import Paragraph from "../../atoms/Paragraph";

const AuthButton = ({ type, className, isLoading, buttonText }) => {
  return (
    <Button type={type} className={className}>
      {isLoading ? (
        <>
          <Icon icon={TailSpin} height={14} width={14} color="black" />
          <Paragraph className="ml-1">{buttonText}</Paragraph>
        </>
      ) : (
        <Paragraph>{buttonText}</Paragraph>
      )}
    </Button>
  );
};

AuthButton.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  buttonText: PropTypes.string.isRequired,
};

export default AuthButton;
