import React from 'react';
import { FaFilter } from 'react-icons/fa';

function DesktopSidebar({ categories, selectedCategories, handleCategoryChange, priceRange, setPriceRange, categoryIcons }) {
  return (
    <div className="w-1/4 pr-8 sticky top-0 self-start" style={{ maxHeight: 'calc(100vh - 4rem)', overflowY: 'auto' }}>
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
    </div>
  );
}

export default DesktopSidebar;