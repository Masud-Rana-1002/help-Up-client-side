import { useEffect, useState } from "react";

import { axiosInstance } from "../../utils/hooks/useAxiosSecure";
import useTheme from "../../utils/hooks/useTheme";
import { format } from "date-fns";
import EmptyPage from "../../components/EmptyPage";
import { MdCancel } from "react-icons/md";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";

const AllVolunteerNeedPosts = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const { isDarkMode } = useTheme();
  const [IsLoading, setIsLoading] = useState(false);
  console.log(search);
  useEffect(() => {
    axiosInstance.get(`/api/all-posts?search=${search}`).then((res) => {
      setPosts(res.data);
    });
  }, [search]);

  const handlerReset = () => {
    setSearch("");
  };
  // if(posts.length === 0){
  // setIsLoading(true);
  //    setTimeout(() => {
  //     setIsLoading(false); // Stop loading after 3 seconds
  //   }, 3000); // 3000 ms = 3 seconds
  //   IsLoading && <Loader />;
  // };

  return (
    <div className="my-6">
      <div className="flex  justify-between items-center">
        <div>
          <h1 className="  text-2xl font-bold animate__animated animate__backInLeft">
            {" "}
            All Volunteer Need Posts
          </h1>
        </div>
        <div className=" relative">
          <input
            onChange={(e) => setSearch(e.target.value)}
            defaultValue={search}
            value={search}
            type="text"
            placeholder="Search by Post Title"
            className="border border-[#e5eaf2] py-3 pl-4 pr-[115px] outline-none w-full rounded-md"
          />

          <span className="bg-[#3a5f9c] text-white absolute top-0 right-0 h-full px-5 flex items-center justify-center rounded-r-md cursor-pointer hover:bg-[#27426d] group">
            Search
            {search && (
              <MdCancel
                onClick={handlerReset}
                className="ml-2 absolute text-[#3a5f9c] right-24 text-2xl "
              />
            )}
            {/* <div className="absolute text-[#3a5f9c] right-24 text-2xl "><MdCancel /></div> */}
          </span>
        </div>
      </div>
      {posts.length === 0 && <EmptyPage />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 my-6">
        {posts.map((post) => (
          <div
            className={`${
              isDarkMode && " border border-gray-600"
            } max-w-lg p-4 shadow-md dark:bg-gray-50 dark:text-gray-800`}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <img
                  src={post.Thumbnail}
                  alt=""
                  className="block object-cover object-center w-full rounded-md h-72 dark:bg-gray-500"
                />
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
              <div className="flex items-center gap-2 ">
                <p className="text-lg font-semibold">Deadline:</p>
                <span>{format(new Date(post.startDate), "dd-MM-yyyy")}</span>
              </div>
              <Link to={`/VolunteerNeedPostDetails/${post._id}`}>
                <button className="btn my-1 hover:bg-[#27426d] bg-[#3a5f9c] text-white">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllVolunteerNeedPosts;
