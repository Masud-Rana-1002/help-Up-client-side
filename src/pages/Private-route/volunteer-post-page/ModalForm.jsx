import { useContext, useState } from "react";
import { ThemeContext } from "../../../context/ThemeProviderContext";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./volunteerpost.css";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../../context/AuthContextProvider";
import { format } from "date-fns";
import { axiosInstance } from "../../../utils/hooks/useAxiosSecure";
const ModalForm = ({ data }) => {
  const {
    Location,
    PostTitle,
    Thumbnail,
    category,
    email,
    name,
    startDate,
   
NoOfVolunteersRequired,
    Description,
    _id,
  } = data;
  const { isDarkMode } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const [suggestion, setSuggestion] = useState("");


  const serverUrl = import.meta.env.VITE_VOLUNTEER_MANAGEMENT_SERVER_URL;

  const BeVolunteerHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const { volunteerName, volunteerEmail, suggestion } = data;
    const requestData = {
      // name,
      // email,
      // Thumbnail,
      // PostTitle,
      // Location,
      // category,
      // startDate,
      // volunteersRequired,
      // Description
      postId: _id,
      volunteerName,
      volunteerEmail,
      suggestion,
      status: "requested",
    };
    axiosInstance
      .post(`/api/volunteer-request`, requestData)
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
      <div className="w-full   min-h-[calc(100vh-84px)]">
        <div
          className={`p-2   w-full rounded-lg shrink-0  ${
            isDarkMode ? "border border-[#891f21]" : ""
          }`}
        >
          <h3 className="text-center text-2xl font-medium">
            Add volunteer post{" "}
          </h3>
          <form
            className="grid w-full  grid-cols-1 md:grid-cols-2 items-center  gap-x-6"
            onSubmit={BeVolunteerHandler}
          >
            {/*Organizer Name (Read-only)*/}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Organizer name</span>
              </label>
              <input
                name="name"
                type="text"
                defaultValue={name}
                className="input input-bordered cursor-not-allowed"
                required
              />
            </div>
            {/* Organizer Email (Read-only) */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Organizer email</span>
              </label>
              <input
                name="email"
                defaultValue={email}
                type="text"
                className="input input-bordered cursor-not-allowed"
                required
              />
            </div>
            {/*Volunteer name (Read-only)*/}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Volunteer name</span>
              </label>
              <input
                name="volunteerName"
                type="text"
                defaultValue={user?.displayName}
                className="input input-bordered cursor-not-allowed"
                required
              />
            </div>
            {/*Volunteer  Email (Read-only) */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Volunteer Email</span>
              </label>
              <input
                name="volunteerEmail"
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
                value={Thumbnail}
                placeholder="Thumbnail URL"
                className="input input-bordered cursor-not-allowed "
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
                value={PostTitle}
                type="text"
                placeholder="Post Title"
                className="input input-bordered cursor-not-allowed "
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
                value={Location}
                type="text"
                placeholder="Location"
                className="cursor-not-allowed  input input-bordered"
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
                value={
                  NoOfVolunteersRequired}
                placeholder="Enter number of volunteers required"
                className="input input-bordered cursor-not-allowed "
                required
              />
            </div>

            {/* React Datepicker */}
            <div className="mt-4 w-full border border-gray-300 rounded-md p-1">
              <DatePicker
                showIcon
                value={format(new Date(startDate), "dd-MM-yyyy")}
                className="w-full cursor-not-allowed focus:outline-none text-gray-700"
                dateFormat="yyyy/MM/dd"
                placeholderText="Select a date"
                required
              />
            </div>

            {/* Category Dropdown */}
            <div className="mt-4 w-full border-gray-300 rounded-md p-2">
              <select
                required
                className="select cursor-not-allowed  select-bordered w-full focus:outline-none text-gray-700"
                value={category}
                // onChange={(e) => setCategory(e.target.value)} // Attach the onChange handler
              >
                <option disabled>Select a category</option>
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
                readOnly
                placeholder="Description"
                value={Description}
                className="textarea cursor-not-allowed  textarea-bordered textarea-sm w-full"
              ></textarea>
            </div>
            {/* Suggestion  */}
            <div className="form-control md:grid  md:col-span-2">
              <label className="label">
                <span className="label-text">Suggestion </span>
              </label>
              <textarea
                name="suggestion"
                placeholder="Suggestion"
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                className="textarea textarea-bordered textarea-sm w-full"
              ></textarea>
            </div>

            <div className="form-control mt-6 md:grid md:col-span-2">
              <button
                className={`btn bg-[#CE3235] hover:bg-[#891f21] text-white `}
              >
                Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
