import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FaUtensils, FaEnvelope, FaShoppingCart, FaMapMarkerAlt } from 'react-icons/fa';
import { restaurantConfig } from '../config';

function Header({ cartItemCount }) {
  const { name, colors } = restaurantConfig;
  const location = useLocation();
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const locations = [
    { name: 'El Rosal', address: 'Av. Francisco de Miranda, Centro Comercial Lido, Nivel PB, Local 15' },
    { name: 'Altamira', address: 'Av. Luis Roche, Centro Comercial San Ignacio, Nivel C1, Local 45' },
  ];

  const navItems = [
    { name: 'Contacto', path: '/contacto', icon: FaEnvelope },
    { name: 'Menú', path: '/', icon: FaUtensils },
    { name: 'Carrito', path: '/cart', icon: FaShoppingCart },
  ];

  const cartIconVariants = {
    initial: { scale: 1 },
    animate: { scale: [1, 1.2, 1], transition: { duration: 0.3 } }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLocationDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header style={{ backgroundColor: colors.primary }} className="text-white p-4 shadow-md relative">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="/logo.jpg" alt="Logo" className="h-10 w-auto mr-4" />
          <Link to="/" className="mb-0">
            <motion.h1 
              className="text-xl sm:text-2xl md:text-3xl font-extrabold"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block transform hover:scale-110 transition-transform duration-200">
                <span style={{ color: colors.secondary }}>{name.charAt(0)}</span>
                {name.slice(1, name.indexOf(' '))}
              </span>{' '}
              <span className="inline-block transform hover:scale-110 transition-transform duration-200">
                <span style={{ color: colors.secondary }}>{name.split(' ')[1].charAt(0)}</span>
                {name.split(' ')[1].slice(1)}
              </span>
            </motion.h1>
          </Link>
        </div>
        <div className="flex items-center">
          <div className="relative mr-4" ref={dropdownRef}>
            <button
              onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
              className="text-white hover:text-blue-200 p-2 rounded-full transition duration-300 ease-in-out"
              aria-label="Ubicaciones"
            >
              <FaMapMarkerAlt className="text-lg" />
            </button>
            <AnimatePresence>
              {isLocationDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                  style={{ maxHeight: '80vh', overflowY: 'auto' }}
                >
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {locations.map((loc, index) => (
                      <div key={index} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                        <p className="font-bold">{loc.name}</p>
                        <p className="text-xs">{loc.address}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.path}
                  className={`text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out flex items-center ${
                    location.pathname === item.path ? 'bg-blue-700' : ''
                  }`}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                >
                  {item.name === 'Carrito' ? (
                    <motion.div
                      variants={cartIconVariants}
                      initial="initial"
                      animate={cartItemCount > 0 ? "animate" : "initial"}
                    >
                      <item.icon className="mr-2 text-lg" aria-hidden="true" />
                    </motion.div>
                  ) : (
                    <item.icon className="mr-2 text-lg" aria-hidden="true" />
                  )}
                  <span>{item.name}</span>
                  {item.name === 'Carrito' && cartItemCount > 0 && (
                    <span className="ml-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs" aria-label={`${cartItemCount} items in cart`}>
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;