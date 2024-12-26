import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";

// Create axios instance with base URL and credentials
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_VOLUNTEER_MANAGEMENT_SERVER_URL,
  withCredentials: true,  
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { userLogout } = useContext(AuthContext);

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        // Check for 401 or 403 errors
        if (error.response?.status === 401 || error.response?.status === 403) {
          await userLogout();  // Log the user out
          navigate("/login");  // Redirect to login page
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptor on unmount
    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [userLogout, navigate]); // Ensure the effect re-runs when these dependencies change

  return axiosInstance;
};

export default useAxiosSecure;