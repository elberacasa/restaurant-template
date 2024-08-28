import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-6">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 text-center md:text-left mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">Burger Paradise</h3>
            <p className="mt-2">Deliciosas hamburguesas, gran ambiente</p>
          </div>
          <div className="w-full md:w-1/3 text-center mb-4 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Enlaces Rápidos</h4>
            <ul>
              <li><Link to="/" className="hover:text-red-300 transition duration-300 ease-in-out">Inicio</Link></li>
              <li><Link to="/menu" className="hover:text-red-300 transition duration-300 ease-in-out">Menú</Link></li>
              <li><Link to="/ubicaciones" className="hover:text-red-300 transition duration-300 ease-in-out">Ubicaciones</Link></li>
              <li><Link to="/contacto" className="hover:text-red-300 transition duration-300 ease-in-out">Contacto</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 text-center md:text-right">
            <p>&copy; 2023 Burger Paradise. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;