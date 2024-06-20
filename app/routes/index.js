var express = require("express");
var router = express.Router();
const pool = require("../mysqlConnection");

/* GET users listing. */
router.get("/", (req, res, next) => {
  pool.query("SELECT * from users;", (err, results, fields) => {
    if (err) {
      console.error("index.js: sql execute error");
      res.render("index", { error: "Error fetching users", route: null });
    } else {
      console.log("index.js: sql execute success");
      //resultを文字列(json)形式で表示
      //console.log(`results :`, JSON.stringify(results));
      res.render("index", { error: null, route: null });
    }
    //pool.end();
    //res.send(results);
  });

  //res.render("index", { error: null, route: null });
});

router.post("/", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(`username:${username}`);
  console.log(`pass:${password}`);

  if (username == "Onoteacher" && password == "ice_number1") {
    res.render("teacher", { username: username });
    return;
  }
  const sql = "SELECT * FROM users WHERE username = ?";
  pool.query(sql, [username], (err, results) => {
    if (err) {
      res.render("index", { error: "Error during login", route: null });
    } else if (results.length === 0) {
      res.render("index", { error: "User Not Found", route: null });
    } else {
      const user = results[0];
      // パスワードの文字列比較
      if (password !== user.password) {
        res.render("index", { error: "Invalid password", route: null });
      } else {
        // ユーザーが正しく認証された場合、セッションにユーザー情報を保存する
        req.session.username = username;
        req.session.user_id = user.user_id; // もしくは必要な情報をセッションに保存

        res.redirect("/students");
        //res.render("students", {
        //  error: null,
        //  route: "/students",
        //  username: username,
        //});
      }
    }

    //const user = results[0];
    //// パスワードの文字列比較
    //if (password !== user.password) {
    //  res.render("index", { error: "Invalid password", route: null });
    //}

    /*パスワードハッシュ化の場合
      const user = results[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).send("Invalid password");
      }
      */
    // ユーザーが正しく認証された場合、セッションにユーザー情報を保存する
    //req.session.username = username;
    /*
      res.render("students", {
        error: null,
        route: "/students",
        username: username,
      });
      */
  });
});

module.exports = router;
