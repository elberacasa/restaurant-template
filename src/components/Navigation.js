import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaUtensils, FaMapMarkerAlt, FaEnvelope, FaGift } from 'react-icons/fa';

function Navigation() {
  const location = useLocation();

  const navItems = [
    { name: 'Inicio', path: '/inicio', icon: FaHome },
    { name: 'Ubicaciones', path: '/ubicaciones', icon: FaMapMarkerAlt },
    { name: 'Menú', path: '/', icon: FaUtensils },
    { name: 'Ofertas', path: '/ofertas', icon: FaGift },
    { name: 'Contacto', path: '/contacto', icon: FaEnvelope },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="bg-blue-500 shadow-md sticky top-0 z-10 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-16">
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
                      className={`text-white hover:bg-blue-600 px-4 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out flex items-center ${location.pathname === item.path ? 'bg-blue-600' : ''}`}
                    >
                      <item.icon className="mr-2 text-lg" />
                      {item.name}
                    </Link>
                  </motion.div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-blue-500 shadow-lg z-50">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-white flex flex-col items-center justify-center w-full h-full ${location.pathname === item.path ? 'bg-blue-600' : ''}`}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <item.icon className={`text-2xl mb-1 ${item.name === 'Menú' ? 'text-3xl text-yellow-300' : ''}`} />
                <span className={`text-xs text-center ${item.name === 'Menú' ? 'font-bold' : ''}`}>{item.name}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}

export default Navigation;