import axios  from "axios";

const URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: URL,
  withCredentials: true,
});

export default axiosInstance;