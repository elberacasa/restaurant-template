import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Menu from './components/Menu';
import Ubicaciones from './components/Ubicaciones';
import Contacto from './components/Contacto';
import Ofertas from './components/Ofertas';
import Cart from './components/Cart';
import LoadingScreen from './components/LoadingScreen';
import { ThemeProvider } from './components/ThemeProvider';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds loading time, adjust as needed

    return () => clearTimeout(timer);
  }, []);

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(i => 
        i.id === item.id && 
        i.isCombo === item.isCombo && 
        JSON.stringify(i.extras) === JSON.stringify(item.extras)
      );
      
      if (existingItemIndex !== -1) {
        return prevItems.map((i, index) => 
          index === existingItemIndex ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId, isCombo, extras) => {
    setCartItems(prevItems => prevItems.filter(item => 
      !(item.id === itemId && item.isCombo === isCombo && JSON.stringify(item.extras) === JSON.stringify(extras))
    ));
  };

  const updateQuantity = (itemId, newQuantity, isCombo, extras) => {
    if (newQuantity === 0) {
      removeFromCart(itemId, isCombo, extras);
    } else {
      setCartItems(prevItems => 
        prevItems.map(item => 
          (item.id === itemId && item.isCombo === isCombo && JSON.stringify(item.extras) === JSON.stringify(extras))
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const getItemQuantity = (itemId, isCombo, extras) => {
    const item = cartItems.find(i => 
      i.id === itemId && 
      i.isCombo === isCombo && 
      JSON.stringify(i.extras) === JSON.stringify(extras)
    );
    return item ? item.quantity : 0;
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <ThemeProvider>
      <Router>
        <div className="App flex flex-col min-h-screen">
          <AnimatePresence>
            {isLoading ? (
              <LoadingScreen key="loading" />
            ) : (
              <>
                <Header cartItemCount={cartItemCount} />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Menu addToCart={addToCart} cartItems={cartItems} updateQuantity={updateQuantity} getItemQuantity={getItemQuantity} />} />
                    <Route path="/ubicaciones" element={<Ubicaciones />} />
                    <Route path="/contacto" element={<Contacto />} />
                    <Route path="/ofertas" element={<Ofertas addToCart={addToCart} cartItems={cartItems} updateQuantity={updateQuantity} getItemQuantity={getItemQuantity} />} />
                    <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
                  </Routes>
                </main>
                <Navigation cartItemCount={cartItemCount} />
              </>
            )}
          </AnimatePresence>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
