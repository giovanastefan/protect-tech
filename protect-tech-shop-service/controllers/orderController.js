const orderModel = require("../models/orderModel");

const formatOrderData = (order) => {
  return {
    orderId: order.order_id,
    firstName: order.first_name,
    lastName: order.last_name,
    orderStatus: order.order_status,
    totalAmount: order.total_amount,
    orderDate: order.order_date,
  };
};

exports.getAllOrders = (req, res) => {
  orderModel
    .getAllOrders()
    .then((result) => {
      const formattedOrders = result.map(formatOrderData);
      res.send(formattedOrders);
    })
    .catch((err) => {
      res.status(500).send("Error fetching orders.", err.message);
    });
};

exports.getAllOrdersByUserId = (req, res) => {
  const { userId } = req.params;

  orderModel
    .getAllOrdersByUserId(userId)
    .then((result) => {
      const formattedOrders = result.map(formatOrderData);
      res.send(formattedOrders);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("Error fetching orders.", err.message);
    });
};

exports.getOrderById = (req, res) => {
  const orderId = req.params.id;
  orderModel
    .getOrderById(orderId)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send("Error fetching order.", err.message);
    });
};

exports.updateOrder = async (req, res) => {
  const orderId = req.params.id;
  const updatedOrder = req.body;

  try {
    const result = await orderModel.updateOrder(orderId, updatedOrder);

    if (!result) {
      return res
        .status(404)
        .send({ message: "Order not found or no changes made." });
    }

    res.status(200).send(result);
  } catch (err) {
    console.error("Error updating order:", err);
    res
      .status(500)
      .send({ message: "Error updating order.", error: err.message });
  }
};

exports.getPastOrdersByCustomerID = (req, res) => {
  const customerId = req.params.id;
  orderModel
    .getPastOrdersByCustomerID(customerId)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send("Error fetching past orders.", err.message);
    });
};
