import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      setVisibleItems(window.innerWidth >= 768 ? 4 : 2);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const getVisibleItems = () => {
    let visibleItemsArray = [];
    for (let i = 0; i < visibleItems; i++) {
      const index = (currentIndex + i) % items.length;
      visibleItemsArray.push(items[index]);
    }
    return visibleItemsArray;
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex">
        <AnimatePresence initial={false}>
          {getVisibleItems().map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              className="w-1/2 md:w-1/4 p-2 flex-shrink-0"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
                <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-sm md:text-lg font-semibold truncate">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Carousel;