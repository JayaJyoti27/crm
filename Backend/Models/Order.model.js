const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
  customerEmail: {
    type: String,

    required: true,
  },
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true, min: 0 },
    },
  ],
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const OrderModel =
  mongoose.models.Order || mongoose.model("Order", OrderSchema);

module.exports = OrderModel;
