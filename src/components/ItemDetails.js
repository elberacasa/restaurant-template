import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaPlus, FaMinus } from 'react-icons/fa';

function ItemDetails({ item, onClose, addToCart, updateQuantity, getItemQuantity, isVisible }) {
  const swipeThreshold = 50;
  const [isCombo, setIsCombo] = useState(false);
  const [extras, setExtras] = useState({
    cheese: false,
    onion: false,
    ketchup: false,
    mayo: false,
    mustard: false,
    lettuce: false,
    tomato: false,
    pickle: false,
  });

  useEffect(() => {
    // Reset filters when a new item is selected
    setIsCombo(false);
    setExtras({
      cheese: false,
      onion: false,
      ketchup: false,
      mayo: false,
      mustard: false,
      lettuce: false,
      tomato: false,
      pickle: false,
    });
  }, [item]);

  const handleExtraToggle = (extra) => {
    setExtras(prev => ({ ...prev, [extra]: !prev[extra] }));
  };

  const getItemPrice = () => {
    let price = item.price;
    if (isCombo) price += 3.99; // Assuming combo adds $3.99
    Object.entries(extras).forEach(([extra, isAdded]) => {
      if (isAdded) price += 0.50; // Assuming each extra costs $0.50
    });
    return price.toFixed(2);
  };

  const handleAddToCart = () => {
    const itemWithOptions = {
      ...item,
      isCombo,
      extras,
      price: parseFloat(getItemPrice()),
    };
    addToCart(itemWithOptions);
    // Reset filters after adding to cart
    setIsCombo(false);
    setExtras({
      cheese: false,
      onion: false,
      ketchup: false,
      mayo: false,
      mustard: false,
      lettuce: false,
      tomato: false,
      pickle: false,
    });
  };

  return (
    <AnimatePresence>
      {isVisible && item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="bg-white w-full max-w-md md:max-w-lg lg:max-w-xl rounded-lg shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex flex-col h-full max-h-[90vh]">
              <button
                onClick={onClose}
                className="absolute top-4 left-4 text-white hover:text-gray-200 transition-colors duration-200 z-10"
              >
                <FaChevronLeft size={24} />
              </button>
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
              <div className="p-6 flex-grow overflow-y-auto">
                <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
                <p className="text-gray-600 mb-4">{item.category}</p>
                <p className="text-xl font-semibold mb-4">${getItemPrice()}</p>
                <p className="text-gray-700 mb-6">
                  {item.description || "Deliciosa hamburguesa con carne de res, lechuga, tomate y nuestra salsa especial."}
                </p>
                
                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isCombo}
                      onChange={() => setIsCombo(!isCombo)}
                      className="mr-2"
                    />
                    Hacer combo (papas fritas y refresco) +$3.99
                  </label>
                </div>

                <h3 className="font-semibold mb-2">Extras (+$0.50 cada uno):</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(extras).map(([extra, isAdded]) => (
                    <label key={extra} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={isAdded}
                        onChange={() => handleExtraToggle(extra)}
                        className="mr-2"
                      />
                      {extra.charAt(0).toUpperCase() + extra.slice(1)}
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Add/remove buttons */}
              <div className="p-4 bg-gray-100 flex items-center justify-between">
                <div className="flex items-center">
                  <button 
                    onClick={() => updateQuantity(item.id, Math.max(0, getItemQuantity(item.id) - 1))}
                    className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center transition duration-300 hover:bg-red-600"
                  >
                    <FaMinus />
                  </button>
                  <span className="mx-3 font-semibold text-xl">{getItemQuantity(item.id)}</span>
                  <button 
                    onClick={handleAddToCart}
                    className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center transition duration-300 hover:bg-green-600"
                  >
                    <FaPlus />
                  </button>
                </div>
                <button 
                  onClick={handleAddToCart}
                  className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ItemDetails;