import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

function Home() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container mx-auto p-4 fade-bottom"
    >
      <motion.h2 
        variants={itemVariants}
        className="text-3xl font-bold text-gray-800 mb-6"
      >
        Bienvenidos a Burger Paradise
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-xl font-semibold mb-2">Nuestra Historia</h3>
          <p className="text-gray-600">Fundada en 2010 en el corazón de Caracas, Burger Paradise nació de la pasión por crear las mejores hamburguesas artesanales. Desde entonces, nos hemos convertido en el destino favorito para los amantes de las hamburguesas en la ciudad.</p>
        </motion.div>
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-xl font-semibold mb-2">Ingredientes Frescos</h3>
          <p className="text-gray-600">En Burger Paradise, nos enorgullecemos de utilizar solo los ingredientes más frescos y de la más alta calidad. Nuestras carnes son 100% de res, nuestros vegetales son cultivados localmente y nuestro pan es horneado diariamente.</p>
        </motion.div>
      </div>
      
      <motion.div 
        variants={itemVariants}
        className="mt-8 bg-white rounded-lg shadow-md p-6"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Ubicación</h3>
        <p className="text-gray-600 mb-2">Av. Francisco de Miranda, Centro Comercial Lido, Nivel PB, Local 15, El Rosal, Caracas 1060, Distrito Capital</p>
        <p className="text-gray-600 mb-2">Teléfono: +58 212-952-4111</p>
        <p className="text-gray-600">Horario: Lunes a Domingo de 11:00 AM a 10:00 PM</p>
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        className="mt-8 mb-20" // Add bottom margin to prevent content from being hidden behind the navigation bar
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Promociones Especiales</h3>
        <motion.div 
          className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg shadow-md"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <p className="font-bold">¡2x1 en hamburguesas clásicas todos los martes!</p>
          <p>Ven con un amigo y disfruta de esta increíble oferta.</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Home;