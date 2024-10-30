import { useState } from "react";
import { Input } from "../../components/input/Input";
import "./CreateProduct.css";
import { Button } from "../../components/button/Button";
import { createNewProduct } from "../../services/productsService";

export const CreateProduct = () => {
  const [message, setMessage] = useState("");
  const [imageUrlMessage, setImageUrlMessage] = useState("");
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: null,
    promotionalPrice: null,
    category: "",
    imageUrl: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const validateImageUrl = async () => {
    try {
      // Fail A10 - Server-Side Request Forgery (SSRF): The `validateImageUrl` function fetches the image URL
      // directly from user input without proper validation or restriction. This allows an attacker to supply a
      // malicious URL, potentially forcing the server to make requests to internal resources or sensitive endpoints,
      // leading to unauthorized access or exposure of internal network information. To prevent SSRF,
      // ensure the URL points only to allowed domains, or perform validation on the server side.

      const response = await fetch(product.imageUrl);
      if (response.ok) {
        setImageUrlMessage("Image URL is valid!");
      } else {
        setImageUrlMessage("Image URL is invalid!");
      }
    } catch (e) {
      setImageUrlMessage("Image URL is invalid!");
    }
  };

  const createProduct = async () => {
    try {
      await createNewProduct(product);
      setMessage("Product created successfully!");
      setProduct({
        name: "",
        description: "",
        price: "",
        promotionalPrice: "",
        category: "",
        imageUrl: "",
      });
    } catch (e) {
      setMessage("Something went wrong, try again!");
    }
  };

  return (
    <div className="product-container">
      <div className="product-content">
        {message && <p>{message}</p>}
        <h1>Create a new product</h1>
        <div className="input-content">
          <Input
            label="Name"
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
          />
          <Input
            label="Description"
            type="text"
            name="description"
            value={product.description}
            onChange={handleInputChange}
          />
          <div className="price-container">
            <Input
              label="Original Price"
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
            />
            <Input
              label="Promotional Price"
              type="number"
              name="promotionalPrice"
              value={product.promotionalPrice}
              onChange={handleInputChange}
            />
          </div>
          <Input
            label="Image URL"
            type="text"
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleInputChange}
          />
          <Button onClickButton={validateImageUrl}>Validate Image URL</Button>
          {imageUrlMessage && <p>{imageUrlMessage}</p>}
          <Button onClickButton={createProduct}>Create Product</Button>
        </div>
      </div>
    </div>
  );
};
