const mysql = require('mysql');
//const fs = require('fs');

// MySQLの設定
const db = mysql.createConnection({
    host: 'localhost',
    user: 'ice_number1',
    password: '08311228', // 適切なパスワードに変更してください
});

// SQLスクリプトを読み込む
//const sql = fs.readFileSync('setup.sql', 'utf-8');

// 接続してスクリプトを実行
//db.connect(err => {
//    if (err) throw err;
//    console.log('MySQL Connected...');

//    db.query(sql, (err, result) => {
//        if (err) throw err;
//        console.log('Database and table created or verified successfully');
//        db.end();
//    });
//});

// 接続してデータベースとテーブルを作成
db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');

    // データベースの作成
    db.query('CREATE DATABASE IF NOT EXISTS user_auth', (err, result) => {
        if (err) throw err;
        console.log('Database created or verified successfully');

        // データベースを使用
        db.changeUser({ database: 'user_auth' }, (err) => {
            if (err) throw err;

            // テーブルの作成
            const createTableQuery = `
                CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    username VARCHAR(255) NOT NULL UNIQUE,
                    password VARCHAR(255) NOT NULL
                )
            `;
            db.query(createTableQuery, (err, result) => {
                if (err) throw err;
                console.log('Table created or verified successfully');
                db.end();
            });
        });
    });
});

