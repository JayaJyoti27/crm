// services/customer.service.js

const Customer = require("../Models/Customer.model.js");

const createCustomer = async (data) => {
  const customer = new Customer(data);
  return await customer.save();
};

const getAllCustomers = async () => {
  return await Customer.find();
};

const getCustomerById = async (id) => {
  return await Customer.findById(id);
};

const updateCustomer = async (id, data) => {
  return await Customer.findByIdAndUpdate(id, data, { new: true });
};

const deleteCustomer = async (id) => {
  return await Customer.findByIdAndDelete(id);
};
const getCustomerCount = async () => {
  return await Customer.countDocuments();
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  getCustomerCount,
};
