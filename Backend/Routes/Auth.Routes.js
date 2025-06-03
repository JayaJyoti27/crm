const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/google", async (req, res) => {
  const { email, name, photo } = req.body;
  if (!email || !name) {
    return res.status(400).json({ error: "Missing user info" });
  }

  // Optionally save to DB here

  const token = jwt.sign({ email, name, photo }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });

  res.json({ token });
});

module.exports = router;
