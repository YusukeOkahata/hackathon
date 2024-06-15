const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const PORT = 3060;

const mysql = require("mysql2");

// MySQLの接続情報
/*
const connection = mysql.createConnection({
  host: "db", // Docker ComposeでMySQLを起動している場合、'localhost'ではなくコンテナ名（ここでは'mysql'）を使用します
  user: "jolly",
  password: "chatpass",
  database: "mydatabase",
});

// データベースに接続
connection.connect((err) => {
  if (err) {
    console.error("データベース接続に失敗しました: " + err.stack);
    return;
  }
  console.log("データベースに接続成功 ID: " + connection.threadId);
});
*/

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
