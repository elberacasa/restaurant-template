import React, { useState, useEffect, useContext, useMemo } from 'react';
import { FaFilter, FaChevronLeft, FaGem, FaPlus, FaMinus, FaThLarge, FaList, FaHamburger, FaGlassMartini, FaCarrot, FaIceCream, FaUtensils, FaSearch, FaArrowUp, FaPizzaSlice } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Carousel from './Carousel';
import DesktopSidebar from './DesktopSidebar';
import MobileSidebar from './MobileSidebar';
import ItemDetails from './ItemDetails';
import { ThemeContext } from './ThemeProvider';

const menuItems = [
  { id: 1, name: 'Hamburguesa Clásica', price: 8.99, category: 'Hamburguesas', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 2, name: 'Hamburguesa con Queso', price: 9.99, category: 'Hamburguesas', image: 'https://images.unsplash.com/photo-1551615593-ef5fe247e8f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 3, name: 'Hamburguesa Vegetariana', price: 7.99, category: 'Hamburguesas', image: 'https://images.unsplash.com/photo-1525059696-4f24f54ddde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
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
  { id: 16, name: 'Limonada Casera', price: 2.99, category: 'Bebidas', image: 'https://images.unsplash.com/photo-1621263764200-df1444c5e859?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 17, name: 'Helado de Vainilla', price: 3.99, category: 'Postres', image: 'https://images.unsplash.com/photo-1570197571499-166b36435e9f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 18, name: 'Brownie con Helado', price: 5.99, category: 'Postres', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 19, name: 'Nachos con Queso', price: 6.99, category: 'Acompañantes', image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 20, name: 'Café Americano', price: 2.49, category: 'Bebidas', image: 'https://images.unsplash.com/photo-1521302080334-4bebac2763a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
];

const comboItems = [
  {
    id: 'combo1',
    name: 'Combo Familiar',
    description: '4 hamburguesas clásicas, 2 porciones grandes de papas fritas, y 4 refrescos',
    price: 39.99,
    category: 'Combos',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'combo2',
    name: 'Dúo Perfecto',
    description: '2 hamburguesas con queso, 2 porciones medianas de papas fritas, y 2 refrescos',
    price: 24.99,
    category: 'Combos',
    image: 'https://images.unsplash.com/photo-1551615593-ef5fe247e8f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'combo3',
    name: 'Combo Vegetariano',
    description: '2 hamburguesas vegetarianas, 1 porción grande de aros de cebolla, y 2 batidos',
    price: 29.99,
    category: 'Combos',
    image: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
];

const allItems = [...comboItems, ...menuItems];

function Menu({ addToCart, cartItems, updateQuantity, getItemQuantity }) {
  const theme = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 20]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const [viewMode, setViewMode] = useState(isDesktop ? 'grid' : 'list');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isItemDetailsVisible, setIsItemDetailsVisible] = useState(false);

  const filteredItems = useMemo(() => 
    allItems.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [allItems, searchTerm]
  );

  const categories = useMemo(() => 
    ['Todos', ...new Set(allItems.map(item => item.category))],
    [allItems]
  );

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
      setIsDesktop(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const featuredItems = menuItems.slice(0, 8); // Select first 8 items for the carousel

  const categoryIcons = {
    'Todos': <FaUtensils />,
    'Hamburguesas': <FaHamburger />,
    'Acompañantes': <FaCarrot />,
    'Bebidas': <FaGlassMartini />,
    'Ensaladas': <FaCarrot />,
    'Wraps': <FaUtensils />,
    'Postres': <FaIceCream />,
    'Combos': <FaPizzaSlice />,
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsItemDetailsVisible(true);
  };

  const handleCloseItemDetails = () => {
    setIsItemDetailsVisible(false);
    setTimeout(() => setSelectedItem(null), 300); // Delay to allow exit animation
  };

  const handleAddToCart = (item, isCombo = false) => {
    addToCart({ ...item, isCombo });
  };

  const getTotalItemQuantity = (itemId) => {
    return cartItems.reduce((total, cartItem) => {
      if (cartItem.id === itemId) {
        return total + cartItem.quantity;
      }
      return total;
    }, 0);
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    const itemInCart = cartItems.find(item => item.id === itemId);
    if (itemInCart) {
      // If the item is in the cart, update its quantity
      updateQuantity(itemId, newQuantity, itemInCart.isCombo, itemInCart.extras);
    } else {
      // If the item is not in the cart, add it with default options
      const item = menuItems.find(item => item.id === itemId);
      if (item) {
        addToCart({ ...item, isCombo: false, extras: {} });
      }
    }
  };

  const handleScroll = () => {
    setShowBackToTop(window.pageYOffset > 300);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto p-4 flex flex-col relative font-sans bg-gray-100">
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search menu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border rounded"
            aria-label="Search menu"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

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
        <MobileSidebar
          categories={categories}
          selectedCategories={selectedCategories}
          handleCategoryChange={handleCategoryChange}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          categoryIcons={categoryIcons}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
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


      {/* Modified Ofertas Especiales section */}
      <div className="mb-8 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-yellow-400 text-blue-800 py-2 px-4">
          <h3 className="text-lg font-semibold">Ofertas Especiales del Día</h3>
        </div>
        <div className="p-4">
          <Carousel 
            items={featuredItems} 
            itemsToShow={isDesktop ? 4 : 2}
            itemsToScroll={isDesktop ? 4 : 2}
            onItemClick={handleItemClick}
            getTotalItemQuantity={getTotalItemQuantity}
          />
        </div>
      </div>

      {/* Combos section */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Combos Especiales</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comboItems.map((combo) => (
            <motion.div
              key={combo.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden ${
                viewMode === 'list' ? 'flex h-40' : 'h-auto'
              } hover:shadow-xl transition-shadow duration-300 cursor-pointer`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              onClick={() => handleItemClick(combo)}
            >
              <div className={`${
                viewMode === 'grid' ? 'h-48' : 'w-1/3 h-full'
              } overflow-hidden`}>
                <img 
                  src={combo.image} 
                  alt={combo.name} 
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className={`p-4 ${viewMode === 'list' ? 'flex-grow' : ''} flex flex-col justify-between`}>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{combo.name}</h3>
                  <p className="text-gray-600 text-sm mb-2 flex items-center">
                    {categoryIcons[combo.category] && <span className="mr-2">{categoryIcons[combo.category]}</span>}
                    {combo.category}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xl font-bold text-blue-600">${combo.price.toFixed(2)}</span>
                  <div className="flex items-center">
                    {getTotalItemQuantity(combo.id) > 0 && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpdateQuantity(combo.id, Math.max(0, getTotalItemQuantity(combo.id) - 1));
                        }}
                        className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center mr-2 transition duration-300 hover:bg-red-600"
                      >
                        <FaMinus />
                      </button>
                    )}
                    {getTotalItemQuantity(combo.id) > 0 && (
                      <span className="mx-2 font-semibold text-lg">{getTotalItemQuantity(combo.id)}</span>
                    )}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(combo, true);
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
      </div>

      {/* Regular menu items */}
      <div className={`grid gap-4 sm:gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
          : 'grid-cols-1'
      }`}>
        {filteredItems.filter(item => item.category !== 'Combos').map((item) => (
          <motion.div
            key={item.id}
            className={`bg-white rounded-lg shadow-md overflow-hidden ${
              viewMode === 'list' ? 'flex flex-col sm:flex-row h-auto sm:h-40' : 'h-auto'
            } hover:shadow-xl transition-shadow duration-300 cursor-pointer`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            onClick={() => handleItemClick(item)}
          >
            <div className={`${
              viewMode === 'grid' ? 'h-48' : 'w-full sm:w-1/3 h-40 sm:h-full'
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
              <div className="flex justify-between items-center mt-2">
                <span className="text-xl font-bold text-blue-600">${item.price.toFixed(2)}</span>
                <div className="flex items-center">
                  {getTotalItemQuantity(item.id) > 0 && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUpdateQuantity(item.id, Math.max(0, getTotalItemQuantity(item.id) - 1));
                      }}
                      className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center mr-2 transition duration-300 hover:bg-red-600"
                    >
                      <FaMinus />
                    </button>
                  )}
                  {getTotalItemQuantity(item.id) > 0 && (
                    <span className="mx-2 font-semibold text-lg">{getTotalItemQuantity(item.id)}</span>
                  )}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(item);
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

      {/* Floating buttons for view mode and newsletter */}
      <div className="fixed right-4 bottom-20 md:bottom-4 flex flex-col space-y-2 z-20">
        <button
          onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          className="bg-blue-600 text-white p-2 md:p-3 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out shadow-lg"
        >
          {viewMode === 'grid' ? 
            <FaList size={isDesktop ? 20 : 16} /> : 
            <FaThLarge size={isDesktop ? 20 : 16} />
          }
        </button>
        <button
          onClick={() => setShowNewsletter(true)}
          className="bg-yellow-400 text-blue-600 p-2 md:p-3 rounded-full hover:bg-yellow-300 transition duration-300 ease-in-out shadow-lg"
        >
          <FaGem size={isDesktop ? 20 : 16} />
        </button>
      </div>

      {/* Item Details */}
      <ItemDetails
        item={selectedItem}
        onClose={handleCloseItemDetails}
        addToCart={handleAddToCart}
        updateQuantity={handleUpdateQuantity}
        getItemQuantity={getTotalItemQuantity}
        isVisible={isItemDetailsVisible}
        isCombo={selectedItem && selectedItem.category === 'Combos'}
      />

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