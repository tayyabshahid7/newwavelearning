import { EMAIL_REGEX, PASSWORD_VALIDATOR_REGEX } from "./constants";

export const isValidEmail = (email: string): boolean =>
  email && email.search(EMAIL_REGEX) ? false : true;

export const isValidPassword = (password: string): boolean =>
  password && password.search(PASSWORD_VALIDATOR_REGEX) ? false : true;
