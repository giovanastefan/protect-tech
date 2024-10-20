import React, { useEffect, useState } from "react";
import ProductCard from "../../components/productCard/ProductCard";
import { getAllProducts } from "../../services/productsService";
import { useCart } from "../../hooks/useCart";
import { Select } from "../../components/select/Select";
import "./Shop.css";
import { useLocation } from "react-router-dom";

export const Shop = () => {
  const location = useLocation();
  const initialProducts = location.state?.results || [];
  const [products, setProducts] = useState(initialProducts);
  const [selectedPriceOrder, setSelectedPriceOrder] = useState("");
  const { handleAddToCart } = useCart();

  useEffect(() => {
    if (initialProducts.length === 0) {
      const fetchProducts = async () => {
        try {
          const productsResponse = await getAllProducts();
          setProducts(productsResponse);
        } catch (err) {
          console.error("Error fetching products:", err);
        }
      };

      fetchProducts();
    }
  }, [setProducts]);

  const handlePriceOrderChange = (event) => {
    const order = event.target.value;
    setSelectedPriceOrder(order);

    const sortedProducts = [...products].sort((a, b) => {
      if (order === "low") return a.price - b.price;
      if (order === "high") return b.price - a.price;
      return 0;
    });

    setProducts(sortedProducts);
  };

  const renderProductsCard = () => {
    return products?.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
        handleAddToCart={handleAddToCart}
      />
    ));
  };

  return (
    <div className="shop-container">
      <div>
        <h3>Filter your products:</h3>
        <Select
          id="price"
          placeholder="Order by Price"
          value={selectedPriceOrder}
          onChange={handlePriceOrderChange}
          options={[
            { value: "low", label: "Low to high" },
            { value: "high", label: "High to low" },
          ]}
        />
      </div>
      <div className="container-products">{renderProductsCard()}</div>
    </div>
  );
};
