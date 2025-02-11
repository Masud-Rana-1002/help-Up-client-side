import React, { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeProviderContext";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";

const ContactUs = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const serviceID = "service_livvrzt";
    const templateID = "template_bt29fva";
    const userID = "ELAnnJNt5Ls682KlA";

    emailjs
      .send(serviceID, templateID, formData, userID)
      .then((response) => {
        console.log("Email sent successfully!", response);
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "Your message has been sent successfully.",
        });
        setFormData({ name: "", email: "", message: "" }); // Clear form
      })
      .catch((error) => {
        console.error("Failed to send email:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong. Please try again.",
        });
      });
  };

  return (
    <section
      className={`${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      } py-12`}
    >
      <div className="container mx-auto px-6 lg:px-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold ">Contact Us</h2>
          <p className="text-lg mt-4 ">
            We’d love to hear from you! Reach out to us with your questions,
            suggestions, or to get involved in our initiatives.
          </p>
        </div>
        <div className="lg:flex lg:gap-10">
          {/* Contact Form */}
          <div className="lg:w-1/2">
            <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-md rounded-lg p-6">
              <div>
                <label htmlFor="name" className="block text-gray-600 font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-[#3A5F9C]"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-600 font-medium">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-[#3A5F9C]"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-600 font-medium">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Write your message here"
                  className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-[#3A5F9C]"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#3A5F9C] text-white py-2 rounded-md hover:bg-[#2b4470] transition"
              >
                Send Message
              </button>
            </form>
          </div>
          {/* Contact Information */}
          <div className="lg:w-1/2 mt-10 lg:mt-0">
            <div className="space-y-4">
              <div className="flex items-start">
                <i className="fas fa-phone  text-2xl mr-4"></i>
                <div>
                  <h4 className="text-lg font-semibold">Phone</h4>
                  <p className="">+1 (123) 456-7890</p>
                </div>
              </div>
              <div className="flex items-start">
                <i className="fas fa-envelope  text-2xl mr-4"></i>
                <div>
                  <h4 className="text-lg font-semibold">Email</h4>
                  <p className="">info@helpup.org</p>
                </div>
              </div>
              <div className="flex items-start">
                <i className="fas fa-map-marker-alt  text-2xl mr-4"></i>
                <div>
                  <h4 className="text-lg font-semibold">Address</h4>
                  <p className="">123 Community Road, New York, NY, USA</p>
                </div>
              </div>
              <div className="flex items-start">
                <i className="fas fa-globe  text-2xl mr-4"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;