import httpRequest from "../axios/index";

import {
  CREATETABLEDATA_ENDPOINT,
  TABLEDATA_ENDPOINT,
} from "../constant/apiEndPoints";

export const Createtabledata = (values) => {
  return httpRequest.post(CREATETABLEDATA_ENDPOINT, values);
};

export const Tabledata = () => {
  return httpRequest.get(TABLEDATA_ENDPOINT);
};
