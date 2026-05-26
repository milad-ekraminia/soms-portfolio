// response-handler.ts
import { AxiosResponse, AxiosError } from "axios";

export const handleResponse = (response: AxiosResponse): any => {
  const status = response.status;
  if (status === 204) {
    return {
      responseStatusCode: 204,
      responseMessage: "İşleminiz başarıyla gerçekleştirilmiştir.",
      responseList: [],
    };
  }
  if (status === 200 || status === 201 ) {
    return response.data;
  }

  switch (status) {
    case 401:
      // Maybe trigger a logout flow or refresh token logic
      console.warn("Unauthorized - redirecting to login...");
      window.location.href = "/login";
      break;
    case 403:
      console.warn("Forbidden - redirecting to /unauthorized");
      // window.location.href = "/unauthorized";
      break;
    case 404:
      console.warn("Not Found - you could navigate to a 404 page");
      window.location.href = "/not-found";
      break;
    case 500:
      console.error("Server Error - redirecting to /server-error");
      window.location.href = "/server-error";
      break;
    default:
      console.error("Unhandled response status:", status);
      throw response;
  }
};

// Handles axios errors as well
export const handleError = (error: AxiosError): never => {
  if (error.response) {
    console.error("API Error:", error.response.status, error.response.data);
    handleResponse(error.response); // Reuse the same handler
  } else if (error.request) {
    console.error("No response received from server.");
  } else {
    console.error("Request setup error:", error.message);
  }
  throw error; // propagate error to be handled by caller if needed
};
