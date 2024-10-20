import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './CartItem.css';
import { Quantity } from '../quantity/Quantity';
import { Button } from '../button/Button';

export const CartItem = ({ product, onRemove, onQuantityChange }) => {
  const { name, imageUrl, quantity, promotionalPrice = '', price } = product

  const [quantityCart, setQuantityCart] = useState(quantity)

  const handleQuantityChange = (quantity) => {
    setQuantityCart(quantity);
    onQuantityChange(quantity);
  };

  return (
    <div className="cart-item">
      <img src={imageUrl} alt={name} className="cart-item-image" />
      <div className="cart-item-details">
        <h3 className="cart-item-name">{name}</h3>
        <p>$ {promotionalPrice || price}</p>
        <Quantity quantity={quantityCart} onQuantityChange={handleQuantityChange}/>
        <Button className="cart-item-remove" onClickButton={onRemove}>Remove</Button>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
};