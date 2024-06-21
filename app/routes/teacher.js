var express = require("express");
var router = express.Router();

const pool = require("../mysqlConnection");

/* GET users listing. */
/*
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

  //res.render("teacher", { username: req.session.username });
});
//
*/

router.get("/", (req, res) => {
  const username = req.session.username;
  const password = req.session.password;

  if (!username || !password) {
    console.log("No username or password in session");
    return res.redirect("/");
  }

  pool.query(
    "SELECT user_id FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, results) => {
      //if (err) throw err;
      if (err) {
        console.error(`GET /teacher: Error querying user_id: ${err.message}`);
        return res.status(500).send("Database error");
      }

      if (results.length > 0) {
        const userId = results[0].user_id;

        pool.query(
          "SELECT * FROM messages WHERE user_id = ? ORDER BY created_at ASC",
          [userId],
          (err, messages) => {
            //if (err) throw err;
            if (err) {
              console.error(`GET /teacher: Error querying messages: ${err.message}`);
              return res.status(500).send("Database error");
            }

            console.log('GET /teacher: Messages fetched:', messages);

            res.render("teacher", { username: username, messages: messages });
          }
        );
      } else {
        console.log("No matching user found");
        res.redirect("/");
      }
    }
  );
});


/* POST a new message */
/*
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
*/

// メッセージ送信
router.post("/send", (req, res) => {
  const username = req.session.username;
  const password = req.session.password;
  const message = req.body.message;

  if (!username || !password) {
    return res.redirect("/");
  }

  pool.query(
    "SELECT user_id FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, results) => {
      if (err) throw err;

      if (results.length > 0) {
        const userId = results[0].user_id;

        pool.query(
          "INSERT INTO messages (user_id, message, sender) VALUES (?, ?, ?)",
          [userId, message, username],
          (err) => {
            if (err) throw err;

            res.redirect("/teacher");
          }
        );
      } else {
        res.redirect("/");
      }
    }
  );
});


module.exports = router;
