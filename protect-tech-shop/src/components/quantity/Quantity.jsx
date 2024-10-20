import React from 'react';
import './Quantity.css';

export const Quantity = ({ quantity, onQuantityChange }) => {
  const handleDecrease = () => {
    onQuantityChange(Math.max(quantity - 1, 0));
  };

  const handleIncrease = () => {
    onQuantityChange(quantity + 1);
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      onQuantityChange(value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      handleIncrease();
    } else if (e.key === 'ArrowDown') {
      handleDecrease();
    }
  };

  return (
    <div className="quantity-input">
      <button onClick={handleDecrease} aria-label="Decrease quantity">-</button>
      <input
        type="number"
        value={quantity}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        min="0"
        aria-label="Quantity"
      />
      <button onClick={handleIncrease} aria-label="Increase quantity">+</button>
    </div>
  );
};
