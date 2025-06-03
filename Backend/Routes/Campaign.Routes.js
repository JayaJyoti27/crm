const express = require("express");
const router = express.Router();
const CampaignController = require("../Controllers/Campaign.controllers.js");

router.post("/create", CampaignController.createCampaign);
router.get("/", CampaignController.getAllCampaigns);
router.get("/count", CampaignController.getCampaignCount);
router.get("/:id", CampaignController.getCampaignById);
router.put("/:id", CampaignController.updateCampaign);
router.delete("/:id", CampaignController.deleteCampaign);

module.exports = router;
