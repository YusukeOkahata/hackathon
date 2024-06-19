var express = require("express");
var router = express.Router();

const pool = require("../mysqlConnection");

/* GET users listing. */
router.get("/", (req, res, next) => {
  const query = "SELECT status FROM questions";
  // 初期化: '返信済' と '未返信' のカウント
  let repliedCount = 0;
  let unrepliedCount = 0;
  pool.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data: " + err.stack);
      return;
    }

    // 結果をループしてカウントする
    results.forEach((row) => {
      const status = row.status;

      if (status === "返信済") {
        repliedCount++;
      } else if (status === "未返信") {
        unrepliedCount++;
      }
    });

    // 結果を出力
    console.log("返信済:", repliedCount);
    console.log("未返信:", unrepliedCount);

    res.render("status", {
      repliedCount: repliedCount,
      unrepliedCount: unrepliedCount,
    });
  });
});

module.exports = router;
