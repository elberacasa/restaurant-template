import React from 'react';
import { FaFilter, FaChevronLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';

function MobileSidebar({ categories, selectedCategories, handleCategoryChange, priceRange, setPriceRange, categoryIcons, isSidebarOpen, setIsSidebarOpen }) {
  return (
    <motion.div
      className={`fixed left-0 top-0 h-screen bg-white shadow-lg z-20 w-64 p-6 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out overflow-y-auto`}
      initial={false}
      animate={{ x: isSidebarOpen ? 0 : '-100%' }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={() => setIsSidebarOpen(false)}
        className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
      >
        <FaChevronLeft size={24} />
      </button>
      <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        <FaFilter className="mr-2" /> Filtros
      </h3>
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold mb-3 text-lg text-gray-700">Categoría</h4>
          {categories.map(cat => (
            <label key={cat} className="flex items-center mb-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={cat === 'Todos' ? selectedCategories.length === categories.length - 1 : selectedCategories.includes(cat)}
                onChange={() => handleCategoryChange(cat)}
                className="form-checkbox h-5 w-5 text-blue-600 mr-3"
              />
              <span className="text-gray-700 hover:text-blue-600 transition-colors duration-200 flex items-center">
                {categoryIcons[cat] && <span className="mr-2">{categoryIcons[cat]}</span>}
                {cat}
              </span>
            </label>
          ))}
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-lg text-gray-700">Rango de precios</h4>
          <input 
            type="range" 
            min="0" 
            max="20" 
            step="0.5"
            value={priceRange[1]} 
            onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value)])}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>
      <button
        onClick={() => setIsSidebarOpen(false)}
        className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300 w-full flex items-center justify-center"
      >
        <FaFilter className="mr-2" /> Aplicar Filtros
      </button>
    </motion.div>
  );
}

export default MobileSidebar;