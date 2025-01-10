import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      icon: "📝",
      title: "Sign Up",
      description:
        "Register as a volunteer by filling out a simple form and creating your profile.",
    },
    {
      icon: "📅",
      title: "Join Events",
      description:
        "Browse through upcoming events and choose where you want to contribute.",
    },
    {
      icon: "🤝",
      title: "Make an Impact",
      description:
        "Participate in the events and see the difference you can make in your community.",
    },
    {
      icon: "🌟",
      title: "Track Your Impact",
      description:
        "Get updates on your contributions and the overall impact of your efforts.",
    },
  ];

  return (
    <div >
      <h2 className="text-center text-3xl font-bold mb-6">How It Works</h2>
      <p className="text-center text-lg mb-10 max-w-2xl mx-auto">
        Joining our community is easy! Follow these simple steps to start making
        a difference today.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-auto gap-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="text-center bg-[#3A5F9C] text-white p-6 shadow-lg rounded-lg hover:shadow-xl transition duration-300"
          >
            <div className="text-5xl mb-4">{step.icon}</div>
            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
            <p className="text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
