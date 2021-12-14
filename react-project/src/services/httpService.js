import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  const { response } = error;
  if (!response) {
    toast.error("Bad connection to server");
  }
  if (response && response.status >= 403) {
    toast.error("An expected error occured");
  }
  return Promise.reject(error);
});

export function setDeafultCommonHeader(header, value) {
  axios.defaults.headers.common[header] = value;
}

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setDeafultCommonHeader,
};

export default http;
