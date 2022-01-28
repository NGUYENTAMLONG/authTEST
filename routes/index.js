const express = require("express");
const authRouter = require("./auth");
const userRouter = require("./user");
const authorizationRouter = require("./authorization");
function route(app) {
  app.use("/api/user", userRouter);
  app.use("/auth", authRouter);
  app.use("/auth2", authorizationRouter);
}
module.exports = route;
