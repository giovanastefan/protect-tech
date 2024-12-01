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
      res.status(500).send("Error fetching orders. " + err.message);
    });
};

exports.getAllOrdersByUserId = (req, res) => {
  const userId = parseInt(req.params.userId, 10);

  if (isNaN(userId)) {
    return res.status(400).send("Invalid user ID. Please provide a valid integer.");
  }

  orderModel
    .getAllOrdersByUserId(userId)
    .then((result) => {
      const formattedOrders = result.map(formatOrderData);
      res.send(formattedOrders);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("Error fetching orders. " + err.message);
    });
};

exports.getOrderById = (req, res) => {
  const orderId = parseInt(req.params.id, 10);

  if (isNaN(orderId)) {
    return res.status(400).send("Invalid order ID. Please provide a valid integer.");
  }

  orderModel
    .getOrderById(orderId)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send("Error fetching order. " + err.message);
    });
};

exports.updateOrder = (req, res) => {
  const orderId = parseInt(req.params.id, 10);
  const newData = req.body;

  if (isNaN(orderId)) {
    return res.status(400).send("Invalid order ID. Please provide a valid integer.");
  }

  orderModel
    .updateOrder(orderId, newData)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send("Error updating order. " + err.message);
    });
};

exports.getPastOrdersByCustomerID = (req, res) => {
  const customerId = parseInt(req.params.id, 10);

  if (isNaN(customerId)) {
    return res.status(400).send("Invalid customer ID. Please provide a valid integer.");
  }

  orderModel
    .getPastOrdersByCustomerID(customerId)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send("Error fetching past orders. " + err.message);
    });
};
