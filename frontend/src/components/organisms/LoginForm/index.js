import { useState, useContext } from "react";
import Paragraph from "../../atoms/Paragraph";
import InputField from "../../molecules/InputField";
import PasswordInputField from "../../molecules/PasswordInputField";
import AuthButton from "../../molecules/AuthButton";
import AuthSwitcher from "../../molecules/AuthSwitcher";
import { loginUser } from "../../../api/authApi";
import validateLoginForm from "../../../utils/validateLoginForm";
import { messages } from "../../../utils/messages";
import NavigationContext from "../../../context/NavigationContext";
import { toast } from "react-toastify";

const LoginForm = () => {
  const { navigateReplace } = useContext(NavigationContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [inProgress, setInProgress] = useState({
    loading: false,
    progressText: "Login",
  });

  //Redirecting to the registration page
  const handleRegistrationRedirect = () => {
    navigateReplace("/registration");
  };

  //Handling Input Change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //Login logic
  const onLogin = async (event) => {
    event.preventDefault();

    //Checking all fields are provided
    const errors = validateLoginForm(formData);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    try {
      setErrors({});
      setInProgress({ loading: true, progressText: "Logging In..." });
      const response = await loginUser({
        email: formData.email,
        password: formData.password,
      });
      setFormData({
        email: "",
        password: "",
      });
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      toast.success("Login Success!");
      navigateReplace("/chat");
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        login: error.response.data.message || messages.errors.loginFailed,
      }));
      toast.error("Login Failed!");
    } finally {
      setInProgress({ loading: false, progressText: "Login" });
    }
  };

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={onLogin}>
        <InputField
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          errorMessage={errors.email}
        />
        <PasswordInputField
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          errorMessage={errors.password}
        />
        <AuthButton
          type="submit"
          className="flex justify-center items-center bg-cyan-400 rounded-xl text-white py-2 hover:scale-105 duration-300 shadow-lg"
          isLoading={inProgress.loading}
          buttonText={inProgress.progressText}
        />
      </form>
      {errors.login && (
        <Paragraph className="text-red-500 text-xs text-center font-bold mt-3 animate-shake">
          {errors.login}
        </Paragraph>
      )}
      <AuthSwitcher
        messageText="New to FluxTalk?"
        buttonText="Register"
        onClick={handleRegistrationRedirect}
      />
    </>
  );
};

export default LoginForm;
