// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleResponse = (response: any): any => {
  if (
    response?.status === 200 ||
    response?.status === 204 ||
    response?.status === 201
  ) {
    return response.data;
  } else {
    if (response?.status === 401) {
      // Redirect to login
      // window.location.href = "/login";
      console.log("error");
    } else {
      throw response;
      // return response;
    }
  }
};
