const orderServices = require("../Services/Order.services.js");
const createOrder = async (req, res) => {
  try {
    const order = await orderServices.createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getAllOrders = async (req, res) => {
  try {
    const order = await orderServices.getAllOrders();
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getOrderById = async (req, res) => {
  try {
    const order = await orderServices.getOrderById(req.params.id);
    if (!order) return res.status(404).json({ error: " not found" });
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const updateOrder = async (req, res) => {
  try {
    const order = await orderServices.updateOrder(req.params.id, req.body);
    if (!order) return res.status(404).json({ error: "not found" });
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await orderServices.deleteOrder(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ message: " deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getOrderCount = async (req, res) => {
  try {
    const count = await orderServices.getOrderCount();
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error getting order count:", error);
    res.status(500).json({ error: "Error getting count" });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrderCount,
};
