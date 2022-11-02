const Vehicle = require("../model/Vehicle");
const router = require("express").Router();
const dotenv = require("dotenv").config();

// REGISTER
router.post("/registers", async (req, res) => {
  const { FullName, Phone, NumberPlate } = req.body;

  try {
    const oldInfo = await Vehicle.findOne({ NumberPlate });

    if (oldInfo) {
      return res.json({ error: "Number Plate already exists" });
    }

    Vehicle.create({
      FullName,
      Phone,
      NumberPlate,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "Error registering vehicle, please try again" });
  }
});

module.exports = router;
