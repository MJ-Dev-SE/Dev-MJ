import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Certifications from "./pages/Certifications";
import AuroraField from "./components/AuroraField";
import { pageTransition } from "./components/motion";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <Router>
      <AuroraField />
      <div className="relative z-0 min-h-screen flex flex-col text-white">
        <div className="flex flex-1">
          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

          <div className="flex-1 flex flex-col">
            <Navbar toggleSidebar={toggleSidebar} />

            <main className="flex-1 p-6">
              <AnimatedRoutes />
            </main>
          </div>
        </div>

        <Footer />

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={toggleSidebar}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
