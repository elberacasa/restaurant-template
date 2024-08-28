import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaUtensils, FaMapMarkerAlt, FaEnvelope, FaGift } from 'react-icons/fa';

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Inicio', path: '/', icon: FaHome },
    { name: 'Menú', path: '/menu', icon: FaUtensils },
    { name: 'Ubicaciones', path: '/ubicaciones', icon: FaMapMarkerAlt },
    { name: 'Contacto', path: '/contacto', icon: FaEnvelope },
    { name: 'Ofertas', path: '/ofertas', icon: FaGift },
  ];

  return (
    <nav className="bg-blue-500 shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-20">
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-1">
              {navItems.map((item, index) => (
                <React.Fragment key={item.name}>
                  {index > 0 && <div className="h-8 w-px bg-blue-400 mx-2"></div>}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={item.path}
                      className="text-white hover:bg-blue-600 px-4 py-3 rounded-md text-sm font-medium transition duration-300 ease-in-out flex items-center"
                    >
                      <item.icon className="mr-2 text-lg" />
                      {item.name}
                    </Link>
                  </motion.div>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition duration-300 ease-in-out"
            >
              <span className="sr-only">Abrir menú principal</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      <motion.div 
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, height: "auto" },
          closed: { opacity: 0, height: 0 }
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-blue-500"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={item.path}
                className="text-white hover:bg-blue-600 block px-3 py-4 rounded-md text-base font-medium transition duration-300 ease-in-out text-center flex items-center justify-center"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="mr-2 text-lg" />
                {item.name}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </nav>
  );
}

export default Navigation;