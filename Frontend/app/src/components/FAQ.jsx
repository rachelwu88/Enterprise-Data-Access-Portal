import React, { useState } from "react";
import Navbar from "../Navbar"; // Import Navbar
import Footer from "./Footer"; // Import Footer
import "./FAQ.css";

const faqData = [
  {
    question: "How do I sign up for Maxx Energy portal?",
    answer:
      "To sign up, click the 'Sign Up' button on the homepage and follow the instructions to create your account.",
  },
  {
    question: "What services does Maxx Energy provide?",
    answer:
      "Maxx Energy provides energy solutions, including solar power, wind energy, and sustainable home energy systems.",
  },
  {
    question: "How do I track my energy usage?",
    answer:
      "You can track your energy usage by logging into your account and navigating to the 'Usage' section, where you'll find detailed reports.",
  },
  {
    question: "Can I pay my energy bill online?",
    answer:
      "Yes, you can pay your energy bill online through the 'Billing' section in your Maxx Energy account. We accept various payment methods.",
  },
  {
    question: "What is the Maxx Energy rewards program?",
    answer:
      "The Maxx Energy rewards program allows you to earn points for every dollar spent on energy services. These points can be redeemed for discounts or special offers.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can reach our customer support team by visiting the 'Contact Us' section of the website, where you'll find our phone number, email, and live chat options.",
  },
  {
    question: "How do I update my account details?",
    answer:
      "To update your account details, log in to your account, go to the 'Account Settings' page, and update your information as needed.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Navbar /> {/* Add Navbar here */}
      {/* Background Image Section */}
      <div className="outer-container">
        <img src="/images/faq.jpg" alt="FAQ Section" className="faq-image" />
        <h1 className="faq-title">Frequently Asked Questions</h1> {/* ✅ This is now absolute */}
      </div>

      {/* FAQ Section */}
      <div className="faq-container">
        {faqData.map((item, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <span>{item.question}</span>
              <button className="toggle-btn">{openIndex === index ? "−" : "+"}</button>
            </div>
            {openIndex === index && <p className="faq-answer">{item.answer}</p>}
          </div>
        ))}
      </div>

      <Footer /> {/* Add Footer here */}
    </>
  );
}

export default FAQ;
