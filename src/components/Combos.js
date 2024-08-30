import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { ThemeContext } from './ThemeProvider';
import ItemDetails from './ItemDetails';

const comboItems = [
  {
    id: 'combo1',
    name: 'Combo Familiar',
    description: '4 hamburguesas clásicas, 2 porciones grandes de papas fritas, y 4 refrescos',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'combo2',
    name: 'Dúo Perfecto',
    description: '2 hamburguesas con queso, 2 porciones medianas de papas fritas, y 2 refrescos',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1551615593-ef5fe247e8f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'combo3',
    name: 'Combo Vegetariano',
    description: '2 hamburguesas vegetarianas, 1 porción grande de aros de cebolla, y 2 batidos',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  },
];

function Combos({ addToCart, cartItems, updateQuantity, getItemQuantity }) {
  const theme = useContext(ThemeContext);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isItemDetailsVisible, setIsItemDetailsVisible] = useState(false);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsItemDetailsVisible(true);
  };

  const handleCloseItemDetails = () => {
    setIsItemDetailsVisible(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Combos Especiales</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {comboItems.map((combo) => (
          <motion.div 
            key={combo.id}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => handleItemClick(combo)}
          >
            <img src={combo.image} alt={combo.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{combo.name}</h3>
              <p className="text-gray-600 mb-4">{combo.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-600">${combo.price.toFixed(2)}</span>
                <div className="flex items-center">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      updateQuantity(combo.id, Math.max(0, getItemQuantity(combo.id) - 1))
                    }}
                    className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center mr-2 transition duration-300 hover:bg-red-600"
                  >
                    <FaMinus />
                  </button>
                  <span className="mx-2 font-semibold">{getItemQuantity(combo.id)}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      updateQuantity(combo.id, getItemQuantity(combo.id) + 1)
                    }}
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

      <ItemDetails
        item={selectedItem}
        onClose={handleCloseItemDetails}
        addToCart={handleAddToCart}
        updateQuantity={updateQuantity}
        getItemQuantity={getItemQuantity}
        isVisible={isItemDetailsVisible}
      />
    </motion.div>
  );
}

export default Combos;