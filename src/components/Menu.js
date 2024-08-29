import React, { useState, useEffect } from 'react';
import { FaFilter, FaChevronLeft, FaGem, FaPlus, FaMinus, FaThLarge, FaList, FaHamburger, FaGlassMartini, FaCarrot, FaIceCream, FaUtensils } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Carousel from './Carousel';
import DesktopSidebar from './DesktopSidebar';

const menuItems = [
  { id: 1, name: 'Hamburguesa Clásica', price: 8.99, category: 'Hamburguesas', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 2, name: 'Hamburguesa con Queso', price: 9.99, category: 'Hamburguesas', image: 'https://images.unsplash.com/photo-1551615593-ef5fe247e8f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 3, name: 'Hamburguesa Vegetariana', price: 7.99, category: 'Hamburguesas', image: 'https://images.unsplash.com/photo-1525059696-4967a8e1dca2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 4, name: 'Papas Fritas', price: 3.99, category: 'Acompañantes', image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 5, name: 'Aros de Cebolla', price: 4.99, category: 'Acompañantes', image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 6, name: 'Refresco', price: 1.99, category: 'Bebidas', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 7, name: 'Batido', price: 4.99, category: 'Bebidas', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 8, name: 'Nuggets de Pollo', price: 6.99, category: 'Acompañantes', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 9, name: 'Hamburguesa BBQ', price: 10.99, category: 'Hamburguesas', image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 10, name: 'Ensalada César', price: 7.88, category: 'Ensaladas', image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  // New items
  { id: 11, name: 'Hamburguesa Doble', price: 12.99, category: 'Hamburguesas', image: 'https://images.unsplash.com/photo-1586816001966-79b736744398?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 12, name: 'Wrap de Pollo', price: 8.99, category: 'Wraps', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 13, name: 'Ensalada Griega', price: 8.99, category: 'Ensaladas', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 14, name: 'Hamburguesa de Pescado', price: 9.99, category: 'Hamburguesas', image: 'https://images.unsplash.com/photo-1530469912745-a215c6b256ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 15, name: 'Palitos de Mozzarella', price: 5.99, category: 'Acompañantes', image: 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 16, name: 'Limonada Casera', price: 2.99, category: 'Bebidas', image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 17, name: 'Helado de Vainilla', price: 3.99, category: 'Postres', image: 'https://images.unsplash.com/photo-1570197571499-166b36435e9f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 18, name: 'Brownie con Helado', price: 5.99, category: 'Postres', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 19, name: 'Nachos con Queso', price: 6.99, category: 'Acompañantes', image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 20, name: 'Café Americano', price: 2.49, category: 'Bebidas', image: 'https://images.unsplash.com/photo-1521302080334-4bebac2763a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
];

function Menu({ addToCart, cartItems, updateQuantity }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 20]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const [viewMode, setViewMode] = useState(isDesktop ? 'grid' : 'list');

  const filteredItems = menuItems.filter(item => 
    (selectedCategories.length === 0 || selectedCategories.includes(item.category)) &&
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

  useEffect(() => {
    const handleResize = () => {
      const newIsDesktop = window.innerWidth > 768;
      setIsDesktop(newIsDesktop);
      setViewMode(newIsDesktop ? 'grid' : 'list');
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const featuredItems = menuItems.slice(0, 8); // Select first 8 items for the carousel

  const getItemQuantity = (itemId) => {
    const cartItem = cartItems.find(item => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const categoryIcons = {
    'Todos': <FaUtensils />,
    'Hamburguesas': <FaHamburger />,
    'Acompañantes': <FaCarrot />,
    'Bebidas': <FaGlassMartini />,
    'Ensaladas': <FaCarrot />,
    'Wraps': <FaUtensils />,
    'Postres': <FaIceCream />,
  };

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row relative font-sans bg-gray-100">
      {isDesktop ? (
        <DesktopSidebar
          categories={categories}
          selectedCategories={selectedCategories}
          handleCategoryChange={handleCategoryChange}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          categoryIcons={categoryIcons}
        />
      ) : (
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
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 md:hidden"
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
      )}
      
      {/* Mobile filter button */}
      {!isDesktop && (
        <div className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-r-lg z-10">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-3 text-gray-500 hover:text-gray-700"
          >
            <FaFilter size={24} />
          </button>
        </div>
      )}

      {/* Main content */}
      <div className={`w-full ${isDesktop ? 'md:w-3/4' : ''}`}>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-0">Nuestro Menú</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              {viewMode === 'grid' ? <FaList size={20} /> : <FaThLarge size={20} />}
            </button>
            <button
              onClick={() => setShowNewsletter(true)}
              className="bg-yellow-400 text-blue-600 p-2 rounded-full hover:bg-yellow-300 transition duration-300 ease-in-out"
            >
              <FaGem size={20} />
            </button>
          </div>
        </div>

        <div className="mb-12 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">Ofertas Especiales</h3>
          <Carousel items={featuredItems} />
        </div>

        <div className={`grid gap-8 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden ${
                viewMode === 'list' ? 'flex h-40' : 'h-auto'
              } hover:shadow-xl transition-shadow duration-300`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`${
                viewMode === 'grid' ? 'h-48' : 'w-1/3 h-full'
              } overflow-hidden`}>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className={`p-4 ${viewMode === 'list' ? 'flex-grow' : ''} flex flex-col justify-between`}>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-2 flex items-center">
                    {categoryIcons[item.category] && <span className="mr-2">{categoryIcons[item.category]}</span>}
                    {item.category}
                  </p>
                </div>
                <div className={`${
                  viewMode === 'list' ? 'flex justify-between items-center' : ''
                }`}>
                  <span className="text-2xl font-bold text-blue-600">${item.price.toFixed(2)}</span>
                  <div className="flex items-center mt-3">
                    <button 
                      onClick={() => updateQuantity(item.id, Math.max(0, getItemQuantity(item.id) - 1))}
                      className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center mr-2 transition duration-300 hover:bg-red-600"
                    >
                      <FaMinus />
                    </button>
                    <span className="mx-2 font-semibold text-lg">{getItemQuantity(item.id)}</span>
                    <button 
                      onClick={() => addToCart(item)}
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
      </div>

      {showNewsletter && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowNewsletter(false)}
        >
          <motion.div
            className="bg-white p-8 rounded-lg max-w-md w-full m-4"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-3xl font-bold mb-4 text-center text-gray-800">¡Ofertas Especiales!</h3>
            <p className="mb-6 text-center text-gray-600">Regístrate para recibir un 22% de descuento en tu próxima compra y más ofertas exclusivas.</p>
            <form className="space-y-4">
              <input type="email" placeholder="Tu correo electrónico" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300">Registrarse</button>
            </form>
            <button onClick={() => setShowNewsletter(false)} className="mt-4 text-sm text-gray-500 hover:text-gray-700 w-full text-center">Cerrar</button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Menu;