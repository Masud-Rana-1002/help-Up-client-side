import { useEffect, useState } from "react";

import { axiosInstance } from "../../utils/hooks/useAxiosSecure";
import useTheme from "../../utils/hooks/useTheme";


const AllVolunteerNeedPosts = () => {
   const [posts, setPosts] = useState([]);
    const { isDarkMode } = useTheme()
    console.log(isDarkMode);
    useEffect(() => {
      axiosInstance.get(`/api/posts?sortByDeadline=true&&dataLimit=6`).then((res) => {
        setPosts(res.data);
      });
    }, []);
  return (
    <div>
      
    </div>
  );
};

export default AllVolunteerNeedPosts;