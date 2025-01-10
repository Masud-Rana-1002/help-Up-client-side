import React from 'react';

const ImpactSection = () => {
  const impactData = [
    { number: '500+', label: 'Trees Planted' },
    { number: '1000+', label: 'Meals Donated' },
    { number: '200+', label: 'Volunteers Joined' },
    { number: '50+', label: 'Events Organized' },
  ];

  return (
    <div className="">
      <h2 className="text-center text-3xl font-bold mb-6">Our Impact</h2>
      <p className="text-center text-lg mb-10 max-w-2xl mx-auto">
        Together, we are making a difference! Here's a glimpse of what we've accomplished so far with the help of our amazing volunteers and supporters.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto ">
        {impactData.map((impact, index) => (
          <div
            key={index}
            className="text-center bg-[#3A5F9C] text-white p-6 shadow-lg rounded-lg hover:shadow-xl transition duration-300"
          >
            <p className="text-4xl font-bold ">{impact.number}</p>
            <p className="text-lg font-medium mt-2 ">{impact.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImpactSection;
