const mysql = require('mysql2');
const db = require('../db/config');

class Run {
  static async create({ user, startLocation, startTime }) {
    const [result] = await db.execute(
      'INSERT INTO runs (user_id, start_location, start_time) VALUES (?, ?, ?)',
      [user, JSON.stringify(startLocation), startTime]
    );
    return { id: result.insertId, user, startLocation, startTime };
  }

  static async findById(id) {
    const [rows] = await db.execute(
      'SELECT * FROM runs WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async updateRoute(id, location) {
    const run = await this.findById(id);
    const route = JSON.parse(run.route || '[]');
    route.push(location);
    
    await db.execute(
      'UPDATE runs SET route = ? WHERE id = ?',
      [JSON.stringify(route), id]
    );
    return this.findById(id);
  }

  static async end(id, { endLocation, endTime, distance, duration }) {
    await db.execute(
      'UPDATE runs SET end_location = ?, end_time = ?, distance = ?, duration = ? WHERE id = ?',
      [JSON.stringify(endLocation), endTime, distance, duration, id]
    );
    return this.findById(id);
  }
}

module.exports = Run;