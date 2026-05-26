// axios-instance.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { handleResponse, handleError } from "./axios-responce-handler";
import { BaseUrlKey, CustomAxiosConfig } from "@/types/api-method";

const MAIN_URL = import.meta.env.VITE_API_MAIN_URL;
const AUTH_URL = import.meta.env.VITE_API_AUTHENTICATION_URL;
const SMS_URL = import.meta.env.VITE_API_SMS_URL;
const NOTIFICATIONS_URL = import.meta.env.VITE_API_NOTIFICATIONS_URL;
const PERMISSIONS_URL = import.meta.env.VITE_API_PERMISSIONS_URL;

const getTokenFromStorage = () => {
  let token = localStorage.getItem("ROCP_token") ?? undefined;
  if (token) {
    token = token.replace(/^"+/, "").replace(/"+$/, "");
  }
  return token;
};

const baseUrls: Record<BaseUrlKey, string> = {
  main: MAIN_URL,
  auth: AUTH_URL,
  sms: SMS_URL,
  notifications: NOTIFICATIONS_URL,
  permissions: PERMISSIONS_URL,
};

export const axiosInstance = axios.create({
  timeout: 120000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // treat incoming config as CustomAxiosConfig inside interceptor
    const custom = config as CustomAxiosConfig;

    // choose baseURL by custom.baseUrlKey
    if (custom.baseUrlKey && baseUrls[custom.baseUrlKey]) {
      custom.baseURL = baseUrls[custom.baseUrlKey];
    } else {
      custom.baseURL = baseUrls.main;
    }

    // ensure headers object exists
    custom.headers =
      custom.headers ?? ({} as InternalAxiosRequestConfig["headers"]);

    // token priority: custom.default_token -> getTokenFromStorage()
    const token = custom.default_token ?? getTokenFromStorage();
    if (token) {
      // headers typing can be awkward — cast to any for assignment
      (custom.headers as any).Authorization = `Bearer ${token}`;
    }

    // Content-Type selection
    if (custom.hasExcel) {
      (custom.headers as any)["Content-Type"] =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    } else if (custom.isHeaderJson) {
      (custom.headers as any)["Content-Type"] = "application/json";
    } else {
      (custom.headers as any)["Content-Type"] =
        "application/x-www-form-urlencoded";
    }

    if (custom.hasTenant) {
      const tenantId = localStorage.getItem("tenantId");
      if (tenantId) (custom.headers as any)["X-Tenant-ID"] = tenantId;
    }

    // return as InternalAxiosRequestConfig (CustomAxiosConfig is compatible)
    return custom as InternalAxiosRequestConfig;
  },
  (error: AxiosError) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => handleResponse(response),
  (error: AxiosError) => handleError(error)
);
