const mongoose = require("mongoose");

const UploadSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["customers", "orders", "other"],
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },
    uploadedBy: {
      type: String, // or ObjectId if you track users
    },
    errorMessage: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

const UploadModel = mongoose.model("Upload", UploadSchema);
module.exports = UploadModel;
