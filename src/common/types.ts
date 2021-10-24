export interface AuthData {
  access: string;
  refresh: string | "";
}

export interface ResponseData {
  detail: string;
  success?: string;
}

export interface ResetPasswordData {
  new_password: string;
  token: string;
  signature: string;
}
