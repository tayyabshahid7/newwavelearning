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
  data?: any;
}

export interface ResetPasswordData {
  new_password: string;
  token: string;
  signature: string;
}

export interface CohortData {
  id?: number;
  facilitator: string;
  programme: string;
  name: string;
  /** Json string of the start date */
  start_date: string;
  /** Json string of the start date */
  end_date: string;
}

export interface ProgrammeData {
  id?: number;
  name?: string;
  cohorts?: number;
}

export interface SectionData {
  id?: number;
  title?: string;
  description?: string;
  programme?: number;
  number?: number;
  steps?: number;
}

export interface StepData {
  id?: number;
  section?: number;
  step_type?: string;
  name?: string;
  number?: number;
  fields?: any;
}

export interface Session {
  id: string | number;
  name: string;
  step_number: number;
  start_time: string;
  end_time: string;
}

export interface Learner {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  last_login: string;
}

export interface AddStepParams {
  sectionId: string;
}

export interface EditStepParams {
  stepId: string;
}
