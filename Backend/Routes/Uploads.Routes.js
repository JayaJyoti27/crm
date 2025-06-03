const express = require("express");
const router = express.Router();
const uploadController = require("../Controllers/Uploads.controller");

// Import your customer and order models directly
const CustomerModel = require("../Models/Customer.Model");
const OrderModel = require("../Models/Order.Model");

// Routes for upload history
router.get("/uploadHistory", uploadController.getUploadHistory);
router.post("/saveHistory", uploadController.saveUploadHistory);

router.get("/", async (req, res) => {
  try {
    const uploads = await Upload.find().sort({ createdAt: -1 });
    res.json(uploads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// New manual data entry routes (no file upload)
router.post("/customers", async (req, res) => {
  try {
    const customerData = req.body;
    const newCustomer = new CustomerModel(customerData);
    await newCustomer.save();
    res.status(201).json({ message: "Customer added successfully" });
  } catch (error) {
    console.error("Error adding customer:", error);
    res.status(500).json({ error: "Failed to add customer" });
  }
});

router.post("/orders", async (req, res) => {
  try {
    const orderData = req.body;
    const newOrder = new OrderModel(orderData);
    await newOrder.save();
    res.status(201).json({ message: "Order added successfully" });
  } catch (error) {
    console.error("Error adding order:", error);
    res.status(500).json({ error: "Failed to add order" });
  }
});

module.exports = router;
