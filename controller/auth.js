const path = require("path");
const Account = require("../model/Auth");
const jwt = require("jsonwebtoken");
// const SECRET = "onepiece";
const dotenv = require("dotenv");
dotenv.config();
// require("../Pages/login.html")
class authController {
  getLogin(req, res, next) {
    res.sendFile(path.join(__dirname, "../Pages/login.html"));
  }
  login(req, res, next) {
    // res.json(req.body);
    const accountLogin = {
      username: req.body.username,
      password: req.body.password,
    };
    Account.findOne({
      username: accountLogin.username,
      password: accountLogin.password,
    })
      .then((account) => {
        if (!account) {
          res.json("Not Found Account !!!");
        } else {
          const token = jwt.sign(
            { _id: account._id },
            process.env.TOKEN_SECRET
            // { expiresIn: 10 }
          );
          res.json(token);
        }
      })
      .catch((error) => {
        res.json({ error });
        console.log(error);
      });
  }
  async register(req, res, next) {
    // res.json(req.body);
    try {
      const newAccount = await Account.create(req.body);
      if (!newAccount) {
        res
          .status(400)
          .json({ msg: "Something went wrong while create account!!" });
      }
      res.status(200).json({ msg: "Created successful!!", newAccount });
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }

    // try {
    //   const createdAccount = new Account(req.body);
    //   const newAccount = await createdAccount.save();
    //   if (!newAccount) {
    //     res
    //       .status(400)
    //       .json({ msg: "Something went wrong while create account!!" });
    //   }
    //   res.status(200).json({ msg: "Created successful!!", newAccount });
    // } catch (error) {
    //   console.log(error);
    //   res.status(400).json(error);
    // }
  }
  private(req, res, next) {
    // res.json(user);
    // Account.findById(res.userID)
    //   .then((user) => {
    //     res.json(user);
    //   })
    //   .catch((error) => console.log(error));
    res.send("<h1 style='color:blue'>CHAO MUNG</h1>");
  }
}
module.exports = new authController();
