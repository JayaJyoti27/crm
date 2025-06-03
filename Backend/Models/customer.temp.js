const mongoose = require("mongoose");
const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
  },
  lastVisited: {
    type: Date,
    default: null,
  },
  totalSpent: {
    type: Number,
    default: 0,
    min: 0,
  },
  totalOrders: {
    type: Number,
    default: 0,
  },
});

const CustomerModel =
  mongoose.models.customer || mongoose.model("customer", CustomerSchema);

module.exports = CustomerModel;
