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
console.log(results :, JSON.stringify(results));
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
console.log(results :, JSON.stringify(results));
}
});

res.render("students", { username: username });
});
*/

// GET students page
router.get("/", (req, res, next) => {
//
  if (!req.session.username) {
  res.redirect("/");
  return;
  }
//
  const userId = req.session.user_id;
  
  pool.query("SELECT * FROM messages WHERE user_id = ? ORDER BY created_at ASC", [userId], (err, results) => {
    if (err) {
      console.error("students.js: sql execute error");
      res.status(500).send("Database query error");
    } else {
      console.log("students.js: sql execute success");
      res.render("students", { messages: results, username: req.session.username });
    }
  });
});

// POST a new message
router.post("/message", (req, res, next) => {
//
  if (!req.session.username) {
    res.redirect("/");
    return;
  }
  //
  //const { userId, message, sender } = req.body;
  //
  const { message } = req.body;
  const username = req.session.username;
  //const userId = req.session.user_id; // セッションからuser_idを取得

  //if (!user_id) {
  //  res.status(403).send("Unauthorized");
  //  return;
  //}
  
  //
  /*
  pool.query(
    "INSERT INTO messages (user_id, message, sender) VALUES (?, ?, ?)",
    //[userId, message, sender],
    [username, message, sender],
    (err, results) => {
      if (err) {
        console.error("students.js: sql insert error", err);
        res.status(500).send("Database insert error：" + err.message);
      } else {
        res.status(200).send("Message saved");
      }
    }
  );
});
  */
 
  const getUserIdQuery = "SELECT user_id FROM users WHERE username = ?";
  
  pool.query(getUserIdQuery, [username], (err, results) => {
    if (err) {
      console.error("Error fetching user_id:", err.message);
      res.status(500).send("Database error: " + err.message);
      return;
    }

    if (results.length === 0) {
      res.status(404).send("User not found");
      return;
    }

    const userId = results[0].user_id;
    

  // メッセージを挿入するクエリ
  const insertMessageQuery = "INSERT INTO messages (user_id, message, sender) VALUES (?, ?, ?)";
  pool.query(insertMessageQuery, [userId, message, username], (err, results) => {
    if (err) {
      console.error("Error inserting message:", err.message);
      res.status(500).send("Error inserting message" + err.message);
    } else {
      res.status(200).send("Message saved");
    }
  });
});
});


module.exports = router;