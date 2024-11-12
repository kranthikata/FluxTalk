import { Redirect } from "react-router-dom";
import RegistrationForm from "../../organisms/RegistrationForm";
import AuthTemplate from "../../templates/AuthTemplate";

const RegistrationPage = () => {
  const isUserLoggedIn = JSON.parse(localStorage.getItem("userInfo"));
  if (isUserLoggedIn) {
    return <Redirect to="/chat" />;
  }
  return (
    <AuthTemplate
      title="Sign Up"
      imageSrc="https://res.cloudinary.com/duqopzabn/image/upload/v1728101072/ChatApplication/sign_up_image.png"
      quote="Every connection starts with a single step"
    >
      <RegistrationForm />
    </AuthTemplate>
  );
};

export default RegistrationPage;
