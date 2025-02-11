import "./Features.css";
import Navbar from "./Navbar"; // Importing Navbar component
import { Footer } from "./components/Footer";
import App from './App.jsx';
function App() {
  return (
    <>
      {/* Navbar Component */}
      <Navbar />
      <Footer />
    </>
  );
}
export default App;