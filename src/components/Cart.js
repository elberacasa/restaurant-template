import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

function Cart({ cartItems, removeFromCart, updateQuantity }) {
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty. <Link to="/" className="text-blue-500 hover:underline">Start shopping</Link></p>
      ) : (
        <>
          {cartItems.map((item) => (
            <motion.div 
              key={`${item.id}-${item.isCombo}-${JSON.stringify(item.extras)}`} 
              className="mb-4 p-4 border rounded flex justify-between items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p>Price: ${item.price.toFixed(2)}</p>
                {item.isCombo && <p>Combo: Yes</p>}
                {item.extras && Object.entries(item.extras)
                  .filter(([_, isAdded]) => isAdded)
                  .map(([extra]) => (
                    <p key={extra}>Extra: {extra}</p>
                  ))
                }
              </div>
              <div className="flex items-center">
                <button onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1), item.isCombo, item.extras)} className="text-red-500 p-1">
                  <FaMinus />
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1, item.isCombo, item.extras)} className="text-green-500 p-1">
                  <FaPlus />
                </button>
                <button onClick={() => removeFromCart(item.id, item.isCombo, item.extras)} className="ml-4 text-red-500 p-1">
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          ))}
          <div className="mt-4 text-right">
            <h3 className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</h3>
            <Link to="/checkout" className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-200">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;