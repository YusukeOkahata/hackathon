var express = require("express");
var router = express.Router();

const pool = require("../mysqlConnection");

/* GET users listing. */
/*router.get("/", (req, res, next) => {
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

router.post("/", (req, res, next) => {
  pool.query("SELECT * from questions;", (err, results, fields) => {
    if (err) {
      console.error("students.js: sql execute error");
    } else {
      console.log("students.js: sql execute success");
      console.log(`results :`, JSON.stringify(results));
    }
  });

  res.render("students", { username: username });
});
*/

// GET students page
router.get("/", (req, res, next) => {
  pool.query("SELECT * FROM messages ORDER BY created_at ASC", (err, results) => {
    if (err) {
      console.error("students.js: sql execute error");
      res.status(500).send("Database query error");
    } else {
      console.log("students.js: sql execute success");
      res.render("students", { messages: results });
    }
  });
});

// POST a new message
router.post("/message", (req, res, next) => {
  const { userId, message, sender } = req.body;
  pool.query(
    "INSERT INTO messages (user_id, message, sender) VALUES (?, ?, ?)",
    [userId, message, sender],
    (err, results) => {
      if (err) {
        console.error("students.js: sql insert error");
        res.status(500).send("Database insert error");
      } else {
        res.status(200).send("Message saved");
      }
    }
  );
});

module.exports = router;
