import PropTypes from "prop-types";
import { TailSpin } from "react-loader-spinner";
import { MdCloudDone, MdError } from "react-icons/md";
import Input from "../../atoms/Input";
import Icon from "../../atoms/Icon";
import Paragraph from "../../atoms/Paragraph";

const ImageUploadField = ({
  type,
  name,
  accept,
  onChange,
  className,
  errorMessage,
  uploadStatus,
}) => {
  const getIcon = () => {
    const iconClassName = "absolute top-1/2 right-3 -translate-y-1/2";
    switch (uploadStatus) {
      case "uploading":
        return (
          <div className="absolute -right-4 top-3">
            <Icon
              icon={TailSpin}
              height={14}
              color="black"
              className={iconClassName}
            />
          </div>
        );
      case "success":
        return <Icon icon={MdCloudDone} className={iconClassName} />;
      case "error":
        return <Icon icon={MdError} className={iconClassName} />;
      default:
        return null;
    }
  };
  return (
    <>
      <div className="relative">
        <Input
          type={type}
          name={name}
          accept={accept}
          onChange={onChange}
          className={className}
        />
        {getIcon()}
      </div>
      {errorMessage && (
        <Paragraph className="text-xs text-red-500 mt-[-10px]">
          {errorMessage}
        </Paragraph>
      )}
    </>
  );
};

ImageUploadField.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  accept: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  errorMessage: PropTypes.string,
  uploadStatus: PropTypes.string,
};

export default ImageUploadField;
