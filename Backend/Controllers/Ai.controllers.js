const { getAIResponse } = require("../Services/Ai.services.js");

exports.generateMessage = async (req, res) => {
  try {
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    const result = await getAIResponse(description); // Use the correct function here
    res.json({ message: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
