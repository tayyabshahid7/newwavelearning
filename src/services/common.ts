import {
  CohortData,
  Feedback,
  ProgrammeData,
  ResponseData,
  SectionData,
  Session,
  StepData,
} from "common/types";
import { axs } from "./axiosAPI";

export const getUserProgrammes = async (pageUrl: string | null = null) => {
  const url = pageUrl || "/user-cohort/";
  try {
    const response = await axs.get<ResponseData>(url);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getProgrammes = async (pageUrl: string | null = null) => {
  const url = pageUrl || "/programmes/";
  try {
    const response = await axs.get<ResponseData>(url);
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

export const editProgramme = async (programmeId: number, data: any) => {
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
    const response = await axs.post<SectionData>(`/sections/`, data, { timeout: 15000 });
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const editSection = async (sectionId: number | string, data: any) => {
  try {
    const response = await axs.patch<ResponseData>(`sections/${sectionId}/`, data, {
      timeout: 15000,
    });
    return response.data;
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

export const getSection = async (sectionId: number | string, cohortId?: Number) => {
  try {
    let url = "";
    if (cohortId) {
      url = `sections/${sectionId}/?cohort_id=${cohortId}`;
    } else {
      url = `sections/${sectionId}/`;
    }

    const response = await axs.get<SectionData>(url);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const duplicateSection = async (sectionId: number | string) => {
  try {
    const response = await axs.post<SectionData>(`sections/${sectionId}/duplicate/`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getProgrammeSections = async (
  programmeId: number,
  isAdmin: boolean,
  cohortId?: number
) => {
  try {
    let url = "";
    if (cohortId) {
      url = `/programmes/${programmeId}/sections/?cohort_id=${cohortId}`;
    } else {
      url = `/programmes/${programmeId}/sections/`;
    }
    const response = await axs.get<SectionData[]>(url);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getSectionSteps = async (sectionId: number, isAdmin: boolean, cohortId?: number) => {
  try {
    const response = await axs.get<StepData[]>(`/sections/${sectionId}/steps/`, {
      params: { is_admin: isAdmin, cohort_id: cohortId },
    });
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const addStep = async (data: FormData) => {
  try {
    let timeOutValue = 60000000000;
    const response = await axs.post<StepData>("/steps/", data, {
      timeout: timeOutValue,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const editStep = async (stepId: number | string, data: FormData) => {
  try {
    let timeOutValue = 60000000000;
    const response = await axs.patch<StepData>(`/steps/${stepId}/`, data, {
      timeout: timeOutValue,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const deleteStep = async (stepId: number | string) => {
  try {
    const response = await axs.delete<ResponseData>(`/steps/${stepId}/`);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getStepDetails = async (stepId: number | string, cohortId?: any) => {
  try {
    let url = "";
    if (cohortId) {
      url = `/steps/${stepId}/?cohort_id=${cohortId}`;
    } else {
      url = `/steps/${stepId}/`;
    }
    const response = await axs.get<StepData>(url);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const duplicateStep = async (stepId: number | string) => {
  try {
    const response = await axs.post<StepData>(`/steps/${stepId}/duplicate-step/`);
    return response.data;
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

export const duplicateProgramme = async (programmeId: number | string) => {
  try {
    const response = await axs.post<ProgrammeData>(`programmes/${programmeId}/duplicate/`);
    return response.data;
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

export const getCohorts = async (pageUrl: string = "/cohorts/") => {
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

export const getSessions = async (pageUrl: string = "/livesessions") => {
  try {
    const response = await axs.get<ResponseData>(pageUrl);
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

export const getCohortFeedbackList = async (cohortId: string | number) => {
  try {
    const response = await axs.get<ResponseData>(`/feedback/?cohort_idf=${cohortId}`);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getFilteredFeedbackList = async (
  cohortId: string | null = null,
  learnerId: string | null = null
) => {
  try {
    let url = `/feedback/filtered-feedback/`;
    if (cohortId !== null && cohortId !== "0") {
      url = url + `?cohort_id=${cohortId}`;
      if (learnerId !== null && learnerId !== "0") {
        url = url + `&learner_id=${learnerId}`;
      }
    } else if (learnerId !== null && learnerId !== "0") {
      url = url + `?learner_id=${learnerId}`;
    }
    const response = await axs.get<ResponseData>(url);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getLearnerFeedbackList = async (
  cohortId: string | null = null,
  learnerId: string | null = null
) => {
  try {
    let url = `/feedback/leaner-feedback-list/`;
    if (cohortId !== null && cohortId !== "0") {
      url = url + `?cohort_id=${cohortId}`;
      if (learnerId !== null && learnerId !== "0") {
        url = url + `&learner_id=${learnerId}`;
      }
    } else if (learnerId !== null && learnerId !== "0") {
      url = url + `?learner_id=${learnerId}`;
    }
    const response = await axs.get<ResponseData>(url);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getFeedbackFiltersData = async () => {
  try {
    const response = await axs.get<ResponseData>(`/feedback/filters-data/`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getStepAnswer = async (answerId: string | number) => {
  try {
    const response = await axs.get<ResponseData>(`/stepanswers/${answerId}/`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const submitFeedback = async (
  feedbackId: number | string | null = null,
  feedbackText: string,
  markDone: boolean = true
) => {
  try {
    if (feedbackId === null) throw new Error("Feedback id not found");
    const response = await axs.patch<Feedback>(`/feedback/${feedbackId}/`, {
      description: feedbackText,
      done: markDone,
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getUsers = async (role: string | null = null, searchText: string | null = null) => {
  try {
    let queryParams = "";

    if (searchText && searchText.length > 0) {
      queryParams = `?search=${searchText}`;
    }
    if (role && role !== "all") {
      queryParams += `${searchText && searchText.length > 0 ? "&" : "?"}role=${role}`;
    }

    const response = await axs.get<any>(`/users/${queryParams}`);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getUsersPage = async (pageUrl: string | null = null) => {
  try {
    if (pageUrl !== null) {
      const response = await axs.get<ResponseData>(pageUrl);
      return response;
    } else {
      throw new Error("Page not found");
    }
  } catch (error: any) {
    throw error;
  }
};

export const getUserTypes = async () => {
  try {
    const response = await axs.get<string[]>(`/users/types/`);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const addUser = async (user: any) => {
  try {
    const response = await axs.post<ResponseData>("/users/", user);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const editUser = async (userData: any, userId: string | number) => {
  try {
    const response = await axs.patch<ResponseData>(`/users/${userId}/`, userData);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const deleteUser = async (userId: string | number) => {
  try {
    const response = await axs.delete<ResponseData>(`/users/${userId}/`);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getUserDetails = async (userId: string | number) => {
  try {
    const response = await axs.get<ResponseData>(`/users/${userId}/get-details/`);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const submitStepAnswer = async (data: any) => {
  try {
    const response = await axs.post<ResponseData>(`/stepanswers/`, data);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getCohortLiveSessions = async (cohortId: string) => {
  try {
    const response = await axs.get<ResponseData>(`/livesessions/${cohortId}/cohort-live-sessions/`);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getUserCohortDetails = async (cohortId: string) => {
  try {
    const response = await axs.get<ResponseData>(`/user-cohort/${cohortId}/`);
    return response;
  } catch (error: any) {
    throw error;
  }
};
