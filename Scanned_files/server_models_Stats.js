const mysql = require('mysql2');
const db = require('../db/config');

class Stats {
  static async findOne(where) {
    const [rows] = await db.execute(
      'SELECT * FROM user_stats WHERE ?',
      [where]
    );
    return rows[0];
  }

  static async updateOne(where, update, options = {}) {
    const stats = await this.findOne(where);
    
    if (!stats && options.upsert) {
      const [result] = await db.execute(
        'INSERT INTO user_stats SET ?',
        [{
          user_id: where.user,
          total_distance: update.$inc?.totalDistance || 0,
          total_duration: update.$inc?.totalDuration || 0,
          total_runs: update.$inc?.totalRuns || 0
        }]
      );
      return this.findOne({ id: result.insertId });
    }

    if (stats) {
      await db.execute(
        'UPDATE user_stats SET total_distance = total_distance + ?, total_duration = total_duration + ?, total_runs = total_runs + ? WHERE id = ?',
        [
          update.$inc?.totalDistance || 0,
          update.$inc?.totalDuration || 0,
          update.$inc?.totalRuns || 0,
          stats.id
        ]
      );
      return this.findOne({ id: stats.id });
    }

    return null;
  }
}

module.exports = Stats;