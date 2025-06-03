const Campaign = require("../Models/Campaign.model.js");
const CommunicationLog = require("../Models/CommunicationLog.model.js");

const createCampaign = async (data) => {
  const campaign = new Campaign({
    ...data,
    createdAt: new Date(),
    stats: { sent: 0, failed: 0 },
  });

  await campaign.save();

  let sent = 0;
  let failed = 0;

  // Simulate delivery for each user in the audience
  for (const userId of campaign.audience) {
    const isSuccess = Math.random() > 0.1; // 90% chance of success

    await CommunicationLog.create({
      campaignId: campaign._id,
      userId,
      status: isSuccess ? "sent" : "failed",
    });

    if (isSuccess) sent++;
    else failed++;
  }

  // Update the campaign with final stats
  campaign.stats = { sent, failed };
  await campaign.save();

  return campaign;
};

// Populate segmentId to get segment name when fetching campaigns
const getAllCampaigns = async () => {
  return await Campaign.find().populate("segmentId", "name");
};

const getCampaignById = async (id) => {
  return await Campaign.findById(id).populate("segmentId", "name");
};

const updateCampaign = async (id, data) => {
  return await Campaign.findByIdAndUpdate(id, data, { new: true });
};

const deleteCampaign = async (id) => {
  return await Campaign.findByIdAndDelete(id);
};

const getCampaignCount = async () => {
  return await Campaign.countDocuments();
};

module.exports = {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
  getCampaignCount,
};
