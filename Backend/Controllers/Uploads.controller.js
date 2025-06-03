const uploadServices = require("../Services/Uploads.services.js");

// Make sure to install this: npm install csv-parser

exports.saveUploadHistory = async (req, res) => {
  try {
    const newUpload = await uploadServices.saveUploadHistory(req.body);
    res.status(201).json(newUpload);
  } catch (error) {
    console.error("Error saving upload history:", error); // More detailed error output
    res.status(500).json({ error: "Failed to save upload history" });
  }
};

exports.getUploadHistory = async (req, res) => {
  try {
    const uploads = await uploadServices.getAllUploads();
    res.json(uploads);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
