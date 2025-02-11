import { useState } from "react";
import "./App.css";
import Navbar from "./Navbar"; // Importing Navbar component
import { Gallery } from "./components/Gallery";
import Hero from "./components/Hero";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      {/* Navbar Component */}
      <Navbar />
      <Hero />
      <h1>Welcome to MAXX ENERGY</h1>
      <div className="card">
        <p>
          Welcome to the MAXX ENERGY Portal. Please login to access more
          features.
        </p>
      </div>
      <Gallery />
      <Footer />
    </>
  );
}
export default App;
