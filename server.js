const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const passport = require("passport");
const ejs = require("ejs");
const AccountModel = require("./model/AccountModel");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
dotenv.config();
var cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
//server uses cookie
app.use(cookieParser());

// server uses JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
// require("./public/index.html")
app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
app.use("/", express.static(path.join(__dirname, "public")));
//connect to mongodb
const mongodb = require("./Database/mongodb");
mongodb.connect();
// mongodb.autoCreate(20);

// PASSPORT STRAGY
// set the view engine to ejs
app.set("view engine", "ejs");
app.get("/login", (req, res, next) => {
  // path.join(__dirname, "Pages/login.ejs");
  res.render("login");
});
passport.use(
  new LocalStrategy(function (username, password, done) {
    AccountModel.findOne({ username: username, password: password })
      .then((data) => {
        if (!data) {
          done(null, false);
        }
        done(null, data);
      })
      .catch((error) => done(error));
  })
);
app.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user) {
    if (err) {
      console.log(err);
      return res.status(500).json("Loi server");
    }
    if (!user) {
      return res.status(401).json("Account is Invalid !!!");
    }
    jwt.sign(user.toObject(), process.env.TOKEN_SECRET, function (err, token) {
      if (err) {
        res.status(500).json("LOI SERVER");
      }
      return res.json(token);
    });
    // const token = jwt.sign(user.toObject(), process.env.TOKEN_SECRET);

    // res.json(token);
  })(req, res, next);
});
app.get(
  "/data",
  async (req, res, next) => {
    // const token = req.body.token;
    const token = req.headers.authorization;
    console.log(token);

    try {
      const verifyToken = await jwt.verify(token, process.env.TOKEN_SECRET);
      if (!verifyToken) {
        res.status(401).json("token is invalid !!!");
      }
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json("token khong hop le");
    }
  },
  (req, res, next) => {
    res.json("DATA IS HERE :>");
  }
);
// config route for app
const route = require("./routes/index");
route(app);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT} ^^ !!!`);
});
