import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <Link to="/" className="mb-4 sm:mb-0">
          <motion.h1 
            className="text-2xl sm:text-3xl font-extrabold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block transform hover:scale-110 transition-transform duration-200">
              <span className="text-yellow-300">B</span>urger
            </span>{' '}
            <span className="inline-block transform hover:scale-110 transition-transform duration-200">
              <span className="text-yellow-300">P</span>aradise
            </span>
          </motion.h1>
        </Link>
        <motion.img 
          src="https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-1.2.1&auto=format&fit=crop&w=80&h=80&q=80" 
          alt="Logo de Burger" 
          className="rounded-full w-16 h-16 object-cover border-2 border-yellow-300"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </header>
  );
}

export default Header;