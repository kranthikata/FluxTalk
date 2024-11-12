const messages = {
  ERRORS: {
    BAD_REQUEST: "Bad Request",
    CONFLICT: "Conflict",
    INTERNAL_SERVER_ERROR: "Internal Server Error",
    UNAUTHORIZED: "Unauthorized",
    NOT_FOUND: "Not Found",
  },
  ERROR_MESSAGES: {
    ALL_FIELDS_REQUIRED: "Please enter all the necessary fields.",
    USER_ALREADY_EXISTS:
      "This email is already registered. Please use a different email.",
    REGISTRATION_FAILED:
      "Registration failed due to unexpected error. Please try again later.",
    LOGIN_FAILED:
      "Login failed due to unexpected error. Please try again later.",
    INVALID_USER_CREDENTIALS: "Invalid Email or Password",
    USER_NOT_FOUND:
      "No account found with the provided email. Please check you email or create a new account.",
    RECIPIENT_ID_MISSING:
      "User ID of the recipient is required to create a chat.",
    MISSING_AUTH_HEADER:
      "Authorization header is required. Please provide a valid token.",
    MISSING_AUTH_TOKEN:
      "Authorization token missing. Please provide a valid token in the 'Authorization' header.",
    INVALID_JWT_TOKEN:
      "Invalid token. Please provide a valid authorization token.",
    CHAT_CREATION_FAILED: "Chat creation failed.",
    MORE_USERS_REQUIRED: "Group chat requires atleast 3 users.",
    UNABLE_TO_FETCH_CHATS: "Unable to fetch chats. Please try again later.",
    FAILED_TO_CREATE_GROUP_CHAT:
      "Failed to create group chat. Please try again later.",
    CHAT_NOT_FOUND: "Chat not found or does not exist",
    INVALID_CHAT_ID: "Invalid chat ID provided.",
    INVALID_USER_OR_GROUP_ID: "Invalid group or user ID provided.",
    RENAME_GROUP_CHAT_ERROR:
      "An error occurred while updating the chat name. Please try again later",
    ALREADY_MEMBER_OR_GROUP_NOT_EXIST:
      "The user is already a member of the group or Group does not exist.",
    MEMBER_NOT_REMOVED:
      "The user is not part of the group or the group does not exist.",
    SERVER_ERROR_ADDING_USER:
      "An internal server error occured while adding the user to the group. Please try again later.",
    SERVER_ERROR_REMOVING_USER:
      "An internal server error occured while removing the user from the group. Please try again later.",
    INVALID_REQUEST_DATA: "Invalid request data",
  },
  SUCCESS: {
    USER_CREATED: "User created successfully!",
    LOGIN_SUCCESS: "Login successful!",
    CHAT_FOUND: "Chat found!",
    CHAT_CREATED: "New chat created!",
    GROUP_CREATION_SUCCESS: "Group chat created successfully!",
    CHAT_DELETED_SUCCESS: "Chat deleted successfully",
  },
};

module.exports = messages;
