import './App.css';
import { Routes, Route } from "react-router-dom"; // ✅ Routes & Route
import Home from './Components/Pages/Home';
import Property from './Components/Property/Property';
import LeaseWrapper from './Components/Property/LeaseWrapper';
function App() {
  return (
   <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property" element={<Property />} />
        <Route path="/property/:type" element={<LeaseWrapper />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
    </Routes>
  );
}

export default App;
