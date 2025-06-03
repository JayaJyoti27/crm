const CampaignService = require("../Services/Campaign.services.js");

const createCampaign = async (req, res) => {
  try {
    const campaign = await CampaignService.createCampaign(req.body);
    res.status(201).json(campaign);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create campaign", error: err.message });
  }
};

const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await CampaignService.getAllCampaigns();
    // Wrap in object with campaigns key
    res.status(200).json({ campaigns });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get campaigns", error: err.message });
  }
};

const getCampaignById = async (req, res) => {
  try {
    const campaign = await CampaignService.getCampaignById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    res.status(200).json(campaign);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching campaign", error: err.message });
  }
};

const updateCampaign = async (req, res) => {
  try {
    const updated = await CampaignService.updateCampaign(
      req.params.id,
      req.body
    );
    if (!updated) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    res.status(200).json(updated);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update campaign", error: err.message });
  }
};

const deleteCampaign = async (req, res) => {
  try {
    const deleted = await CampaignService.deleteCampaign(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    res.status(200).json({ message: "Campaign deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete campaign", error: err.message });
  }
};

const getCampaignCount = async (req, res) => {
  try {
    const count = await CampaignService.getCampaignCount();
    res.status(200).json({ count });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get count", error: err.message });
  }
};

module.exports = {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
  getCampaignCount,
};
