import PropTypes from "prop-types";
import Heading from "../../atoms/Heading";

const FormTemplate = ({ title, children }) => {
  return (
    <>
      <Heading level={2} className="font-bold text-2xl mb-8 ml-3">
        {title}
      </Heading>
      {children}
    </>
  );
};

FormTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default FormTemplate;
