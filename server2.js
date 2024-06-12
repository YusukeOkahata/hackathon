const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const port = 3000;

// MySQLの設定
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password', // 適切なパスワードに変更してください
    database: 'user_auth'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// ミドルウェア
app.use(bodyParser.urlencoded({ extended: true }));

// 登録ページのルーティング
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'register.html'));
});

app.post('/register', (req, res) => {
    const userid = req.body.userid;
    const password = req.body.password;

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) throw err;

        const sql = 'INSERT INTO users (userid, password) VALUES (?, ?)';
        db.query(sql, [userid, hash], (err, result) => {
            if (err) {
                console.log(err);
                res.send('Error registering user');
            } else {
                res.send('User registered successfully');
            }
        });
    });
});

// ログインページのルーティング
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/login', (req, res) => {
    const userid = req.body.userid;
    const password = req.body.password;

    const sql = 'SELECT * FROM users WHERE userid = ?';
    db.query(sql, [userid], (err, result) => {
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
});

// students.htmlのルーティング
app.get('/students.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'students.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
