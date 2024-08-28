import React from 'react';
import { motion } from 'framer-motion';

function Ubicaciones() {
  const locations = [
    {
      name: 'Burger Paradise - El Rosal',
      address: 'Av. Francisco de Miranda, Centro Comercial Lido, Nivel PB, Local 15, El Rosal, Caracas 1060, Distrito Capital',
      phone: '+58 212-952-4111',
      hours: 'Lunes a Domingo de 11:00 AM a 10:00 PM',
      image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    },
    {
      name: 'Burger Paradise - Altamira',
      address: 'Av. Luis Roche, Centro Comercial San Ignacio, Nivel C1, Local 45, Altamira, Caracas 1060, Distrito Capital',
      phone: '+58 212-267-9821',
      hours: 'Lunes a Domingo de 11:00 AM a 11:00 PM',
      image: 'https://images.unsplash.com/photo-1555992336-fb0d29498b13?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Nuestras Ubicaciones</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {locations.map((location, index) => (
          <motion.div 
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img src={location.image} alt={location.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{location.name}</h3>
              <p className="text-gray-600 mb-2">{location.address}</p>
              <p className="text-gray-600 mb-2">Teléfono: {location.phone}</p>
              <p className="text-gray-600">{location.hours}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Ubicaciones;