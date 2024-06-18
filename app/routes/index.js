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

  if (username == "Onoteacher" && password == "ice_number1") {
    res.render("teacher");
  } else {
    pool.query("USE chatapp");
    pool.query(
      'SELECT username FROM user WHERE username = "' +
        username +
        '" AND pass = "' +
        password +
        '";',
      function (err, result, fields) {
        if (
          err ||
          !result ||
          result.length == 0 ||
          result.affectedRows == 0 ||
          !result[0] ||
          !result[0].username ||
          result[0].username != username
        ) {
          flg = false;
          return;
        }
      }
    );

    res.render("students");
  }
});

module.exports = router;
