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
    pool.end();
    //res.send(results);
  });

  res.render("index");
});

module.exports = router;
