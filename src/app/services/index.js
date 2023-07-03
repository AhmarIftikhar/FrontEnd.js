import httpRequest from "../axios/index";

import {
  CREATETABLEDATA_ENDPOINT,
  TABLEDATA_ENDPOINT,
  REGISTER_ENDPOINT,
  LOGIN_ENDPOINT,
  FORGOTPASSWORD_ENDPOINT,
  RESETPASSWORD_ENDPOINT,
} from "../constant/apiEndPoints";

export const RegisterUser = (values) => {
  return httpRequest.post(REGISTER_ENDPOINT, values);
};
export const LoginUser = (values) => {
  return httpRequest.post(LOGIN_ENDPOINT, values);
};
export const ForgotPassword = (values) => {
  return httpRequest.post(FORGOTPASSWORD_ENDPOINT, values);
};
export const ResetPassword = (values) => {
  return httpRequest.post(RESETPASSWORD_ENDPOINT, values);
};
export const Createtabledata = (values) => {
  return httpRequest.post(CREATETABLEDATA_ENDPOINT, values);
};

export const Tabledata = () => {
  return httpRequest.get(TABLEDATA_ENDPOINT);
};
