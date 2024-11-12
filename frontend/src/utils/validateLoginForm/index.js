import { validateRequired } from "../validationUtils";
import { messages } from "../messages";

const validateLoginForm = (formData) => {
  const errors = {}; //Creating an empty object

  //Checking if the email field is filled
  if (!validateRequired(formData.email)) {
    errors.email = messages.errors.emailRequired;
  }

  //Checking if the password field is filled
  if (!validateRequired(formData.password)) {
    errors.password = messages.errors.passwordRequired;
  }

  //Returning the errors object
  return errors;
};

export default validateLoginForm;
