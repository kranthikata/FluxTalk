import { Redirect } from "react-router-dom";
import LoginForm from "../../organisms/LoginForm";
import AuthTemplate from "../../templates/AuthTemplate";

const LoginPage = () => {
  const isUserLoggedIn = JSON.parse(localStorage.getItem("userInfo"));
  if (isUserLoggedIn) {
    return <Redirect to="/chat" />;
  }
  return (
    <AuthTemplate
      title="Login"
      imageSrc="https://res.cloudinary.com/duqopzabn/image/upload/c_crop,ar_4:3/v1728101545/ChatApplication/login_image.jpg"
      quote="Life’s better when we’re connected. Ready to chat?"
    >
      <LoginForm />
    </AuthTemplate>
  );
};

export default LoginPage;
