const express = require("express");
const Registration = require("../models/Registration");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching registrations", error });
  }
});
router.patch("/:id/attended", async (req, res) => {
  const { id } = req.params;
  try {
    const registration = await Registration.findById(id);
    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }
    registration.attended = !registration.attended;
    await registration.save();
    res.status(200).json({ message: "Attended status updated", registration });
  } catch (error) {
    res.status(500).json({ message: "Error updating attended status", error });
  }
});
module.exports = router;
