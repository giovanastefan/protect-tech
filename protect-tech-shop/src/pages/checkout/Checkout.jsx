import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/input/Input";
import { Button } from "../../components/button/Button";
import { useAuth } from "../../contexts/authProvider";
import { registerAddress } from "../../services/authService";
import "./Checkout.css";

export const Checkout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "",
  });

  const handleInputAddress = (e) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };

  const handleCreateAddress = async () => {
    try {
      const addressResponse = await registerAddress(user.userId, address);
      const addressId = addressResponse.address.id;
  
      console.log('oi', addressId)
      navigate("/checkout/confirm", { state: { addressId } });
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };
  

  return (
    <div className="checkout-container">
      <h2>Confirm your address: </h2>
      <div>
        <Input
          type="text"
          name="street"
          placeholder="Street"
          value={address.street}
          onChange={handleInputAddress}
        />
        <Input
          type="text"
          name="number"
          placeholder="Number"
          value={address.number}
          onChange={handleInputAddress}
        />
        <Input
          type="text"
          name="neighborhood"
          placeholder="Neighborhood"
          value={address.neighborhood}
          onChange={handleInputAddress}
        />
        <Input
          type="text"
          name="city"
          placeholder="City"
          value={address.city}
          onChange={handleInputAddress}
        />
        <Input
          type="text"
          name="state"
          placeholder="State"
          value={address.state}
          onChange={handleInputAddress}
        />
      </div>
      <Button onClick={handleCreateAddress}>Next</Button>
    </div>
  );
};
