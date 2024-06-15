const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const PORT = 3050;


// MySQLの設定
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

// ミドルウェア
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // publicディレクトリを静的ファイルのルートとして設定

// WebSocketの設定（socket.io）
//const http = require("http");
//const server2 = http.createServer(app);
//const io = require("socket.io")(server2);

//app.use(express.static('public'));

//app.get("/", (req, res) => {
//    res.sendFile(path.join(__dirname, "index.html"));
//});

//io.on("connection", (socket) => {
//    console.log("ユーザーが接続しました");
//    socket.on("chat message", (msg) => {
//        io.emit("chat message", msg);
//    });
//});

// 登録ページのルーティング
app.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','registration.html'));
});

app.post('/registration', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) throw err;

        const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.query(sql, [username, hash], (err, result) => {
            if (err) {
                console.log(err);
                res.send('Error registering user');
            } else {
                console.log('ユーザーが登録されました。')
                res.redirect('/index.html');
            }
        });
    });
});

// ログインページのルーティング
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username === 'Onoteacher' && password === 'ice_number1') {
        // 特定のユーザー名とパスワードの場合
        res.redirect('/teacher.html');
    } else {
        const sql = 'SELECT * FROM users WHERE username = ?';
        db.query(sql, [username], (err, result) => {
            if (err) throw err;

            if (result.length === 0) {
                res.send('No such user found');
            } else {
                bcrypt.compare(password, result[0].password, (err, isMatch) => {
                    if (err) throw err;

                    if (isMatch) {
                        res.redirect('/students.html');
                    } else {
                        res.send('Invalid credentials');
                    }
                });
            }
        });
    }
});

// teacher.htmlのルーティング
app.get('/teacher.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'teacher.html'));
});

// students.htmlのルーティング
app.get('/students.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'students.html'));
});

const http = require("http");
const server2 = http.createServer(app);
const io = require("socket.io")(server2);

io.on("connection", (socket) => {
    console.log("ユーザーが接続しました");
    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
    });
});

server2.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});
