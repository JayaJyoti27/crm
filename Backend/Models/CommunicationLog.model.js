const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const CommunicationLogSchema = new mongoose.Schema({
  campaignId: { type: ObjectId, ref: "Campaign" },
  userId: ObjectId,
  status: { type: String, enum: ["sent", "failed"] },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CommunicationLog", CommunicationLogSchema);
