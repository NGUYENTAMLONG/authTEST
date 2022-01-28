const mongoose = require("mongoose");
const User = require("../model/User");
function connect() {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Connected to MongoDB !!!");
    })
    .catch((error) => console.log(error));
}
function autoCreate(length) {
  for (let i = 1; i <= length; i++) {
    User.create({
      username: `user${i}`,
      password: `1234567${i}`,
    });
  }
}
module.exports = { connect, autoCreate };
