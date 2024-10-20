import { useState } from "react";
import "./ProductCard.css";
import { Button } from "../button/Button";
import { Quantity } from "../quantity/Quantity";

const ProductCard = ({ product, handleAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (quantity) => {
    setQuantity(quantity);
  };

  const handleAddToCartClick = () => {
    handleAddToCart(product.productId, quantity);
  };

  return (
    <div className="card-container">
      <img src={product.imageUrl} alt={product.name} />

      <div className="card-details">
        <div className="card-title">
          <p className="name">{product.name}</p>
          <p className="price">${product.promotionalPrice || product.price}</p>
        </div>
      </div>
      <div className="container-cart">
        <Quantity quantity={quantity} onQuantityChange={handleQuantityChange} />
        <Button onClick={handleAddToCartClick}>Add to Cart</Button>
      </div>
    </div>
  );
};

export default ProductCard;
