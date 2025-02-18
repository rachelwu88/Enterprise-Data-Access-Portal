import React, { useState } from "react"; 
import "./FAQ.css";

const faqData = [
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed?",
    answer:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed?",
    answer:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed?",
    answer: "Excepteur sint occaecat cupidatat non proident.",
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed?",
    answer: "Excepteur sint occaecat cupidatat non proident.",
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed?",
    answer: "Excepteur sint occaecat cupidatat non proident.",
  },
  
  
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
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
    </>
  );
}

export default FAQ;
