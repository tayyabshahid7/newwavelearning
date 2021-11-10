import { AddCohortData, ResponseData, Session } from "../common/types";
import { axs } from "./axiosAPI";

export const getProgrammes = async () => {
  try {
    const response = await axs.get<ResponseData>("/programmes/");
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getFacilitators = async () => {
  try {
    const response = await axs.get<ResponseData>("/users/facilitators/");
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const AddCohort = async (data: AddCohortData) => {
  try {
    const response = await axs.post<ResponseData>("/cohorts/", data);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const EditCohort = async (cohortId: number, data: AddCohortData) => {
  try {
    const response = await axs.patch<ResponseData>(`/cohorts/${cohortId}/`, data);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getCohorts = async (pageUrl: string = "/cohorts") => {
  try {
    const response = await axs.get<ResponseData>(pageUrl);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const deleteCohort = async (cohortId: number) => {
  try {
    const response = await axs.delete<ResponseData>(`/cohorts/${cohortId}/`);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getCohortDetails = async (cohortId: string) => {
  try {
    const response = await axs.get<ResponseData>(`/cohorts/${cohortId}/`);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const SaveLiveSession = async (sessionId: number | string, data: any) => {
  try {
    const response = await axs.patch<Session>(`/livesessions/${sessionId}/`, data);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getCohortLearners = async (cohortId: string | number) => {
  try {
    const response = await axs.get<ResponseData>(
      `/learners/cohort-learners/?cohort_id=${cohortId}`
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const uploadLearners = async (formData: FormData) => {
  try {
    const response = await axs.post<ResponseData>(`/learners/create-learners-csv/`, formData);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const deleteLearner = async (learnerId: number) => {
  try {
    const response = await axs.delete<ResponseData>(`/learners/${learnerId}/`);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const downloadLearnersCSV = async (cohortId: string) => {
  try {
    const response = await axs.get<ResponseData>(`/learners/download-csv/?cohort_id=${cohortId}`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
