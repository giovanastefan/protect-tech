import React, { useState } from "react";
import { Input } from "../../../components/input/Input";
import { Select } from "../../../components/select/Select";
import { Button } from "../../../components/button/Button";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useCart } from "../../../hooks/useCart";

export const OrderDetailsPage = () => {
  const location = useLocation();
  const { addressId } = location.state || {};
  const [order, setOrder] = useState({
    payment: "Cash",
    notes: "",
  });

  const payments = ["Cash", "Credit", "PayPal"];
  const { handleCreateOrder } = useCart();
  const navigate = useNavigate();

  const handleInputOrder = (e) => {
    const { name, value } = e.target;
    setOrder({
      ...order,
      [name]: value,
    });
  };

  const handleConfirmOrder = () => {
    try {
      handleCreateOrder(order.payment, addressId)
      navigate('/profile')
    }
    catch(err) {
      console.log('Error to create order', err)
    }
  }

  return (
    <div className="checkout-container">
      <div className="checkout-detail">
        <h3>Order Details</h3>
        <Input
          type="text"
          name="notes"
          placeholder="Ex: It's a gift"
          value={order.notes}
          onChange={handleInputOrder}
        />
        <Select
          id="paymentMethod"
          placeholder="Payment Method"
          value={order.paymentMethod}
          onChange={handleInputOrder}
          options={payments.map((payment) => ({
            value: payment,
            label: payment,
          }))}
        />
      </div>
      <Button onClick={handleConfirmOrder} className="button-confirm">
        Confirm
      </Button>
    </div>
  );
};
