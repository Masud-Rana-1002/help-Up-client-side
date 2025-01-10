import React, { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeProviderContext";
import faq from "../../assets/post-bg/faq.json";
import Lottie from "lottie-react";
const FAQSection = () => {
  const [openQuestion, setOpenQuestion] = useState(null);
  const { isDarkMode } = useContext(ThemeContext);
  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const faqs = [
    {
      question: "What is HelpUp all about?",
      answer:
        "HelpUp is a platform designed to connect volunteers with meaningful opportunities to make a positive impact in their communities.",
    },
    {
      question: "How can I get involved as a volunteer?",
      answer:
        "You can browse the available volunteer opportunities on our website and sign up for the ones that interest you. Simply click on 'View Details' to learn more and join.",
    },
    {
      question: "Is there a cost to participate?",
      answer:
        "No, volunteering through HelpUp is free. However, some events may require you to bring specific materials, which will be mentioned in the event details.",
    },
    {
      question: "Can organizations partner with HelpUp?",
      answer:
        "Yes! Organizations can collaborate with us by creating profiles and posting volunteer opportunities. Contact us for partnership details.",
    },
    {
      question: "How do I contact HelpUp for support?",
      answer:
        "You can reach us through the Contact Us section on our website or email us at support@helpup.org.",
    },
  ];

  return (
    <section
      className={`${
        isDarkMode ? "bg-gray-900" : "bg-white text-black"
      }  py-12`}
    >
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="text-3xl font-bold text-center  mb-8">
          Frequently Asked Questions
        </h2>
        <div className="lg:flex lg:gap-10 items-center justify-between">
          <div className="lg:w-5/12   hidden lg:block">
            <Lottie classID="w-full  " animationData={faq} loop={true} />
          </div>
          <div className="space-y-4 flex-1">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-md p-4 border border-gray-200"
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleQuestion(index)}
                >
                  <h3 className="text-lg font-medium">{faq.question}</h3>
                  <span className="text-[#3A5F9C] font-bold text-xl">
                    {openQuestion === index ? "-" : "+"}
                  </span>
                </div>
                {openQuestion === index && (
                  <p className="mt-4 text-gray-600">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
