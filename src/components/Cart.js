import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

function Cart({ cartItems, removeFromCart, updateQuantity }) {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.map((item) => (
        <div key={`${item.id}-${item.isCombo}-${JSON.stringify(item.extras)}`} className="mb-4 p-4 border rounded">
          <h3 className="text-xl font-semibold">{item.name}</h3>
          <p>Price: ${item.price.toFixed(2)}</p>
          <p>Quantity: {item.quantity}</p>
          {item.isCombo && <p>Combo: Yes</p>}
          {Object.entries(item.extras).filter(([_, isAdded]) => isAdded).map(([extra]) => (
            <p key={extra}>Extra: {extra}</p>
          ))}
          {/* ... (buttons for updating quantity and removing item) */}
        </div>
      ))}
      <div className="mt-4">
        <h3 className="text-xl font-bold">Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</h3>
      </div>
    </div>
  );
}

export default Cart;