import { useState } from "react";
import { Input } from "../../components/input/Input";
import "./CreateProduct.css";
import { Button } from "../../components/button/Button";

export const CreateProduct = () => {
  const [message, setMessage] = useState("");
  const [product, setProduct] = useState({
    name: "",
    description: "",
    originalPrice: null,
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

  const createProduct = async () => {
    try {
      setMessage("Product created with sucess!");
      setProduct({
        name: '',
        description: '',
        originalPrice: '',
        promotionalPrice: '',
        category: '',
        imageUrl: '',
      });
    } catch (e) {
      setMessage("Something is wrong, try again!");
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
              name="originalPrice"
              value={product.originalPrice}
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
          <Button onClickButton={createProduct}>Create Product</Button>
        </div>
      </div>
    </div>
  );
};
