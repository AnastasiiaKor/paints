const { Order } = require("../models/order");
const { HttpError, ctrlWrapper } = require("../helpers");

const addOrder = async (req, res) => {
  const order = await Order.create({ ...req.body });

  res.status(201).json(order);
};

const getAllOrders = async (req, res) => {
  const { page = 1, limit = 10, done } = req.query;
  const skip = (page - 1) * limit;

  let query = {};

  if (done !== undefined) {
    query.done = done === "true";
  }
  const totalOrdersCount = await Order.countDocuments(query);

  const orders = await Order.find(query)
    .skip(parseInt(skip))
    .limit(parseInt(limit));

  res.status(200).json({ total: totalOrdersCount, orders: orders });
};

const deleteOrder = async (req, res) => {
  const { orderId } = req.params;
  const result = await Order.findByIdAndDelete(orderId);
  if (!result) {
    throw HttpError(404, "Order not found");
  }

  res.status(200).json({ message: "Order deleted" });
};

const changeStatus = async (req, res) => {
  const { orderId } = req.params;
  const updatedOrder = await Order.findByIdAndUpdate(orderId, { done: true });
  if (!updatedOrder) {
    throw HttpError(404, "Order not found");
  }

  res.status(200).json({ message: "Order updated" });
};

module.exports = {
  addOrder: ctrlWrapper(addOrder),
  getAllOrders: ctrlWrapper(getAllOrders),
  deleteOrder: ctrlWrapper(deleteOrder),
  changeStatus: ctrlWrapper(changeStatus),
};
