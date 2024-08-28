import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFilter, FaChevronRight, FaChevronLeft, FaGem } from 'react-icons/fa';

const menuItems = [
  { id: 1, name: 'Hamburguesa Clásica', price: 8.99, category: 'Hamburguesas', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 2, name: 'Hamburguesa con Queso', price: 9.99, category: 'Hamburguesas', image: 'https://images.unsplash.com/photo-1551615593-ef5fe247e8f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 3, name: 'Hamburguesa Vegetariana', price: 7.99, category: 'Hamburguesas', image: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 4, name: 'Papas Fritas', price: 3.99, category: 'Acompañantes', image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 5, name: 'Aros de Cebolla', price: 4.99, category: 'Acompañantes', image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 6, name: 'Refresco', price: 1.99, category: 'Bebidas', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 7, name: 'Batido', price: 4.99, category: 'Bebidas', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 8, name: 'Nuggets de Pollo', price: 6.99, category: 'Acompañantes', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 9, name: 'Hamburguesa BBQ', price: 10.99, category: 'Hamburguesas', image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 10, name: 'Ensalada César', price: 7.99, category: 'Ensaladas', image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
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

function Menu() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 20]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);

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

  const sidebarVariants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: '-100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isSidebarOpen]);

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row relative">
      <motion.div
        initial="closed"
        animate={isSidebarOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
        className="fixed left-0 top-0 h-full bg-white shadow-lg z-20 w-64 p-4 md:relative md:w-auto md:shadow-none md:p-0 md:mr-4"
      >
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 md:hidden"
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
      
      <div className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-r-lg z-10 md:hidden">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-gray-500 hover:text-gray-700"
        >
          <FaFilter size={24} />
        </button>
      </div>

      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Nuestro Menú</h2>
          <button
            onClick={() => setShowNewsletter(true)}
            className="bg-yellow-400 text-blue-600 p-2 rounded-full hover:bg-yellow-300 transition duration-300 ease-in-out"
          >
            <FaGem size={24} />
          </button>
        </div>
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <motion.img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-40 object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-2">{item.category}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-blue-600">${item.price.toFixed(2)}</span>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-yellow-300 hover:text-blue-600 transition duration-300 ease-in-out text-sm"
                  >
                    Añadir al carrito
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {showNewsletter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowNewsletter(false)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white p-6 rounded-lg max-w-md w-full m-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-4">¡Ofertas Especiales!</h3>
              <p className="mb-4">Regístrate para recibir un 22% de descuento en tu próxima compra y más ofertas exclusivas.</p>
              <form className="space-y-4">
                <input type="email" placeholder="Tu correo electrónico" className="w-full p-2 border rounded" />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300">Registrarse</button>
              </form>
              <button onClick={() => setShowNewsletter(false)} className="mt-4 text-sm text-gray-500 hover:text-gray-700">Cerrar</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Menu;