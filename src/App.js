import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Menu from './components/Menu';
import Ubicaciones from './components/Ubicaciones';
import Contacto from './components/Contacto';
import Ofertas from './components/Ofertas';
import Cart from './components/Cart';
import { ThemeProvider } from './components/ThemeProvider';

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

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <ThemeProvider>
      <Router>
        <div className="App flex flex-col min-h-screen">
          <Header cartItemCount={cartItemCount} />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Menu addToCart={addToCart} cartItems={cartItems} updateQuantity={updateQuantity} />} />
              <Route path="/ubicaciones" element={<Ubicaciones />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/ofertas" element={<Ofertas addToCart={addToCart} cartItems={cartItems} updateQuantity={updateQuantity} />} />
              <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
            </Routes>
          </main>
          <Navigation cartItemCount={cartItemCount} />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
