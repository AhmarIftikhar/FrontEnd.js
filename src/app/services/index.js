import httpRequest from "../axios/index";

import { LOGIN_ENDPOINT, REGISTER_ENDPOINT } from "../constant/apiEndPoints";

export const LoginUser = (values) => {
  return httpRequest.post(LOGIN_ENDPOINT, values);
};

export const RegisterUser = (values) => {
  return httpRequest.post(REGISTER_ENDPOINT, values);
};
