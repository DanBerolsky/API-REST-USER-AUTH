export const MESSAGES = {
  AUTH: {
    SUCCESS: {
      SIGNUP: "Signup successful. Please confirm your email.",
      LOGIN: "Login successful.",
      LOGOUT: "Logout successful.",
    },
    ERROR: {
      EMAIL_TAKEN: "This email is already in use.",
      INVALID_CREDENTIALS: "Invalid credentials.",
      USER_NOT_FOUND: "No user found.",
      NO_PASSWORD: "User does not have a password.",
      INCORRECT_PASSWORD: "Incorrect password.",
      EMAIL_NOT_CONFIRMED: "Email not confirmed. Please check your inbox.",
      LOGOUT_ERROR: "Error logging out. Please try again later.",
      SESSION_DESTROY_ERROR:
        "Error destroying session. Please try again later.",
    },
  },
  USER: {
    SUCCESS: {
      PROFILE_UPDATED: "Profile updated successfully.",
      USER_DELETED: "User deleted successfully.",
    },
    ERROR: {
      USER_NOT_FOUND: "User not found.",
      USERNAME_TAKEN: "Username is already taken.",
    },
  },
  GENERAL: {
    ERROR: {
      INTERNAL_SERVER_ERROR:
        "An unexpected error occurred. Please try again later.",
      FORBIDDEN: "You do not have permission to perform this action.",
    },
  },
};
