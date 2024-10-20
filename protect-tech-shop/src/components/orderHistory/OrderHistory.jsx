import { useEffect, useState } from "react";
import "./OrderHistory.css";
import { OrderRow } from "./subComponents/OrderRow";
import { getAllOrdersByUserId } from '../../services/orderService'
import { useAuth } from "../../contexts/authProvider";

export const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orderResponse = await getAllOrdersByUserId(user.userId);
        setOrders(orderResponse);
      }
      catch(err) {
        console.log('Error to get orders')
      }
    };
    fetchOrders();
  }, [user]);

  const renderOrders = () => {
    if (orders.length > 0) {
      return orders?.map((order) => {
        return <OrderRow key={order.orderId} order={order} />;
      });
    }

    console.log('oi', orders)

    return (
      <p>
        It looks like you haven't placed any orders yet. How about making one
        now?
      </p>
    );
  };

  return (
    <div className="orders-container">
      <div className="orders-content">
        <div className="orders-title">
          <h2>Recent Order History</h2>
        </div>
        <div className="orders-table">
          <table>
            <thead>
              <tr>
                <th>ORDER ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>STATUS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{renderOrders()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
