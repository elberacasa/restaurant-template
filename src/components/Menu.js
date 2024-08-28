import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHamburger, FaLeaf, FaDollarSign, FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const menuItems = [
  { id: 1, name: 'Hamburguesa Clásica', price: 8.99, category: 'Hamburguesas', isVegan: false, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 2, name: 'Hamburguesa con Queso', price: 9.99, category: 'Hamburguesas', isVegan: false, image: 'https://images.unsplash.com/photo-1551615593-ef5fe247e8f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 3, name: 'Hamburguesa Vegetariana', price: 7.99, category: 'Hamburguesas', isVegan: true, image: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 4, name: 'Papas Fritas', price: 3.99, category: 'Acompañantes', isVegan: true, image: 'https://images.unsplash.com/photo-1573080496219-bf8c9854f1f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 5, name: 'Aros de Cebolla', price: 4.99, category: 'Acompañantes', isVegan: true, image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 6, name: 'Refresco', price: 1.99, category: 'Bebidas', isVegan: true, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 7, name: 'Batido', price: 4.99, category: 'Bebidas', isVegan: false, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 8, name: 'Nuggets de Pollo', price: 6.99, category: 'Acompañantes', isVegan: false, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 9, name: 'Hamburguesa BBQ', price: 10.99, category: 'Hamburguesas', isVegan: false, image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 10, name: 'Ensalada César', price: 7.99, category: 'Ensaladas', isVegan: false, image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
];

function Menu() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [veganOnly, setVeganOnly] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 20]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredItems = menuItems.filter(item => 
    (selectedCategories.length === 0 || selectedCategories.includes(item.category)) &&
    (!veganOnly || item.isVegan) &&
    (item.price >= priceRange[0] && item.price <= priceRange[1])
  );

  const categories = ['Todos', ...new Set(menuItems.map(item => item.category))];

  const handleCategoryChange = (category) => {
    if (category === 'Todos') {
      setSelectedCategories(selectedCategories.length === categories.length - 1 ? [] : categories.slice(1));
    } else {
      setSelectedCategories(prev => 
        prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
      );
    }
  };

  const sidebarVariants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: '-100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
  };

  return (
    <div className="container mx-auto p-4 flex">
      <motion.div
        initial="closed"
        animate={isSidebarOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
        className="fixed left-0 top-0 h-full bg-white shadow-lg z-20 w-64 p-4"
      >
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <FaChevronLeft size={24} />
        </button>
        <h3 className="text-xl font-bold mb-4">Filtros</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Categoría</h4>
            {categories.map(cat => (
              <label key={cat} className="flex items-center mb-2">
                <input 
                  type="checkbox" 
                  checked={cat === 'Todos' ? selectedCategories.length === categories.length - 1 : selectedCategories.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                  className="form-checkbox h-5 w-5 text-blue-600 mr-2"
                />
                {cat}
              </label>
            ))}
          </div>
          <div>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                checked={veganOnly} 
                onChange={(e) => setVeganOnly(e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600 mr-2"
              />
              Solo vegano
            </label>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Rango de precios</h4>
            <input 
              type="range" 
              min="0" 
              max="20" 
              step="0.5"
              value={priceRange[1]} 
              onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value)])}
              className="w-full"
            />
            <div className="flex justify-between">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>
      </motion.div>
      
      <div className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-r-lg z-10">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-gray-500 hover:text-gray-700"
        >
          <FaChevronRight size={24} />
        </button>
      </div>

      <div className="w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Nuestro Menú</h2>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-2">{item.category} {item.isVegan && '(Vegano)'}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-blue-600">${item.price.toFixed(2)}</span>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-300 ease-in-out text-sm"
                  >
                    Añadir al carrito
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Menu;