// URLS
export const API_URL = process.env.REACT_APP_API_URL;
export const GET_TOKEN_URL = "auth/token-userdata/";
export const TOKEN_REFRESH_URL = "/auth/token/refresh/";
export const LOGIN_PAGE = "/";

// REGEX
export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

// Validates Minimum eight characters, at least one letter, one number and one special character
export const PASSWORD_VALIDATOR_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

