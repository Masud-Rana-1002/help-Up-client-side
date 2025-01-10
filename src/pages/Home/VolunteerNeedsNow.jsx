import React, { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../utils/hooks/useAxiosSecure";
import { ThemeContext } from "../../context/ThemeProviderContext";
import { AuthContext } from "../../context/AuthContextProvider";
import Loader from "../../components/Loader";

const VolunteerNeedsNow = () => {
  const [posts, setPosts] = useState([]);
  const { isDarkMode } = useContext(ThemeContext);
  const { loading, setLoading } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/api/posts?sortByDeadline=true&&dataLimit=8`)
      .then((res) => {
        setLoading(false);
        setPosts(res.data);
      })
      .catch(() => setLoading(false));
  }, [setLoading]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold animate__animated animate__backInLeft">
          Upcoming Volunteer Opportunities
        </h1>
        <p>Find Urgent Volunteer Needs</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        {posts?.map((post) => (
          <div
            key={post._id}
            className={`${
              isDarkMode ? "bg-[#3A5F9C] text-white" : "bg-white text-black"
            } space-y-3 h-full p-4 flex flex-col justify-between bordered shadow-lg border border-gray-100 rounded-lg transition-transform duration-300 transform hover:scale-105`}
          >
            <div>
              <img
                src={post.Thumbnail}
                alt={post.PostTitle}
                className="block object-cover object-center w-full rounded-md h-56"
              />
              <div className="flex items-center text-xs mt-2">
                <span className="font-medium">
                  {post?.startDate
                    ? format(new Date(post?.startDate), "dd-MM-yyyy")
                    : "Date not available"}
                </span>
              </div>
              <div className="space-y-2 mt-3">
                <h3 className="text-xl font-semibold">{post.PostTitle}</h3>
                <p className="leading-snug pb-2">
                  Category: {post.category}
                </p>
              </div>
            </div>
            <div className="mt-auto">
              <Link to={`/VolunteerNeedPostDetails/${post._id}`}>
                <button className="btn hover:bg-[#2b4470] bg-[#3a5f9c] text-white w-full">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="mx-auto flex items-center justify-center mt-4">
        <Link to="/allVolunteerNeedPosts">
          <button className="px-6 py-2 rounded-md border border-[#3a5f9c] relative before:absolute overflow-hidden before:translate-x-[200px] hover:before:translate-x-0 before:-translate-y-12 hover:before:-translate-y-0 before:z-[-1] before:transition before:duration-300 hover:text-white before:w-full before:h-full before:bg-[#3a5f9c] before:top-0 before:left-0">
            See all
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VolunteerNeedsNow;
