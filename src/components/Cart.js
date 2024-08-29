import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

function Cart({ cartItems, removeFromCart, updateQuantity }) {
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto p-4 max-w-3xl"
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-600">Tu Carrito</h2>
      {cartItems.length === 0 ? (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600"
        >
          Tu carrito está vacío. <Link to="/" className="text-blue-500 hover:underline">Empieza a comprar</Link>
        </motion.p>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <motion.li 
                key={item.id} 
                className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)} cada uno</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-200"
                  >
                    <FaMinus className="text-gray-600" />
                  </button>
                  <span className="px-4 font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-200"
                  >
                    <FaPlus className="text-gray-600" />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-200 ml-2"
                  >
                    <FaTrash />
                  </button>
                </div>
              </motion.li>
            ))}
          </ul>
          <motion.div 
            className="mt-8 bg-blue-50 p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-blue-600">Resumen del Pedido</h3>
            <p className="text-lg mb-2">Total de Artículos: {cartItems.reduce((total, item) => total + item.quantity, 0)}</p>
            <p className="text-2xl font-bold text-blue-600">Precio Total: ${totalPrice.toFixed(2)}</p>
          </motion.div>
          <motion.div 
            className="mt-8 flex justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/" className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition duration-200">
              Seguir Comprando
            </Link>
            <Link
              to="/checkout"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Proceder al Pago
            </Link>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}

export default Cart;