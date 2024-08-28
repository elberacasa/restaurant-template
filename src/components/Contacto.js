import React from 'react';
import { motion } from 'framer-motion';

function Contacto() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Contáctanos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Información de Contacto</h3>
          <p className="text-gray-600 mb-2">Teléfono: +58 212-952-4111</p>
          <p className="text-gray-600 mb-2">Email: info@burgerparadise.com</p>
          <p className="text-gray-600">Dirección: Av. Francisco de Miranda, Centro Comercial Lido, Nivel PB, Local 15, El Rosal, Caracas 1060, Distrito Capital</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Formulario de Contacto</h3>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Nombre</label>
              <input type="text" id="name" className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
              <input type="email" id="email" className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Mensaje</label>
              <textarea id="message" rows="4" className="w-full px-3 py-2 border rounded-lg"></textarea>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">Enviar</button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default Contacto;