var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const db = require("../model/helper");
const { request } = require("../app");

router.use(bodyParser.json());
/* GET users listing. */
/*router.get("/", function (req, res, next) {
  res.send("this is Aimily");

});
*/
// GET users temporary function to see what's being added to database
const getUsers = async (req, res, next) => {
  try {
    const results = await db(`SELECT *FROM users ORDER BY id ASC;`);
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
};
router.get("/", getUsers);
// POST create user name
router.post("/", async (req, res, next) => {
  const { name, email } = req.body;
  try {
    await db(`insert into users (name, email) values ("${name}", "${email}");`);
    getUsers(req, res);
  } catch (err) {
    res.status(500).send(err);
  }
});

//POST create goal with deadline

//POST connect user and goal in database

//GET all info on specific user

module.exports = router;
