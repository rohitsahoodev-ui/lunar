import pool from '../config/database.js';

export const Service = {
  async getByUserId(userId) {
    const [rows] = await pool.execute(
      'SELECT s.*, p.name as plan_name, p.type as plan_type FROM services s JOIN plans p ON s.plan_id = p.id WHERE s.user_id = ?',
      [userId]
    );
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.execute('SELECT * FROM services WHERE id = ?', [id]);
    return rows[0];
  },

  async create({ userId, planId, nodeId, status = 'pending', expiresAt }) {
    const [result] = await pool.execute(
      'INSERT INTO services (user_id, plan_id, node_id, status, expires_at) VALUES (?, ?, ?, ?, ?)',
      [userId, planId, nodeId, status, expiresAt]
    );
    return result.insertId;
  },

  async updateStatus(id, status) {
    await pool.execute('UPDATE services SET status = ? WHERE id = ?', [status, id]);
  }
};
