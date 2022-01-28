const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Account = require("../model/Auth");

const router = express.Router();
dotenv.config();
router.get("/task", verifyToken, Authorization);

router.get("/student", (req, res, next) => {
  res.send("STUDENT");
});

router.get(
  "/teacher",
  (req, res, next) => {
    next();
  },
  (req, res, next) => {
    res.send("TEACHER");
  }
);

module.exports = router;
function verifyToken(req, res, next) {
  const tokenCookies = req.cookies.token;
  try {
    const tokenVerify = jwt.verify(tokenCookies, process.env.TOKEN_SECRET);
    Account.findOne({ _id: tokenVerify._id })
      .then((user) => {
        if (user) {
          req.user = user;
          next();
        }
      })
      .catch((error) => {
        console.log(error);
        res.json("khong tim thay nguoi dung");
      });
  } catch (error) {
    console.log(error);
    res.json({ msg: "Xac thuc khong thanh cong !!!" });
  }
}
function Authorization(req, res, next) {
  if (req.user.role === "student") {
    res.json("WELCOME");
  } else {
    res.redirect("/auth");
  }
}
