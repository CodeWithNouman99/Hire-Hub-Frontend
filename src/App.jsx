import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FindJob from "./pages/FindJob";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import PostJob from "./pages/PostJob";
import "./App.css"
const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/find-jobs" element={<FindJob />} /> */}
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
};

export default App;