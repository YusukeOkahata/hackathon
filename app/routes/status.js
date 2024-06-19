var express = require("express");
var router = express.Router();

const pool = require("../mysqlConnection");

/* GET users listing. */
router.get("/", (req, res, next) => {
  const query = `
  SELECT q.status, u.username
  FROM questions q
  JOIN users u ON q.question_by = u.user_id
`;
  // 初期化: '返信済' と '未返信' のカウント,および未返信の `question_by` のリスト
  let repliedCount = 0;
  let unrepliedCount = 0;
  let unrepliedUsers = new Set();
  pool.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data: " + err.stack);
      return;
    }

    // 結果をループしてカウントする
    results.forEach((row) => {
      const status = row.status;
      const username = row.username;

      if (status === "返信済") {
        repliedCount++;
      } else if (status === "未返信") {
        unrepliedCount++;
        unrepliedUsers.add(username);
      }
    });

    // 結果を出力
    console.log("返信済:", repliedCount);
    console.log("未返信:", unrepliedCount);
    console.log("未返信のユーザーID:", Array.from(unrepliedUsers).join(", "));

    res.render("status", {
      repliedCount: repliedCount,
      unrepliedCount: unrepliedCount,
      unrepliedUsers: Array.from(unrepliedUsers),
    });
  });
});

module.exports = router;
