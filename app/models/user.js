// models/user.js

const pool = require('../mysqlConnection');

class User {
  static findByUsernameAndPassword(username, password) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
      pool.query(query, [username, password], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }
      });
    });
  }
}

module.exports = User;
