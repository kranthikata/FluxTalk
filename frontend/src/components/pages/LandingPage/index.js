import Header from "../../organisms/Header";
import Heading from "../../atoms/Heading";
import Paragraph from "../../atoms/Paragraph";
import Button from "../../atoms/Button";
import Image from "../../atoms/Image";
import { Redirect } from "react-router-dom";

const LandingPage = (props) => {
  const isUserLoggedIn = JSON.parse(localStorage.getItem("userInfo"));
  if (isUserLoggedIn) {
    return <Redirect to="/chat" />;
  }
  const { history } = props;
  const handleSignUp = () => {
    history.push("/registration");
  };
  const handleLogin = () => {
    history.push("/login");
  };
  return (
    <div className="bg-gradient-to-r h-full from-green-200 to-cyan-200">
      <Header
        logo="https://res.cloudinary.com/duqopzabn/image/upload/v1729093871/ChatApplication/appLogo.png"
        onSignUp={handleSignUp}
      />

      <div className="md:flex items-center w-[90%] mx-auto py-14">
        {/* ----------------------------------------Left Container Start------------------------------------------- */}
        <div className="md:w-1/2 md:ml-14">
          <Heading
            level={1}
            className="text-5xl md:text-6xl font-black mb-5 font-mont"
          >
            Stay Colse,
            <br />
            No Matter the Distance
          </Heading>

          <Paragraph className="text-gray-700 text-md md:text-xl mb-5">
            Stay connected with real-time messaging, secure chats, and seamless
            group conversations. Our chat app brings you closer to the people
            who matter, offering a fast, easy, and secure way to communicate
            from anywhere.
          </Paragraph>

          <Button
            type="button"
            className="bg-customBlue hover:bg-customGreen text-white px-5 py-3 rounded-full shadow-lg md:block hidden drop-shadow-2xl"
            onClick={handleLogin}
          >
            Start Chatting Now
          </Button>
        </div>
        {/* -----------------------------------------Left Container End-------------------------------------------- */}

        {/* -----------------------------------------Right Container Start----------------------------------------- */}
        <div className="md:w-1/2 flex items-center mt-10 md:mt-0 justify-center">
          <Image
            src="https://res.cloudinary.com/duqopzabn/image/upload/v1730202437/ChatApplication/landingPage2.png"
            alt="phone"
            className="drop-shadow-2xl"
          />
        </div>
        <div className="text-center mt-10 md:hidden">
          <Button
            type="button"
            className="bg-customBlue hover:bg-customGreen text-white px-5 py-3 rounded-full shadow-lg drop-shadow-2xl"
            onClick={handleLogin}
          >
            Start Chatting Now
          </Button>
        </div>
        {/* -----------------------------------------Right Container End------------------------------------------- */}
      </div>
    </div>
  );
};

export default LandingPage;
