var express = require("express");
var router = express.Router();
const pool = require("../mysqlConnection");

/* GET users listing. */
router.get("/", (req, res, next) => {
  pool.query("SELECT * from users;", (err, results, fields) => {
    if (err) {
      console.error("index.js: sql execute error");
    } else {
      console.log("index.js: sql execute success");
      console.log(`results :${results}`);
    }
    //pool.end();
    //res.send(results);
  });

  res.render("index");
});

router.post("/", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(`username:${username}`);
  console.log(`pass:${password}`);

  res.render("students");
});

module.exports = router;
