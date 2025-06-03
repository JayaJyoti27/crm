const Customer = require("../Models/Customer.model.js");

const getCustomersByRules = async (rules) => {
  if (!rules.length) return [];

  // We'll build an array of conditions combined by $and
  const conditions = rules.map(({ field, operator, value }) => {
    let parsedValue = value;

    // Convert numbers and dates
    if (["totalSpent", "totalOrders"].includes(field)) {
      parsedValue = Number(value);
      if (isNaN(parsedValue)) {
        throw new Error(`Invalid number value for ${field}`);
      }
    }

    if (field === "lastVisited") {
      parsedValue = new Date(value);
      if (isNaN(parsedValue.getTime())) {
        throw new Error("Invalid date format for lastVisited");
      }
    }

    switch (operator) {
      case "equals":
        return { [field]: parsedValue };
      case "not_equals":
        return { [field]: { $ne: parsedValue } };
      case "contains":
        return { [field]: { $regex: parsedValue, $options: "i" } };
      case "not_contains":
        return { [field]: { $not: new RegExp(parsedValue, "i") } };
      case "greater_than":
        return { [field]: { $gt: parsedValue } };
      case "less_than":
        return { [field]: { $lt: parsedValue } };
      default:
        throw new Error(`Unsupported operator: ${operator}`);
    }
  });

  // Combine all conditions with $and to enforce all rules simultaneously
  const query = { $and: conditions };

  const customers = await Customer.find(query);
  return customers;
};

module.exports = {
  getCustomersByRules,
};
