import { format } from "date-fns";
import React, { useContext } from "react";
import { BiCategory } from "react-icons/bi";
import { CgCalendarDates } from "react-icons/cg";
import { FaLocationDot } from "react-icons/fa6";
import { MdNumbers } from "react-icons/md";
import { Link, useLoaderData } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeProviderContext";

const VolunteerNeedPostDetails = () => {
  const { modalOpen, setModalOpen } = useContext(ThemeContext);

  const data = useLoaderData();
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
  return (
    <div className="min-h-screen detailsPage flex-col flex pt-16 items-center">
      <div className="text-center p-6 max-w-screen-lg mx-auto">
        <h1 className="  text-2xl font-bold animate__animated animate__backInLeft">
          {" "}
          Join Us in Making a Difference!
        </h1>
        <p>
          Become a volunteer and contribute to a meaningful cause. Help create a
          positive impact by joining our community event. Below are the event
          details including the date, location, and the number of volunteers
          needed.
        </p>
      </div>

      {/* Mamba ui hero use */}
      <section className="dark:bg-gray-100 w-11/12 shadow-2xl border dark:text-gray-800 ">
        <div className="  container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
          <div className="flex flex-1 flex-col justify-center p-6 text-center rounded-sm lg:max-w-lg xl:max-w-screen-xl lg:text-left">
            <h1 className="text-4xl font-bold leading-none sm:text-5xl">
              {PostTitle}
            </h1>
            <p className="mt-6 max-w-screen-sm mb-8 text-lg sm:mb-12">
              {Description}
            </p>

            <p className="flex  items-center justify-start gap-2 text-lg">
              <BiCategory className="text-2xl" /> {category}
            </p>
            <p className="flex  items-center justify-start gap-2 text-lg">
              <CgCalendarDates />
              {format(new Date(startDate), "dd-MM-yyyy")}
            </p>
            <p className="flex  items-center justify-start gap-2 text-lg">
              <MdNumbers />
              {NoOfVolunteersRequired}
            </p>
            <p className="flex  items-center justify-start gap-2 text-lg">
              <FaLocationDot /> {Location}
            </p>

            <div className=" flex items-center  mt-4">
              {/* right top */}
              <Link to={`/modal/${_id}`}>
                <button
                  onClick={() => setModalOpen(true)}
                  className="px-6 py-2 rounded-md border font-semibold border-[#3a5f9c] relative before:absolute overflow-hidden before:translate-x-[200px] hover:before:translate-x-0 before:-translate-y-12 hover:before:-translate-y-0 before:z-[-1] before:transition before:duration-300 hover:text-white  before:w-full before:h-full before:bg-[#3a5f9c] before:top-0 before:left-0 "
                >
                  Be a Volunteer
                </button>
              </Link>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 w-full ">
            <img
              src={Thumbnail}
              alt=""
              className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default VolunteerNeedPostDetails;
