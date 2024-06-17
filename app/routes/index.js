var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
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
  //console.log(`username:${username}`);
  //console.log(`pass:${password}`);

  if (username === "Onoteacher" && password === "ice_number1") {
    // 特定のユーザー名とパスワードの場合
    res.render("teacher");
  } else {
    const sql = "SELECT * FROM users WHERE username = ?";
    pool.query(sql, [username], (err, result) => {
      if (err) throw err;

      if (result.length === 0) {
        res.send("No such user found");
      } else {
        bcrypt.compare(password, result[0].password, (err, isMatch) => {
          if (err) throw err;

          if (isMatch) {
            res.render("students");
          } else {
            res.send("Invalid credentials");
          }
        });
      }
    });
  }
  //res.render("students");
});

module.exports = router;
