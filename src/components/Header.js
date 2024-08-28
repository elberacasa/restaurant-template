import React from 'react';

function Header() {
  return (
    <header className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white p-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold animate-fade-in-down">Burger Paradise</h1>
        <img src="https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-1.2.1&auto=format&fit=crop&w=80&h=80&q=80" alt="Logo de Burger" className="rounded-full w-16 h-16 object-cover" />
      </div>
    </header>
  );
}

export default Header;