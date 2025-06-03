// POST /vendor/send-message
const express = require("express");
const router = express.Router();
const axios = require("axios");
router.post("/send-message", async (req, res) => {
  const { campaignId, recipient, message } = req.body;

  // Simulate 90% success and 10% failure
  const isSuccess = Math.random() < 0.9;

  // Simulate async delay for sending message
  setTimeout(() => {
    // Call your delivery receipt API with delivery status
    axios
      .post("http://localhost:4000/delivery-receipt", {
        campaignId,
        recipient,
        status: isSuccess ? "delivered" : "failed",
      })
      .catch(console.error);

    // Respond to caller immediately
    res.json({
      success: isSuccess,
      message: isSuccess ? "Message sent" : "Message failed",
    });
  }, 500); // 500 ms delay for simulation
});
module.exports = router;
