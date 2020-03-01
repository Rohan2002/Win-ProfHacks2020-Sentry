const mongoose = require("mongoose");
const DeviceSchema = new mongoose.Schema({
  voltage: { type: Number },
  ampere: { type: Number },
  time: { type: Number },
  uuid: { type: String }
});

module.exports = mongoose.model("Device", DeviceSchema);
