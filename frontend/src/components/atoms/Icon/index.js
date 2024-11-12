import PropTypes from "prop-types";

const Icon = ({ icon, className, ...others }) => {
  const Tag = icon;
  return <Tag className={className} {...others} />;
};

Icon.propTypes = {
  icon: PropTypes.elementType.isRequired,
  className: PropTypes.string,
};

export default Icon;
