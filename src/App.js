import React, { useRef, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useScroll, useSpring } from "framer-motion";
import Header from './components/Header';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Menu from './components/Menu';
import Ubicaciones from './components/Ubicaciones';
import Contacto from './components/Contacto';
import Ofertas from './components/Ofertas';
import Footer from './components/Footer';
import './global.css'; // Add this line

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ container: ref });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Scroll to top when location changes
    window.scrollTo(0, 0);
    // If using a ref for the main content:
    // ref.current.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="App flex flex-col min-h-screen bg-white overflow-x-hidden">
      <Header />
      <Navigation />
      <motion.div
        className="h-1 bg-blue-500 fixed top-0 left-0 right-0 origin-left z-50"
        style={{ scaleX }}
      />
      <main ref={ref} className="flex-grow pb-24 md:pb-0 overflow-y-auto">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {[ 
              { path: "/", component: Menu, key: "menu" },
              { path: "/inicio", component: Home, key: "home" },
              { path: "/ubicaciones", component: Ubicaciones, key: "ubicaciones" },
              { path: "/contacto", component: Contacto, key: "contacto" },
              { path: "/ofertas", component: Ofertas, key: "ofertas" }
            ].map(({ path, component: Component, key }) => (
              <Route 
                key={key}
                path={path} 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <Component />
                  </motion.div>
                } 
              />
            ))}
          </Routes>
        </AnimatePresence>
      </main>
      <Footer className="hidden md:block" />
    </div>
  );
}

export default App;
