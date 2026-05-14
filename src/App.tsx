import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Waitlist from "./pages/Waitlist";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Audit from "./pages/Audit";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/waitlist" element={<Waitlist />} />
        <Route path="/audit" element={<Audit />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
