import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FaUtensils, FaMapMarkerAlt, FaEnvelope, FaGift, FaShoppingCart } from 'react-icons/fa';
import { restaurantConfig } from '../config';

function Header({ cartItemCount }) {
  const { name, colors } = restaurantConfig;
  const location = useLocation();

  const navItems = [
    { name: 'Contacto', path: '/contacto', icon: FaEnvelope },
    { name: 'Ubicaciones', path: '/ubicaciones', icon: FaMapMarkerAlt },
    { name: 'Menú', path: '/', icon: FaUtensils },
    { name: 'Ofertas', path: '/ofertas', icon: FaGift },
    { name: 'Carrito', path: '/cart', icon: FaShoppingCart },
  ];

  return (
    <header style={{ backgroundColor: colors.primary }} className="text-white p-4 shadow-md">
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
              >
                <item.icon className="mr-2 text-lg" />
                {item.name}
                {item.name === 'Carrito' && cartItemCount > 0 && (
                  <span className="ml-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </motion.div>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;