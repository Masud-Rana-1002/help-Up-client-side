import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_VOLUNTEER_MANAGEMENT_SERVER_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { userLogout } = useContext(AuthContext);
  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (error.status === 401 || error.status === 403) {
          userLogout().then(() => {
            navigate("/login");
          });
        }
        return Promise.reject(error);
      },
      [userLogout, navigate]
    );
  });
  return axiosInstance
};
export default useAxiosSecure;
