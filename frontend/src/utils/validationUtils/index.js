//Function to validate required fields
export const validateRequired = (value) => value.trim() !== "";

//Function to validate password match
export const validatePasswordMatch = (password, confirmPassword) =>
  password === confirmPassword;
