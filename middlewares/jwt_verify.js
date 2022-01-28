const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
module.exports = function Verify(req, res, next) {
  try {
    const token = req.cookies.token;
    const findUser = jwt.verify(token, process.env.TOKEN_SECRET);
    if (findUser) {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ mag: "Dang nhap lai di ma =((((" });
  }
};
