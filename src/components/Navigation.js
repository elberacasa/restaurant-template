import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUtensils, FaMapMarkerAlt, FaEnvelope, FaGift, FaShoppingCart } from 'react-icons/fa';

function Navigation({ cartItemCount }) {
  const location = useLocation();

  const navItems = [
    { name: 'Contacto', path: '/contacto', icon: FaEnvelope },
    { name: 'Ubicaciones', path: '/ubicaciones', icon: FaMapMarkerAlt },
    { name: 'Menú', path: '/', icon: FaUtensils },
    { name: 'Ofertas', path: '/ofertas', icon: FaGift },
    { name: 'Carrito', path: '/cart', icon: FaShoppingCart },
  ];

  return (
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
              {item.name === 'Carrito' && cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {cartItemCount}
                </span>
              )}
            </motion.div>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navigation;