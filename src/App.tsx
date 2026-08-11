import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import Home from "./pages/Home";
import { pageTransition, pageEntrance } from "./components/motion";

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
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      {/* Static background: a soft top-to-bottom wash, nothing animated. */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-beige-100 via-beige-50 to-beige-50" />

      {/* The page is always mounted; the splash simply sits on top of it and
          fades away. Swapping the two through `AnimatePresence mode="wait"`
          made the app wait on the splash's exit animation — which never
          finishes in a background tab, where rAF is paused. */}
      <motion.div
        variants={pageEntrance}
        initial="hidden"
        animate={loading ? "hidden" : "show"}
        className="relative z-0 flex min-h-screen flex-col overflow-x-clip text-stone-800"
      >
        <Navbar />
        <main className="flex-1">
          <AnimatedRoutes />
        </main>
        <Footer />
      </motion.div>

      <AnimatePresence>
        {loading && (
          <LoadingScreen key="loading" onFinish={() => setLoading(false)} />
        )}
      </AnimatePresence>
    </Router>
  );
}

export default App;
