import { setLoginStateEmpty } from "../store/slices/login";
import { store } from "../store/index";

export const requestHandler = (request) => {
  const token = localStorage.getItem("accessToken") || "";
  if (token) request.headers.Authorization = `Bearer ${token}`;
  return request;
};

export const successHandler = (response) => {
  return {
    ...response,
    data: response.data,
  };
};

export const errorHandler = (error) => {
  const { status } = error.response;
  if (status === 401) {
    const { dispatch } = store;
    dispatch(setLoginStateEmpty(true));
  }
  return Promise.reject(error);
};
