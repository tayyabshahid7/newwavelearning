import { AddCohortData, ResponseData } from "../common/types";
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
    const response = await axs.delete<ResponseData>(`/cohorts/${cohortId}`);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getCohortDetails = async (cohortId: string) => {
  try {
    const response = await axs.get<ResponseData>(`/cohorts/${cohortId}`);
    return response;
  } catch (error: any) {
    throw error;
  }
};
