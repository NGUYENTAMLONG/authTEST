const express = require("express");
// const { index, abc } = require("../controller/user");
const router = express.Router();
const userController = require("../controller/user");

router.get("/:id", userController.findById);
router.get("/", userController.index);

module.exports = router;
