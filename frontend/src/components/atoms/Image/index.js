import PropTypes from "prop-types";

const Image = ({ src, alt, className, onClick }) => {
  return <img src={src} alt={alt} className={className} onClick={onClick} />;
};

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Image;
