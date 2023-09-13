import axios from "axios";
import { BASE_URL } from "../constants/constants";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(
  async (config) => {
    // const { category, maxResults } = appSelector((state) => state.booksSlice);
    // +subject:${category}&maxResults=${maxResults}
    config.baseURL = BASE_URL;
    // console.log("  config.url", config.url);

    return config;
  },
  (error) => {
    console.log("axiosInstance error", error);
    return Promise.reject(error);
  }
);
export default axiosInstance;
