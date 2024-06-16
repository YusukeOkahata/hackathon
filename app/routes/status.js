var express = require("express");
var router = express.Router();

const pool = require("../mysqlConnection");

/* GET users listing. */
router.get("/", (req, res, next) => {
  pool.query("SELECT * from users;", (err, results, fields) => {
    if (err) {
      console.error("status.js: sql execute error");
    } else {
      console.log("status.js: sql execute success");
    }
    pool.end();
    //res.send(results);
  });

  res.render("status");
});

module.exports = router;
