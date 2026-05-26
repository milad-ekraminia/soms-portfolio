import { Headers } from "@/types/api-method";
const TENANT = import.meta.env.VITE_API_TENANT;

export const constructHeaders = (
  token: string | null | undefined,
  isHeaderJson?: boolean,
  hasTenant?: boolean,
  hasExcel?: boolean
): { headers: Headers } => {
  // const currentLanguage = "tr";

  const headers: Headers = {
    "Access-Control-Allow-Origin": "*/*",
    "Accept": "*/*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type",
    // "Accept-Language": currentLanguage,
    "RequestVerificationToken": "CfDJ8IAhrR55a-VCl2rcJr5xYwEUIWxloES1cW6OH_ZAATUSJiTHwLdsj2JoK-pTVBIwXg_al1MUYGFFykyZetf2ARMHew2AYGZh4WAbsw8fYk8ZG70O-GceDqXW7Wz9yNXa_6gQ2bK5XCyueau-UVFwRUU",
    "X-Requested-With": "XMLHttpRequest"
  };

  if (hasExcel) {
    headers["__tenant"] = TENANT;
    headers["Accept"] =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    headers["Content-Type"] = "application/json";
  }

  if (hasTenant) {
    headers["__tenant"] = TENANT;
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (isHeaderJson) {
    headers["Content-Type"] = "application/x-www-form-urlencoded;";
    headers["Accept"] = "*/*";
    headers["Access-Control-Allow-Credentials"] = "true";
  }

  return { headers };
};
