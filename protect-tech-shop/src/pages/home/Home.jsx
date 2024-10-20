import React, { useEffect, useState } from "react";
import "./Home.css";
import ProductCard from "../../components/productCard/ProductCard";
import { useCart } from "../../hooks/useCart";
import { useProducts } from "../../hooks/useProducts";

export const Home = () => {
  const { handleAddToCart } = useCart()
  const { products, fetchProducts } = useProducts()

  useEffect(() => {
    fetchProducts();
  }, []);

  const renderProductsCard = () => {
    return products?.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
        handleAddToCart={handleAddToCart}
      />
    ));
  };

  return <div className="home-container">{renderProductsCard()}</div>;
};
