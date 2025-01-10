import React from "react";

const VolunteerTestimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      location: "New York, USA",
      image: "https://i.ibb.co/dL7f2wq/front-view-smiley-business-man-2.jpg",
      testimonial:
        "Being a volunteer at HelpUp has been an amazing experience. I've met so many incredible people and contributed to important causes.",
    },
    {
      name: "Jane Smith",
      location: "Los Angeles, USA",
      image: "https://i.ibb.co/s6g3hT5/handsome-fashion-man-posing.jpg",
      testimonial:
        "The volunteer opportunities at HelpUp have truly made a difference in my life. It's fulfilling to help those in need.",
    },
    {
      name: "Alice Johnson",
      location: "Chicago, USA",
      image: "https://i.ibb.co/hF3SdH8/woman-grey-clothes-smiling.jpg",
      testimonial:
        "I volunteered for a food donation campaign with HelpUp, and it was such a rewarding experience. The team was amazing, and I felt like I was making a real impact.",
    },
  ];

  return (
    <div className="my-10">
      <h2 className="text-center text-3xl font-bold animate__animated animate__backInLeft">
        Volunteer Testimonials
      </h2>
      <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className=" p-6 bg-[#3A5F9C] hover:shadow-xl transition duration-300 rounded-lg shadow-md border border-gray-100 flex flex-col items-center text-center text-white"
          >
            {/* text-center  text-white p-6 shadow-lg rounded-lg  */}
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-24 h-24 rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold">{testimonial.name}</h3>
            <p className="text-sm text-gray-300">{testimonial.location}</p>
            <p className="mt-4 ">{testimonial.testimonial}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VolunteerTestimonials;
