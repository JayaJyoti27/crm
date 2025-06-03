const Order = require("../Models/Order.model.js");

const createOrder = async (data) => {
  const order = new Order(data);
  return await order.save();
};
const getAllOrders = async () => {
  return await Order.find();
};
const getOrderById = async (id) => {
  return await Order.findById(id);
};
const updateOrder = async (id, data) => {
  return await Order.findByIdAndUpdate(id, data, { new: true });
};

const deleteOrder = async (id) => {
  return await Order.findByIdAndDelete(id);
};
const getOrderCount = async () => {
  return await Order.countDocuments();
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrderCount,
};
