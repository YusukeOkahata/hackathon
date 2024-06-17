var express = require("express");
var router = express.Router();

const pool = require("../mysqlConnection");

/* GET users listing. */
router.get("/", (req, res, next) => {
  pool.query("SELECT * from users;", (err, results, fields) => {
    if (err) {
      console.error(`teacher.js: sql execute error:${err}`);
    } else {
      console.log("teacher.js: sql execute success");
    }
    pool.end();
    //res.send(results);
  });

  res.render("teacher");
});

module.exports = router;
