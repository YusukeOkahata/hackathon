var express = require("express");
var router = express.Router();

const pool = require("../mysqlConnection");

// テーブルの作成
const createTableQuery = `CREATE TABLE questions (
  question_id INT(11) NOT NULL AUTO_INCREMENT,
  question_by INT(11) NOT NULL,
  content TEXT NOT NULL,
  status TEXT NOT NULL,
  question_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (question_id)
  FOREIGN KEY (question_id) REFERENCES users(user_id)
);`;

/* GET users listing. */
router.get("/", (req, res, next) => {
  pool.query(createTableQuery, (err, result) => {
    if (err) throw err;
    console.log("'questions' Table created or verified successfully");
    pool.end();
  });
  pool.query("SELECT * from users;", (err, results, fields) => {
    if (err) {
      console.error("user.js: sql execute error");
    } else {
      console.log("user.js: sql execute success");
    }
    pool.end();
    //res.send(results);
  });
  pool.query("SELECT * from questions;", (err, results, fields) => {
    if (err) {
      console.error("user.js: sql execute error");
    } else {
      console.log("user.js: questions sql execute success");
    }
    pool.end();
    res.send(results);
  });
});

module.exports = router;
