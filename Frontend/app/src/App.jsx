import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import Features from "./components/Features";
import Report from "./components/Report";
import Contact from "./ContactUs";
import User from "./UserProfile";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Password from "./ChangePassword";
<<<<<<< HEAD
import AccountRecovery from "./AccountRecovery";

=======
import Notification from "./Notifications"
import Data from "./Data"
import Recovery from "./Recovery"
>>>>>>> e7603267b9a7c9adf387d924b9a5f624d4f42d20
function App() {
  return (
    <Router>
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
            <Footer />
          </>
        } />

        {/* Features page */}
        <Route path="/features" element={<Features />} />
        {/* Change Password page */}
        <Route path="/change-password" element={<Password />} />
        {/* Notification page */}
        <Route path="/notification" element={<Notification />} />
        {/* Recovery Page */}
        <Route path="/update-recovery-email" element={<Recovery />} />
        {/* Contact page */}
        <Route path="/contact" element={<Contact />} />
        {/* User page */}
        <Route path="/user" element={<User />} /> 
        {/* Report page */}
        <Route path="/report" element={<Report />} />
<<<<<<< HEAD
        {/* Account Recovery */}
        <Route path="/update-recovery-email" element={<AccountRecovery />} />
=======
        {/*Data Page */}
        <Route path="/data" element={<Data />} />
>>>>>>> e7603267b9a7c9adf387d924b9a5f624d4f42d20
        {/* FAQ page */}
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </Router>
  );
}

export default App;