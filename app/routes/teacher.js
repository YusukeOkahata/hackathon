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
    //pool.end();
    //res.send(results);
  });

  res.render("teacher");
});
//
/* POST a new message */
router.post("/message", (req, res, next) => {
  if (!req.session.username) {
    res.status(403).send("Unauthorized");
    return;
  }

  const { message } = req.body;
  const username = req.session.username;
  pool.query(
    "INSERT INTO messages (user_id, message, sender) VALUES (?, ?, ?)",
    [username, message, "teacher"],
    (err, results) => {
      if (err) {
        console.error("teacher.js: sql insert error");
        res.status(500).send("Database insert error");
      } else {
        res.status(200).send("Message saved");
      }
    }
  );
});
//

module.exports = router;
