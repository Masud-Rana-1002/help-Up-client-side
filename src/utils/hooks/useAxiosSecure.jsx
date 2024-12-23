import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_VOLUNTEER_MANAGEMENT_SERVER_URL,
withCredentials: true,
});