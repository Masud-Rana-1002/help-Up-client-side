import "animate.css";
import { Link } from "react-router-dom";

const UpcomingEvents = () => {
  const cardData = [
    {
      date: "08",
      monthYear: "JUNE, 2025",
      title: "Community Clean-Up Drive",
      location: "Central Park, New York, USA",
      description:
        "Join us to help clean up and preserve the beauty of Central Park. All tools and refreshments will be provided.",
    },
    {
      date: "17",
      monthYear: "FEBRUARY, 2025",
      title: "Food Donation Campaign",
      location: "Downtown Shelter, Los Angeles, USA",
      description:
        "Help us distribute food packages to those in need. Your contribution can bring a smile to someone's face.",
    },
    {
      date: "03",
      monthYear: "MARCH, 2025",
      title: "Tree Plantation Program",
      location: "Greenfield Park, Chicago, USA",
      description:
        "Be a part of our mission to plant 1,000 trees. Together, we can make the earth greener!",
    },
    {
      date: "18",
      monthYear: "MARCH, 2025",
      title: "Health Awareness Drive",
      location: "Community Hall, Houston, USA",
      description:
        "Help us raise awareness about health and wellness through free check-ups and consultations.",
    },
  ];

  return (
    <div>
      <h2 className="text-center text-3xl font-bold animate__animated animate__backInLeft">
        Upcoming Events
      </h2>
      <div className="my-10 animate__animated animate__backInRight grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="bg-[#3A5F9C] text-white space-y-3 h-72 p-4 flex justify-center items-center flex-col bordered shadow-lg border border-gray-100 rounded-lg hover:shadow-2xl transition-transform duration-300 transform hover:scale-105"
          >
            <div className="text-center">
              <p className="text-5xl font-bold">{card.date}</p>
              <p className="text-lg">{card.monthYear}</p>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold">{card.title}</h3>
              <p className="font-medium">{card.location}</p>
              <p>{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
