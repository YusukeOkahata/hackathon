// models/message.js

const pool = require('../mysqlConnection');

class Message {
  static getAllMessagesByUserId(userId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM messages WHERE user_id = ? ORDER BY created_at ASC';
      pool.query(query, [userId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  static saveMessage(userId, message, sender) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO messages (user_id, message, sender) VALUES (?, ?, ?)';
      pool.query(query, [userId, message, sender], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

module.exports = Message;
