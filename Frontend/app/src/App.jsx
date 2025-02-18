import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // ✅ Import Router
import Navbar from "./Navbar"; 
import Gallery from "./components/Gallery";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import FAQ from "./components/FAQ";

function App() {
  return (
    <Router> {/* ✅ Wrap in Router */}
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <h1>MAXX ENERGY</h1>
            <div className="card">
              <p>
                Welcome to Maxx Potential – your all-in-one data portal for unlocking the power of insights. Our platform provides seamless access to key performance metrics, customizable reports, and advanced analytics tools, helping you make data-driven decisions with ease. Whether you're comparing historical trends, generating reports, or exploring vast datasets, Maxx Potential offers a secure and user-friendly experience. With robust features like data search, export options, and user management, Maxx Potential is the ultimate tool for organizations aiming to maximize their data’s potential. Start optimizing your strategies today with Maxx Potential!
              </p>
            </div>
            <Gallery />
          </>
        } />
        <Route path="/faq" element={<FAQ />} /> {/* ✅ Separate FAQ page */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
