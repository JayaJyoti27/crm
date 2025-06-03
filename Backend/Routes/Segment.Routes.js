const express = require("express");
const router = express.Router();

const segmentController = require("../Controllers/Segment.controllers");
console.log("segmentController:", segmentController);
// Define all routes clearly
router.get("/all", segmentController.getSegments); // ✅ NEW: fetch all segments
router.get("/conversion-rate", segmentController.getConversionRate); // fixed duplicate import
router.post("/evaluate", segmentController.evaluateRulesAndFetchUsers);
router.post("/create", segmentController.createSegment);

module.exports = router;
