import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useScroll, useSpring } from "framer-motion";
import Header from './components/Header';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Menu from './components/Menu';
import Ubicaciones from './components/Ubicaciones';
import Contacto from './components/Contacto';
import Ofertas from './components/Ofertas';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderSummary from './components/OrderSummary';
import Footer from './components/Footer';
import './global.css';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
    } else {
      setCartItems(prevItems => 
        prevItems.map(item => 
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  return (
    <Router>
      <ScrollToTop />
      <AppContent 
        cartItems={cartItems}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
    </Router>
  );
}

// New component to handle scrolling to top
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent({ cartItems, addToCart, removeFromCart, updateQuantity }) {
  const location = useLocation();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ container: ref });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="App flex flex-col min-h-screen bg-white">
      <Header cartItemCount={cartItems.reduce((total, item) => total + item.quantity, 0)} />
      <Navigation />
      <motion.div
        className="h-1 bg-blue-500 fixed top-0 left-0 right-0 origin-left z-50"
        style={{ scaleX }}
      />
      <main ref={ref} className="flex-grow pb-24 md:pb-0 overflow-y-auto w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Menu addToCart={addToCart} cartItems={cartItems} updateQuantity={updateQuantity} />} />
            <Route path="/inicio" element={<Home />} />
            <Route path="/ubicaciones" element={<Ubicaciones />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/ofertas" element={<Ofertas addToCart={addToCart} cartItems={cartItems} updateQuantity={updateQuantity} />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
            <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />
            <Route path="/order-summary" element={<OrderSummary />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
}

export default App;
