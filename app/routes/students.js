var express = require("express");
var router = express.Router();

const pool = require("../mysqlConnection");

/* GET users listing. */
router.get("/", (req, res, next) => {
  pool.query("SELECT * from users;", (err, results, fields) => {
    if (err) {
      console.error("students.js: sql execute error");
    } else {
      console.log("students.js: sql execute success");
      console.log(`results :`, JSON.stringify(results));
    }
    //pool.end();
    //res.send(results);
  });
  //const username = req.session.username;
  res.render("students", { username: username });
});

module.exports = router;
