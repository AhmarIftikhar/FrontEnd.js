import httpRequest from "../axios/index";

import {
  CREATETABLEDATA_ENDPOINT,
  REGISTER_ENDPOINT,
} from "../constant/apiEndPoints";

export const Createtabledata = (values) => {
  return httpRequest.post(CREATETABLEDATA_ENDPOINT, values);
};

export const RegisterUser = (values) => {
  return httpRequest.post(REGISTER_ENDPOINT, values);
};
