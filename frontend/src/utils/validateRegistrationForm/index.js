import { validateRequired, validatePasswordMatch } from "../validationUtils";
import { messages } from "../messages";

const validateRegistrationForm = (formData) => {
  const errors = {}; //Creating an empty Object

  //Checking if the name field is filled
  if (!validateRequired(formData.name)) {
    errors.name = messages.errors.nameRequired;
  }

  //Checking if the email field is filled
  if (!validateRequired(formData.email)) {
    errors.email = messages.errors.emailRequired;
  }

  //Checking if the password field is filled
  if (!validateRequired(formData.password)) {
    errors.password = messages.errors.passwordRequired;
  }

  //Checking if the password field value and confirm password value is same
  if (!validatePasswordMatch(formData.password, formData.confirmPassword)) {
    errors.passwordMismatched = messages.errors.passwordMismatch;
  }

  //Returning the errors object
  return errors;
};

export default validateRegistrationForm;
