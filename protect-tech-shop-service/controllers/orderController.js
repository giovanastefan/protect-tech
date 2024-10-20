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

exports.getProductsByOrder = (req, res) => {
  const orderId = req.params.id;
  orderModel
    .getProductsByOrder(orderId)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send("Error fetching products by order.", err.message);
    });
};

exports.updateOrder = (req, res) => {
  const orderId = req.params.id;
  const newData = req.body;
  orderModel
    .updateOrder(orderId, newData)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send("Error updating order.", err.message);
    });
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
