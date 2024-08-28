import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-yellow-300">B</span>urger{' '}
              <span className="text-yellow-300">P</span>aradise
            </h3>
            <p className="text-blue-200">Deliciosas hamburguesas, gran ambiente</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center"
          >
            <h4 className="text-xl font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              {['Inicio', 'Menú', 'Ubicaciones', 'Contacto', 'Ofertas'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Inicio' ? '/' : `/${item.toLowerCase()}`} 
                    className="hover:text-yellow-300 transition duration-300 ease-in-out"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center md:text-right"
          >
            <h4 className="text-xl font-semibold mb-4">Contáctanos</h4>
            <p className="mb-2">Teléfono: +58 212-952-4111</p>
            <p className="mb-4">Email: info@burgerparadise.com</p>
            <p>&copy; 2023 Burger Paradise. Todos los derechos reservados.</p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;