const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema(
  {
    FullName: { type: String, required: true, unique: true },
    Phone: { type: String, required: true, unique: true },
    NumberPlate: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VehicleSchema", VehicleSchema);
