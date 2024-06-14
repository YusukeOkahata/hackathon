const express = require("express");
const mysql = require('mysql');
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const PORT = 3040;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'ice_number1',
    password: '08311228', // 適切なパスワードに変更してください
    database: 'user_auth'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

app.use(express.static('public'))

app.get("/", (req,res) =>{
    res.sendFile(__dirname + "/index.html")
})

io.on("connection", (socket) =>{
    console.log("ユーザーが接続しました");
    socket.on("chat message", (msg) => {
        //console.log("massage:" + msg);
        io.emit("chat message", msg);
    });
})

server.listen(PORT, ()=>{
    console.log(`listening on ${PORT}`);
})