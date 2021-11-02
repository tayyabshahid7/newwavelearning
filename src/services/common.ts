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

export const getCohorts = async () => {
  try {
    const response = await axs.get<ResponseData>("/cohorts/");
    return response;
  } catch (error: any) {
    throw error;
  }
};
