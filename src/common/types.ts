export interface AuthData {
  access: string;
  refresh: string | "";
}

export interface ResponseData {
  detail: string;
  success?: string;
  count?: string;
  next?: string;
  previous?: string;
  results?: [];
}

export interface ResetPasswordData {
  new_password: string;
  token: string;
  signature: string;
}

export interface AddCohortData {
  facilitator: string;
  programme: string;
  name: string;
  /** Json string of the start date **/
  start_date: string;
  /** Json string of the start date **/
  end_date: string;
}
