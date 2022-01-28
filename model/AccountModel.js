const mongoose = require("mongoose");
const AccountModel = new mongoose.Schema({
  username: { type: String, required: true },
  password: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("AccountModel", AccountModel);
