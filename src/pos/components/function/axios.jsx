import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://aposadmin.acnoo.com/api/v1",
  // timeout: 1000,
  // headers: { "X-Custom-Header": "foobar" },
});

export default axiosInstance;
