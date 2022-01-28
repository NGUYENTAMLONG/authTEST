const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AccountSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("UserAccount", AccountSchema);
