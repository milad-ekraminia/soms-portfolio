// api-methods.ts
import { axiosInstance } from "./axios/axios-instance";
import { constructGetParams } from "./construct-get-params";
import { CustomAxiosConfig, GetData } from "@/types/api-method";

export const getData = async <T = any>({
  endPoint,
  type,
  dataParams = {},
  baseUrlKey = "main",
  isHeaderJson = false,
  default_token = null,
  hasTenant = false,
}: GetData & Omit<CustomAxiosConfig, "url" | "method">): Promise<T> => {
  const options: CustomAxiosConfig = {
    baseUrlKey,
    isHeaderJson,
    default_token,
    hasTenant,
  };

  if (type === "post") {
    const body = isHeaderJson ? dataParams : new URLSearchParams(dataParams);
    const res = await axiosInstance.post<T>(endPoint, body, options);
    return res as unknown as T; // <- cast to T
  }

  if (type === "delete") {
    const res = await axiosInstance.delete<T>(endPoint, {
      ...options,
      data: dataParams,
    });
    return res as unknown as T;
  }

  const params = constructGetParams(dataParams);
  const res = await axiosInstance.get<T>(`${endPoint}${params}`, options);
  return res as unknown as T;
};

// api-methods.ts
export const getFormDataPost = async <T = any>({
  endPoint,
  formData,
  type = "post",
  baseUrlKey = "main",
  default_token,
  hasTenant = false,
  hasExcel = false,
  isHeaderJson, // optional now
}: {
  endPoint: string;
  formData: any;
  type?: "post" | "put";
} & CustomAxiosConfig): Promise<T> => {
  // Automatically detect if we should send JSON
  const shouldSendJson =
    (typeof formData === "object" && formData !== null) ||
    Array.isArray(formData);
const isFormData = formData instanceof FormData;

  const res = await axiosInstance.request<T>({
    url: endPoint,
    method: type,
    data: formData,
    baseUrlKey,
    hasTenant,
    hasExcel,
    default_token,
    isHeaderJson: isFormData ? false : isHeaderJson ?? shouldSendJson,
  } as CustomAxiosConfig);
  return res as unknown as T; // <- cast to T so TS is happy
};
