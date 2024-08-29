import React, { useState } from 'react';
import { FaFilter, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

function DesktopSidebar({ categories, selectedCategories, handleCategoryChange, priceRange, setPriceRange, categoryIcons }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white shadow-md mb-4 rounded-lg overflow-hidden">
      <div className="p-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between text-gray-800 font-semibold"
        >
          <span className="flex items-center">
            <FaFilter className="mr-2" /> Filtros
          </span>
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-4 pb-4"
          >
            <div className="mb-4">
              <h4 className="font-semibold mb-2 text-gray-700">Categoría</h4>
              <div className="flex flex-wrap -mx-1">
                {categories.map(cat => (
                  <label key={cat} className="px-1 mb-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5">
                    <div className={`flex items-center p-2 rounded-md cursor-pointer ${
                      (cat === 'Todos' ? selectedCategories.length === categories.length - 1 : selectedCategories.includes(cat))
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}>
                      <input 
                        type="checkbox" 
                        checked={cat === 'Todos' ? selectedCategories.length === categories.length - 1 : selectedCategories.includes(cat)}
                        onChange={() => handleCategoryChange(cat)}
                        className="form-checkbox h-4 w-4 text-blue-600 mr-2"
                      />
                      <span className="text-sm flex items-center">
                        {categoryIcons[cat] && <span className="mr-1">{categoryIcons[cat]}</span>}
                        {cat}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-gray-700">Rango de precios</h4>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">${priceRange[0]}</span>
                <input 
                  type="range" 
                  min="0" 
                  max="20" 
                  step="0.5"
                  value={priceRange[1]} 
                  onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value)])}
                  className="flex-grow"
                />
                <span className="text-sm text-gray-600">${priceRange[1]}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DesktopSidebar;