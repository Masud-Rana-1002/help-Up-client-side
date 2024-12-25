import axios from "axios";
import { useEffect } from "react";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_VOLUNTEER_MANAGEMENT_SERVER_URL,
withCredentials: true,
});

const useAxiosSecure = ()=>{
  useEffect(()=>{
    axiosInstance.interceptors.response.use(response =>{
      return response
    },error=>{
      if(error.status === 401 || error.status === 403)
      return Promise.reject(error)
    })
  },[])
}