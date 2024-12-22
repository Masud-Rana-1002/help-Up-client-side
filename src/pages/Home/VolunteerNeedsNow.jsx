import React, { useContext, useEffect, useState } from "react";
import img1 from "../../assets/uorgoalimg/work1.jpg";
import { use } from "react";
import axios from "axios";
import { ThemeContext } from "../../context/ThemeProviderContext";
const VolunteerNeedsNow = () => {
  const serverUrl = import.meta.env.VITE_VOLUNTEER_MANAGEMENT_SERVER_URL;
  const [posts, setPosts] = useState([]);
  const { isDarkMode } = useContext(ThemeContext);
  useEffect(() => {
    axios.get(`${serverUrl}/api/posts`).then((res) => {
      setPosts(res.data);
    });
  }, []);
  console.log(posts);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div className={`${isDarkMode&&' border border-gray-600'} max-w-lg p-4 shadow-md dark:bg-gray-50 dark:text-gray-800`}>
            <div className="space-y-4">
              <div className="space-y-2">
                <img
                  src={post.Thumbnail}
                  alt=""
                  className="block object-cover object-center w-full rounded-md h-72 dark:bg-gray-500"
                />
                <div className="flex items-center text-xs">
                  <span>{post.startDate}</span>
                </div>
              </div>
              <div className="space-y-2">
                <a rel="noopener noreferrer" href="#" className="block">
                  <h3 className="text-xl font-semibold dark:text-violet-600">
                    {post.PostTitle}
                  </h3>
                </a>
                <p className="leading-snug dark:text-gray-600">
                  {post.category}
                </p>
              </div>
              <button className='btn my-1 hover:bg-[#3a5f9c] bg-[#3a5f9c] text-white'>View Details </button>
            </div>
            
          </div>
        ))}
      </div>
      <div className="mx-auto flex items-center justify-center mt-4">
        {/* right top */}
        <button className="px-6 py-2 rounded-md border border-[#3a5f9c] relative before:absolute overflow-hidden before:translate-x-[200px] hover:before:translate-x-0 before:-translate-y-12 hover:before:-translate-y-0 before:z-[-1] before:transition before:duration-300 hover:text-white  before:w-full before:h-full before:bg-[#3a5f9c] before:top-0 before:left-0">
          See all
        </button>
      </div>
    </div>
  );
};

export default VolunteerNeedsNow;
