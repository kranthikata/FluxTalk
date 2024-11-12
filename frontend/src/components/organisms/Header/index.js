import PropTypes from "prop-types";
import NavBar from "../../molecules/NavBar";

const Header = ({ logo, onSignUp }) => {
  return (
    <header className="bg-white pt-2 pb-2">
      <NavBar logo={logo} onSignUp={onSignUp} />
    </header>
  );
};

Header.propTypes = {
  logo: PropTypes.string.isRequired,
  onSignUp: PropTypes.func,
};

export default Header;
