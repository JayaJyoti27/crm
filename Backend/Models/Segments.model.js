const mongoose = require("mongoose");

const SegmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  messageTemplate: String,
  rules: [
    {
      field: { type: String, required: true },
      operator: { type: String, required: true },
      value: { type: mongoose.Schema.Types.Mixed, required: true }, // flexible type: number or string
      condition: { type: String, enum: ["AND", "OR"], required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now }, // set default creation date
});

const SegmentModel = mongoose.model("Segment", SegmentSchema); // Fix variable names and collection name

module.exports = SegmentModel;
