const mongoose = require("mongoose");
const mongodbErrorHandler = require("mongoose-unique-validator");

const client = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

client.plugin(mongodbErrorHandler);

module.exports = mongoose.model("Client", client);
