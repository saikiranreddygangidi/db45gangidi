const mongoose = require("mongoose")
const mobileSchema = mongoose.Schema({
mobilecompany: String,
model: String,
prize: Number
})
module.exports = mongoose.model("Mobile", mobileSchema)