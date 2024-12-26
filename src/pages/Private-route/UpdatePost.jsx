import { useContext, useState } from "react";

import { Link, useLoaderData, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Swal from "sweetalert2";

import { ThemeContext } from "../../context/ThemeProviderContext";
import { axiosInstance } from "../../utils/hooks/useAxiosSecure";
import { AuthContext } from "../../context/AuthContextProvider";
import { format } from "date-fns";
import { Helmet } from "react-helmet-async";
const UpdatePost = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const postData = useLoaderData();
const navigate = useNavigate()
  const [StartDate, setStartDate] = useState(postData?.startDate || new Date()
  );
  const [Category, setCategory] = useState(postData?.category || "");
  const serverUrl = import.meta.env.VITE_VOLUNTEER_MANAGEMENT_SERVER_URL;

  const UpdatePostHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const {
      Thumbnail,
      PostTitle,
      Location,
      volunteersRequired,
      Description,
    } = data;
    const NoOfVolunteersRequired = parseInt(volunteersRequired);
    const UpdateData = {
      Thumbnail,
      PostTitle,
      Location,
      category: Category,
      startDate: StartDate,
      NoOfVolunteersRequired,
      Description,
    };
  
    axiosInstance
      .patch(`/api/posts/update/${postData._id}`, UpdateData)
      .then((response) => {
        console.log("Post added successfully:", response);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Post Updated Successfully!",
          text: "Your changes have been saved. Thank you for keeping the information up-to-date.",
          showConfirmButton: false,
          timer: 3000,
        });
        navigate(`/manageMyPosts/${user.email}`)
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops! Something went wrong.",
          text: "An error occurred while updating your post. Please check your internet connection and try again.",
          showConfirmButton: true,
        });
      });
  };

  return (
    <div>
         <Helmet>
        <title>Manage My Post - Volunteer Platform</title>
      </Helmet>
      <div className="postbg flex  items-center justify-center gap-32 min-h-[calc(100vh-84px)]">
        {/* lottie-react */}
        {/* <div className=" hidden lg:block ">
          {/* <Lottie animationData={logInAnimation} loop={true} /> */}
        {/* </div> */}
        {/* login form */}
        <div
          className={`card-body  bg-base-100 w-full max-w-screen-lg rounded-lg shrink-0 shadow-2xl ${
            isDarkMode ? "border border-[#891f21]" : ""
          }`}
        >
          <h3 className="text-center text-2xl font-medium">
            Update post{" "}
          </h3>
          <form
            className="grid grid-cols-1 md:grid-cols-2 items-center justify-center  gap-x-6"
            onSubmit={UpdatePostHandler}
          >
            {/*Organizer Name (Read-only)*/}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Organizer Name (Read-only)</span>
              </label>
              <input
                name="name"
                type="text"
                defaultValue={user?.displayName}
                className="input input-bordered cursor-not-allowed"
                required
              />
            </div>
            {/* Organizer Email (Read-only) */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Organizer Email (Read-only)</span>
              </label>
              <input
                name="email"
                defaultValue={user?.email}
                type="text"
                className="input input-bordered cursor-not-allowed"
                required
              />
            </div>
            {/* Thumbnail */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Thumbnail</span>
              </label>
              <input
                name="Thumbnail"
                type="url"
                placeholder="Thumbnail URL"
                className="input input-bordered"
                required
                defaultValue={postData.Thumbnail}
              />
            </div>
            {/* Post Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Post Title </span>
              </label>
              <input
                name="PostTitle"
                type="text"
                placeholder="Post Title"
                className="input input-bordered"
                required
                defaultValue={postData.PostTitle}
              />
            </div>
            {/*Location */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input
                name="Location"
                type="text"
                placeholder="Location"
                className="input input-bordered"
                required
                defaultValue={postData.Location}
              />
            </div>
            {/*No. of volunteers needed*/}
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Number of volunteers required
                </span>
              </label>
              <input
                name="volunteersRequired"
                type="number"
                placeholder="Enter number of volunteers required"
                className="input input-bordered"
                required
                defaultValue={postData.NoOfVolunteersRequired}
              />
            </div>

            {/* React Datepicker */}
            <div className="mt-4 w-full border border-gray-300 rounded-md p-1">
              <DatePicker
                showIcon
                selected={StartDate}
                className="w-full focus:outline-none text-gray-700"
                dateFormat="dd-MM-yyyy"
                onChange={(date) => setStartDate(date)}
                placeholderText="Select a date"
                required
               
              
              />
            </div>

            {/* Category Dropdown */}
            <div className="mt-4 w-full border-gray-300 rounded-md p-2">
              <select
                required
                className="select select-bordered w-full focus:outline-none text-gray-700"
                value={Category}
                onChange={(e) => setCategory(e.target.value)} // Attach the onChange handler
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Social service">Social Service</option>
                <option value="Animal welfare">Animal Welfare</option>
                <option value="Environmental">Environmental</option>
              </select>
            </div>
            {/* Description */}
            <div className="form-control md:grid  md:col-span-2">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
              required
              defaultValue={postData?.Description}
                name="Description"
                placeholder="Description"
                className="textarea textarea-bordered textarea-lg w-full"
              ></textarea>
            </div>

            <div className="form-control mt-6 md:grid md:col-span-2">
              <button
                className={`btn bg-[#3a5f9c] hover:bg-[#284168]  text-white `}
              >
                Update Post
              </button>
            </div>
          </form>

          {/* bordered google login button */}
        </div>
      </div>
    </div>
  );
};

export default UpdatePost;
