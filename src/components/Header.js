import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { restaurantConfig } from '../config';

function Header({ cartItemCount }) {
  const { name, colors } = restaurantConfig;

  return (
    <header style={{ backgroundColor: colors.primary }} className="text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
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
        <Link to="/cart" className="relative">
          <FaShoppingCart size={24} />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cartItemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}

export default Header;