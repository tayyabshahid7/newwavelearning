import {
  CohortData,
  ProgrammeData,
  ResponseData,
  SectionData,
  Session,
  StepData,
} from "common/types";
import { axs } from "./axiosAPI";

export const getProgrammes = async () => {
  try {
    const response = await axs.get<ResponseData>("/programmes/");
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const addProgramme = async (data: FormData) => {
  try {
    const response = await axs.post<ProgrammeData>("/programmes/", data, { timeout: 15000 });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProgramme = async (programmeId: number | string) => {
  try {
    const response = await axs.delete<ResponseData>(`programmes/${programmeId}/`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const editProgramme = async (programmeId: number, data: FormData) => {
  try {
    const response = await axs.patch<ResponseData>(`/programmes/${programmeId}/`, data, {
      timeout: 15000,
    });
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const addSection = async (data: FormData) => {
  try {
    const response = await axs.post<SectionData>(`/sections/`, data);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const deleteSection = async (sectionId: number | string) => {
  try {
    const response = await axs.delete<ResponseData>(`sections/${sectionId}/`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getSection = async (sectionId: number | string) => {
  try {
    const response = await axs.get<SectionData>(`sections/${sectionId}/`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getProgrammeSections = async (programmeId: number) => {
  try {
    const response = await axs.get<SectionData[]>(`/programmes/${programmeId}/sections`);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getSectionSteps = async (sectionId: number) => {
  try {
    const response = await axs.get<StepData[]>(`/sections/${sectionId}/steps`);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getProgrammeDetails = async (programmeId: number | string) => {
  try {
    const response = await axs.get<ResponseData>(`programmes/${programmeId}/`);
    return response;
  } catch (error) {
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

export const AddCohort = async (data: CohortData) => {
  try {
    const response = await axs.post<CohortData>("/cohorts/", data);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const EditCohort = async (cohortId: number, data: CohortData) => {
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

export const addLearner = async (formData: any) => {
  try {
    const response = await axs.post<ResponseData>(`/learners/add/`, formData);
    return response;
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
