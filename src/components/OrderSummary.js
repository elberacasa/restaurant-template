import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

function OrderSummary() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto p-4 max-w-3xl"
    >
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4 text-blue-600">¡Pedido Confirmado!</h2>
        <p className="text-xl mb-6">Gracias por tu compra. Tu pedido está en camino.</p>
        <p className="text-lg mb-8">Recibirás un correo electrónico con los detalles de tu pedido.</p>
        <Link
          to="/"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Volver al Menú
        </Link>
      </div>
    </motion.div>
  );
}

export default OrderSummary;