const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const PORT = 3040;

const mysql = require("mysql");

// MySQLの接続情報
// 環境変数を使用してDBにアクセスする
var connection = mysql.createConnection({
  host: "db",
  user: `${process.env.MYSQL_USER}`,
  password: `${process.env.MYSQL_PASSWORD}`,
  database: `${process.env.MYSQL_DATABASE}`,
});

// データベースに接続
connection.connect((err) => {
  if (err) {
    console.error("データベース接続に失敗しました: " + err.stack);
    return;
  }
  console.log("データベースに接続成功 ID: " + connection.threadId);
});

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("ユーザーが接続しました");
  socket.on("chat message", (msg) => {
    //console.log("massage:" + msg);
    io.emit("chat message", msg);
  });
});

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
