const mysql = require('mysql2');
const db = require('../db/config');

class User {
  static async create({ name, email, password }) {
    const [result] = await db.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );
    return { id: result.insertId, name, email };
  }

  static async findOne(where) {
    const [rows] = await db.execute(
      'SELECT * FROM users WHERE ?',
      [where]
    );
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await db.execute(
      'SELECT id, name, email FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async findByIdAndUpdate(id, update) {
    const [result] = await db.execute(
      'UPDATE users SET ? WHERE id = ?',
      [update, id]
    );
    if (result.affectedRows === 0) return null;
    return this.findById(id);
  }
}

module.exports = User;