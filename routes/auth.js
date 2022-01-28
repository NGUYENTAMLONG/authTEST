const express = require("express");
const jwt = require("jsonwebtoken");
const Account = require("../model/Auth");
const { getLogin, login, register, private } = require("../controller/auth");
const verify = require("../middlewares/jwt_verify");
const router = express.Router();
router.get("/", getLogin);
router.post("/login", login);
router.post("/register", register);
// private using local storage
router.get(
  "/private",
  verify,
  // async (req, res, next) => {
  //   // res.mess = { msg: "from middleware" };
  //   // res.json(req.cookies.token);
  //   //  Account.findById(verifyToken._id)
  //   //    .then((user) => {
  //   //      res._USER = user;
  //   //      next();
  //   //    })
  //   //    .catch((error) => console.log(error));
  //   try {
  //     const verifyToken = jwt.verify(
  //       req.cookies.token,
  //       process.env.TOKEN_SECRET
  //     );
  //     if (verifyToken) {
  //       // res.json(verifyToken);
  //       // res.userID = verifyToken._id;
  //       const user = await Account.findById(verifyToken._id);
  //       if (user) {
  //         res.json(user);
  //       }

  //       next();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     // res.json("Ban can dang nhap lai !!!");
  //     res.redirect("/auth");
  //   }
  // },
  private
);

module.exports = router;
