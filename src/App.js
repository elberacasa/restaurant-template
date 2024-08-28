import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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

  return (
    <div className="App flex flex-col min-h-screen bg-white overflow-x-hidden">
      <Header />
      <Navigation />
      <main className="flex-grow pb-16 md:pb-0">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {[ 
              { path: "/", component: Home, key: "home" },
              { path: "/menu", component: Menu, key: "menu" },
              { path: "/ubicaciones", component: Ubicaciones, key: "ubicaciones" },
              { path: "/contacto", component: Contacto, key: "contacto" },
              { path: "/ofertas", component: Ofertas, key: "ofertas" }
            ].map(({ path, component: Component, key }) => (
              <Route 
                key={key}
                path={path} 
                element={
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
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
