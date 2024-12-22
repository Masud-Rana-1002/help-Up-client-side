import { useContext, useState } from "react";
import { ThemeContext } from "../../../context/ThemeProviderContext";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./volunteerpost.css";
import axios from "axios";
import Swal from "sweetalert2";
const AddVolunteerPostForm = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [startDate, setStartDate] = useState(new Date());
  const [category, setCategory] = useState("");
  const serverUrl = import.meta.env.VITE_VOLUNTEER_MANAGEMENT_SERVER_URL;

  const postHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const { name, email, Thumbnail, PostTitle, Location} = data;
    const postData={
      name, email, Thumbnail, PostTitle, Location,category ,startDate
    }

    axios.post(`${serverUrl}/api/posts`, postData)
    .then(response => {
      console.log('Post added successfully:', response);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Success! Your volunteer post has been added.",
        text: "Thank you for your contribution to the community.",
        showConfirmButton: false,
        timer: 3000,
      });
      e.target.reset();

    })
    .catch(error => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Oops! Something went wrong.",
        text: "We couldn't add your volunteer post. Please try again later.",
        showConfirmButton: true,
      });
    });

  };

  return (
    <div>
      <div className="postbg flex  items-center justify-center gap-32 min-h-[calc(100vh-84px)]">
        {/* lottie-react */}
        {/* <div className=" hidden lg:block ">
          {/* <Lottie animationData={logInAnimation} loop={true} /> */}
        {/* </div> */}
        {/* login form */}
        <div
          className={`card-body  bg-base-100 w-full max-w-lg shrink-0 shadow-2xl ${
            isDarkMode ? "border border-[#891f21]" : ""
          }`}
        >
          <h3 className="text-center text-2xl font-medium">
            Add volunteer post{" "}
          </h3>
          <form onSubmit={postHandler}>
            {/*Organizer Name (Read-only)*/}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Organizer Name (Read-only)"
                className="input input-bordered"
                required
              />
            </div>
            {/* Organizer Email (Read-only) */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="text"
                placeholder="Organizer Email (Read-only)"
                className="input input-bordered"
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
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              {/* React Datepicker */}
              <div className="mt-4 w-full border border-gray-300 rounded-md p-1">
                <DatePicker
                  showIcon
                  selected={startDate}
                  className="w-full focus:outline-none text-gray-700"
                  dateFormat="yyyy/MM/dd"
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
                  value={category}
                  onChange={(e) => setCategory(e.target.value)} // Attach the onChange handler
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="social service">Social Service</option>
                  <option value="animal welfare">Animal Welfare</option>
                </select>
              </div>
            </div>
            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                placeholder="Description"
                className="textarea textarea-bordered textarea-lg w-full"
              ></textarea>
            </div>

            <div className="form-control mt-6">
              <button
                className={`btn bg-[#CE3235] hover:bg-[#891f21] text-white `}
              >
                Add Post
              </button>
            </div>
          </form>

          {/* bordered google login button */}
        </div>
      </div>
    </div>
  );
};

export default AddVolunteerPostForm;
