import { useContext, useEffect, useState } from "react";
import { axiosInstance } from "../../utils/hooks/useAxiosSecure";
import useTheme from "../../utils/hooks/useTheme";
import { format } from "date-fns";
import EmptyPage from "../../components/EmptyPage";
import { MdCancel } from "react-icons/md";
import { MdGridOn, MdTableChart } from "react-icons/md"; // Importing icons for Grid and Table layout
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../context/AuthContextProvider";

const AllVolunteerNeedPosts = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [isCardView, setIsCardView] = useState(true); // State to toggle between card and table view
  const { isDarkMode } = useTheme();
  const { loading, setLoading } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    axiosInstance.get(`/api/all-posts?search=${search}`).then((res) => {
      setLoading(false);
      setPosts(res.data);
    });
  }, [search]);

  const handlerReset = () => {
    setSearch("");
  };

  if (!search) {
    if (loading) {
      return <Loader />;
    }
  }

  // Function to toggle between card and table layout
  const toggleLayout = () => {
    setIsCardView(!isCardView);
  };

  return (
    <div className="my-6 w-11/12 mx-auto">
      <Helmet>
        <title>All Volunteer Need Posts - Volunteer Platform</title>
      </Helmet>

      {/* Header with search input and layout toggle button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold animate__animated animate__backInLeft">
          All Volunteer Need Posts
        </h1>
        <div className="flex items-center space-x-4">
          {/* Layout toggle button */}
          <button
            onClick={toggleLayout}
            className="p-2 rounded-md bg-[#3a5f9c] text-white hover:bg-[#27426d]"
          >
            {isCardView ? <MdTableChart /> : <MdGridOn />}
          </button>

          {/* Search input */}
          <div className="relative">
            <input
              onChange={(e) => setSearch(e.target.value)}
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
                  className="ml-2 absolute text-[#3a5f9c] right-24 text-2xl"
                />
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Display Empty Page if no posts found */}
      {posts.length === 0 && <EmptyPage />}

      {/* Conditional rendering of card layout or table layout */}
      {isCardView ? (
        // Card layout
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className={`${
                isDarkMode ? "border border-gray-600" : ""
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
                  <h3 className="text-xl font-semibold dark:text-violet-600">
                    {post.PostTitle}
                  </h3>
                  <p>
                  Volunteers Needed: <span className="font-medium">{post?.NoOfVolunteersRequired}</span>
                </p>
                <p>Category: <span className="leading-snug font-semibold dark:text-gray-600">
                    {post.category}
                  </span></p>
                 
                </div>
                <div className="flex items-center gap-2">
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
      ) : (
        // Table layout
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="font-bold text-sm">
                <th>Post Title</th>
                <th>Category</th>
                <th>Deadline</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id}>
                  <td>{post.PostTitle}</td>
                  <td>{post.category}</td>
                  <td>{format(new Date(post.startDate), "dd-MM-yyyy")}</td>
                  <td>
                    <Link to={`/VolunteerNeedPostDetails/${post._id}`}>
                      <button className="btn hover:bg-[#2b4470] bg-[#3a5f9c] text-white">
                        View Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllVolunteerNeedPosts;
