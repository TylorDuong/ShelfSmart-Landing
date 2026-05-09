import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Waitlist from "./pages/Waitlist";
import Contact from "./pages/Contact";
import About from "./pages/About";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/waitlist" element={<Waitlist />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
