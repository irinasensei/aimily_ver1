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
// GET users temporary function to see what's being added to user database
const getUsers = async (req, res, next) => {
  try {
    const results = await db(`SELECT *FROM users ORDER BY id ASC;`);
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
};
router.get("/", getUsers);

// GET goals temporary function to see what's being added to goals database
const getGoals = async (req, res, next) => {
  try {
    const results = await db(`SELECT *FROM goals ORDER BY id ASC;`);
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
};
router.get("/goals", getGoals);

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

router.post("/goals", async (req, res, next) => {
  const { goal, deadline, description } = req.body;
  try {
    await db(
      `insert into goals (goal, deadline, description) values ("${goal}", "${deadline}", "${description}");`
    );
    getGoals(req, res);
  } catch (err) {
    res.status(500).send(err);
  }
});

//POST connect user and goal in database
//mysql> select users.name , goals.goal, goals.deadline, goals.description from users INNER JOIN goals ON users.id_goal=goals.id;

//GET all info on specific user
//mysql> select * from users_goals where name="Irina";
const getUserById = async (req, res, next) => {
  const { user_id } = req.params;
  try {
    await db(`SELECT *FROM users_goals where id="${user_id}";`);
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
};
router.get("/:id", getUserById);

module.exports = router;
