import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/Button";
import { useProducts } from "../../hooks/useProducts";

import "./AdminDashboard.css";

export const AdminDashboard = () => {
  const navigate = useNavigate();

  const { products, fetchProducts, fetchAllOrders, orders, handleDeleteProduct } = useProducts()

  useEffect(() => {
    fetchProducts();
    fetchAllOrders();
  }, []);


  return (
    <div className="admin-container">
      <h3>Admin Dashboard</h3>
      <div>
        <h4>Orders</h4>
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Total Amount</th>
              <th>Order Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{`${order.firstName} ${order.lastName}`}</td>
                <td>{order.orderStatus}</td>
                <td>${order.totalAmount}</td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td>
                  <Button>Edit Order</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h4>Products</h4>
        <table className="products-table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Promotional Price</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.productId}>
                <td>{product.productId}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>${product.promotionalPrice}</td>
                <td>{product.description}</td>
                <td>
                  <Button>Edit</Button>
                  <Button
                    onClickButton={() => handleDeleteProduct(product.productId)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Button onClickButton={() => navigate("/create-product")}>
          Create a new product
        </Button>
      </div>
    </div>
  );
};
