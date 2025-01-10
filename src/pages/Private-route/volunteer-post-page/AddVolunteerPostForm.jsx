import { useContext, useState } from "react";
import { ThemeContext } from "../../../context/ThemeProviderContext";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./volunteerpost.css";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../../context/AuthContextProvider";
import { Helmet } from "react-helmet-async";
const AddVolunteerPostForm = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(new Date());
  const [category, setCategory] = useState("");
  const serverUrl = import.meta.env.VITE_VOLUNTEER_MANAGEMENT_SERVER_URL;

  const postHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const {
      name,
      email,
      Thumbnail,
      PostTitle,
      Location,
      volunteersRequired,
      Description,
    } = data;
    const NoOfVolunteersRequired = parseInt(volunteersRequired);
    const postData = {
      name,
      email,
      Thumbnail,
      PostTitle,
      Location,
      category,
      startDate,
      NoOfVolunteersRequired,
      Description,
    };
    console.log(Description);
    axios
      .post(`${serverUrl}/api/posts`, postData)
      .then((response) => {
        console.log("Post added successfully:", response);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Success! Your volunteer post has been added.",
          text: "Thank you for your contribution to the community.",
          showConfirmButton: false,
          timer: 3000,
        });
        e.target.reset();
        navigate(`/manageMyPosts/${user.email}`);
      })
      .catch((error) => {
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
      {/* py-10 flex w-11/12 mx-auto items-center justify-center */}
      <Helmet>
        <title>Add Volunteer Post - Volunteer Platform</title>
      </Helmet>
      <div className="postbg ">
        <div className="py-10 flex w-11/12 mx-auto items-center justify-center">
          <div
            className={`card-body  bg-base-100 w-full max-w-screen-lg rounded-lg shrink-0 shadow-2xl ${
              isDarkMode ? "border border-[#891f21]" : ""
            }`}
          >
            <h3 className="text-center text-2xl font-medium">
              Add volunteer post{" "}
            </h3>
            <form
              className="grid grid-cols-1 md:grid-cols-2 items-center justify-center  gap-x-6"
              onSubmit={postHandler}
            >
              {/*Organizer Name (Read-only)*/}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name (Read-only)</span>
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
                  <span className="label-text">Email (Read-only)</span>
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
                />
              </div>

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
                  <option value="Environmental">Environmental</option>
                </select>
              </div>
              {/* Description */}
              <div className="form-control md:grid  md:col-span-2">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  name="Description"
                  placeholder="Description"
                  className="textarea textarea-bordered textarea-lg w-full"
                ></textarea>
              </div>

              <div className="form-control mt-6 md:grid md:col-span-2">
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
    </div>
  );
};

export default AddVolunteerPostForm;
