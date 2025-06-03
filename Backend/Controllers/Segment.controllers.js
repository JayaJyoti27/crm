const CustomerService = require("../Services/Customer.services.js");
const OrderService = require("../Services/Order.services.js");
const { getCustomersByRules } = require("../Services/Segment.services.js");
const SegmentModel = require("../Models/Segments.model.js");
const CampaignModel = require("../Models/Campaign.model.js"); // import your Campaign model here
const axios = require("axios");
exports.getConversionRate = async (req, res) => {
  try {
    const orders = await OrderService.getOrderCount();
    const customers = await CustomerService.getCustomerCount();
    const rate = customers > 0 ? (orders / customers) * 100 : 0;
    res.status(200).json({ rate: rate.toFixed(2) });
  } catch (error) {
    res.status(500).json({ error: "Error calculating conversion rate" });
  }
};

exports.evaluateRulesAndFetchUsers = async (req, res) => {
  try {
    const { rules } = req.body;

    if (!rules || !Array.isArray(rules) || rules.length === 0) {
      return res
        .status(400)
        .json({ message: "Rules are required and must be a non-empty array." });
    }

    const users = await getCustomersByRules(rules);

    res.status(200).json({
      message: "Users fetched successfully based on rules.",
      data: users,
    });
  } catch (error) {
    console.error("Error in evaluating rules:", error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getSegments = async (req, res) => {
  try {
    const segments = await SegmentModel.find().sort({ createdAt: -1 }); // recent first
    res.status(200).json({ data: segments });
  } catch (error) {
    console.error("Error fetching segments:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch segments", error: error.message });
  }
};

exports.createSegment = async (req, res) => {
  try {
    const { name, rules } = req.body;

    if (
      !name ||
      typeof name !== "string" ||
      !Array.isArray(rules) ||
      rules.length === 0
    ) {
      return res.status(400).json({ message: "Invalid segment data." });
    }

    // Save the new segment with template
    const newSegment = new SegmentModel({ name, rules });
    await newSegment.save();

    // Get customers matching the rules
    const matchedCustomers = await getCustomersByRules(rules);

    // Create the campaign
    const campaign = new CampaignModel({
      name: `Auto Campaign for Segment: ${name}`,
      segmentId: newSegment._id,
      message: "Hii you got a discount",
      stats: { sent: 0, failed: 0 },
      createdAt: new Date(),
    });
    await campaign.save();

    // Filter customers with valid phone numbers
    const customers = matchedCustomers.filter((c) => c.phone);

    // ✨ Function to personalize message per customer
    const personalizeMessage = (template, customer) =>
      template.replace("{name}", customer.name || "there");

    // 🔁 Loop through customers and send personalized message
    customers.forEach(async (customer) => {
      try {
        const personalizedMessage = personalizeMessage(
          messageTemplate,
          customer
        );

        await axios.post("http://localhost:4000/vendor/send-message", {
          campaignId: campaign._id,
          recipient: customer.phone,
          message: personalizedMessage, // ✅ now customized
        });
      } catch (err) {
        console.error("Error sending message", err.message);
      }
    });

    // Respond
    res.status(200).json({
      message: "Segment and associated campaign created successfully.",
      data: { segment: newSegment, campaign },
    });
  } catch (error) {
    console.error("Error creating segment:", error.message);
    res
      .status(500)
      .json({ message: "Failed to create segment", error: error.message });
  }
};
