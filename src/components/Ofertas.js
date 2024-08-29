import React from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaMinus } from 'react-icons/fa';

function Ofertas({ addToCart, cartItems, updateQuantity }) {
  const offers = [
    {
      id: 'offer1',
      name: 'Combo Familiar',
      description: '4 hamburguesas clásicas, 2 porciones grandes de papas fritas, y 4 refrescos',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'offer2',
      name: 'Dúo Perfecto',
      description: '2 hamburguesas con queso, 2 porciones medianas de papas fritas, y 2 refrescos',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1551615593-ef5fe247e8f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'offer3',
      name: 'Combo Vegetariano',
      description: '2 hamburguesas vegetarianas, 1 porción grande de aros de cebolla, y 2 batidos',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    },
  ];

  const getItemQuantity = (itemId) => {
    const cartItem = cartItems.find(item => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Ofertas Especiales</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <motion.div 
            key={offer.id}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img src={offer.image} alt={offer.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{offer.name}</h3>
              <p className="text-gray-600 mb-4">{offer.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-600">${offer.price.toFixed(2)}</span>
                <div className="flex items-center">
                  <button 
                    onClick={() => updateQuantity(offer.id, Math.max(0, getItemQuantity(offer.id) - 1))}
                    className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center mr-2 transition duration-300 hover:bg-red-600"
                  >
                    <FaMinus />
                  </button>
                  <span className="mx-2 font-semibold">{getItemQuantity(offer.id)}</span>
                  <button 
                    onClick={() => addToCart(offer)}
                    className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center ml-2 transition duration-300 hover:bg-green-600"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Ofertas;