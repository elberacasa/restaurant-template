import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft } from 'react-icons/fa';

function ItemDetails({ item, onClose, addToCart, isVisible }) {
  const swipeThreshold = 50;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 md:p-0"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="bg-white w-full h-full md:h-auto md:w-2/3 lg:w-1/2 xl:w-1/3 md:rounded-lg shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              if (offset.x > swipeThreshold || velocity.x > 500) {
                onClose();
              }
            }}
          >
            <div className="relative h-full md:h-auto flex flex-col">
              <button
                onClick={onClose}
                className="absolute top-4 left-4 text-white md:text-gray-800 hover:text-gray-600 transition-colors duration-200 z-10"
              >
                <FaChevronLeft size={24} />
              </button>
              <img src={item.image} alt={item.name} className="w-full h-64 object-cover" />
              <div className="p-6 flex-grow overflow-y-auto">
                <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
                <p className="text-gray-600 mb-4">{item.category}</p>
                <p className="text-xl font-semibold mb-4">${item.price.toFixed(2)}</p>
                <p className="text-gray-700 mb-6">
                  {item.description || "Descripción no disponible."}
                </p>
                {/* Here you can add more details, filters, extras, etc. */}
              </div>
              <div className="p-6 bg-gray-100">
                <button
                  onClick={() => addToCart(item)}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-full hover:bg-blue-700 transition-colors duration-200 text-lg font-semibold"
                >
                  Agregar al Carrito
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