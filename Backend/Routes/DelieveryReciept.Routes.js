// POST /delivery-receipt
const express = require("express");
const router = express.Router();
const Campaign = require("../Models/Campaign.model.js");
router.post("/receipt", async (req, res) => {
  const { campaignId, recipient, status } = req.body;

  try {
    // Update communication_log with delivery status
    await CommunicationLog.create({ campaignId, recipient, status });

    // Update campaign stats
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) return res.status(404).send("Campaign not found");

    if (status === "delivered") campaign.stats.sent += 1;
    else if (status === "failed") campaign.stats.failed += 1;

    await campaign.save();

    res.json({ message: "Delivery status updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
