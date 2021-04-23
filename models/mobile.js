const mongoose = require("mongoose");
const mobileSchema = mongoose.Schema({
  mobilecompany: String,
  model: { type: String, required: true, unique: true },
  prize: { type: Number, min: 0, max: 10000 },
});
module.exports = mongoose.model("Mobile", mobileSchema);
