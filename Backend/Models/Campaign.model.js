const mongoose = require("mongoose");
const { Schema } = mongoose; // Import Schema
const ObjectId = Schema.Types.ObjectId;
const CampaignSchema = new mongoose.Schema({
  name: String,
  message: String,
  segmentId: ObjectId,
  audience: [ObjectId], // user IDs
  stats: {
    sent: Number,
    failed: Number,
  },
  createdAt: Date,
});

module.exports = mongoose.model("Campaign", CampaignSchema);
