const UploadModel = require("../Models/Uploads.model");
exports.saveUploadHistory = async (data) => {
  const newEntry = new UploadModel(data);
  return await newEntry.save();
};
exports.getAllUploads = async (data) => {
  return await this.getUploadHistory.find().sort({ date: -1 });
};
