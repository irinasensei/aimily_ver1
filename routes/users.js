var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const db = require("../model/helper");
const { request } = require("../app");

router.use(bodyParser.json());
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("this is Aimily");
});

// POST create user name
router.post("/", async (req, res, next) => {
  const { name, email } = req.body;
  await db(`insert into users (name, email) values ('${name}, '${email});`);
});

//POST create goal with deadline

//POST connect user and goal in database

//GET all info on specific user

module.exports = router;
