import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Menu from './components/Menu';
import Ubicaciones from './components/Ubicaciones';
import Contacto from './components/Contacto';
import Ofertas from './components/Ofertas';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <Header />
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/ubicaciones" element={<Ubicaciones />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/ofertas" element={<Ofertas />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
