import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUtensils, FaEnvelope, FaShoppingCart } from 'react-icons/fa';

function Navigation({ cartItemCount }) {
  const location = useLocation();

  const navItems = [
    { name: 'Contacto', path: '/contacto', icon: FaEnvelope, ariaLabel: 'Ir a la página de contacto' },
    { name: 'Menú', path: '/', icon: FaUtensils, ariaLabel: 'Ir al menú principal' },
    { name: 'Carrito', path: '/cart', icon: FaShoppingCart, ariaLabel: 'Ver el carrito de compras' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-blue-500 shadow-lg z-50" role="navigation" aria-label="Navegación principal">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`text-white flex flex-col items-center justify-center w-full h-full ${location.pathname === item.path ? 'bg-blue-600' : ''}`}
            aria-label={item.ariaLabel}
            aria-current={location.pathname === item.path ? 'page' : undefined}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <item.icon className={`text-2xl mb-1 ${item.name === 'Menú' ? 'text-3xl text-yellow-300' : ''}`} aria-hidden="true" />
              <span className={`text-xs text-center ${item.name === 'Menú' ? 'font-bold' : ''}`}>{item.name}</span>
              {item.name === 'Carrito' && cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs" aria-label={`${cartItemCount} items en el carrito`}>
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