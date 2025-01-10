import React, { useContext } from "react";
// 
import teamImage from "../../assets/sliderImg/slider3.jpg"; // Example image path
import { ThemeContext } from "../../context/ThemeProviderContext";

const AboutUs = () => {
  const {isDarkMode} = useContext(ThemeContext)
  return (
    <section className={`${isDarkMode? 'bg-gray-900 text-white': 'bg-white text-gray-800'} py-12`}>
      <div className="container mx-auto px-6 lg:px-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold ">About Us</h2>
          <p className="text-lg mt-4 ">
            At HelpUp, we believe in the power of collective action to create meaningful change. Our mission is to connect volunteers with impactful opportunities that address critical challenges in communities worldwide.
          </p>
        </div>
        <div className="lg:flex lg:items-center lg:gap-10">
          <div className="lg:w-1/2 mb-6 lg:mb-0">
            <img
              src={teamImage}
              alt="Our Team"
              className="rounded-lg shadow-md object-cover w-full h-96"
            />
          </div>
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-semibold  mb-4">
              Who We Are
            </h3>
            <p className=" mb-6">
              HelpUp is a platform that bridges the gap between those in need and those who are willing to help. Our vision is a world where every individual has the opportunity to contribute to the well-being of others, regardless of their background or circumstances.
            </p>
            <h3 className="text-2xl font-semibold  mb-4">
              What We Do
            </h3>
            <p className=" mb-6">
              We work tirelessly to identify pressing community needs and create volunteer programs that make a real difference. From environmental conservation to education and healthcare initiatives, our diverse projects offer something for everyone who wants to make an impact.
            </p>
            <h3 className="text-2xl font-semibold  mb-4">
              Join Us
            </h3>
            <p className="">
              Become a part of our growing community of changemakers. Together, we can build a brighter, more equitable future for all.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
