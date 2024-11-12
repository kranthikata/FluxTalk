import PropTypes from "prop-types";
import Button from "../../atoms/Button";
import Heading from "../../atoms/Heading";
import Image from "../../atoms/Image";

const NavBar = ({ logo, onSignUp }) => {
  return (
    <nav
      className={`flex items-center ${
        onSignUp && "justify-between"
      } w-[90%] mx-auto`}
    >
      <div className="flex items-center space-x-2 relative z-10">
        <Image src={logo} alt="FulxTalk Logo" className="w-10" />
        <Heading
          level={1}
          className="font-extrabold text-xl md:text-2xl text-customBlue"
        >
          Flux<span className="text-customGreen">Talk</span>
        </Heading>
      </div>

      {onSignUp && (
        <Button
          type="button"
          onClick={onSignUp}
          className="bg-customBlue text-white px-5 py-2 rounded-full relative z-10 hover:bg-customGreen shadow-xl"
        >
          Sign Up
        </Button>
      )}
    </nav>
  );
};

NavBar.propTypes = {
  logo: PropTypes.string.isRequired,
  onSignUp: PropTypes.func,
};
export default NavBar;
