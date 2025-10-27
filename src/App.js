import './App.css';
import './index.css';
import { Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import Navbar from './Components/Home/Navbar';
import Home from './Home';
import Property from './Components/Property/Property1';
import LeaseWrapper from './Components/Property/LeaseWrapper';

function App() {
  return (
    <Fragment>
      <Navbar />
      <main className="container mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/property" element={<Property />} />
          <Route path="/property/:type" element={<LeaseWrapper />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </main>
    </Fragment>
  );
}

export default App;
