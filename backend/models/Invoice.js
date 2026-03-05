import pool from '../config/database.js';

export const Invoice = {
  async getByUserId(userId) {
    const [rows] = await pool.execute('SELECT * FROM invoices WHERE user_id = ? ORDER BY created_at DESC', [userId]);
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.execute('SELECT * FROM invoices WHERE id = ?', [id]);
    return rows[0];
  },

  async create({ userId, amount, status = 'unpaid', description, dueDate }) {
    const [result] = await pool.execute(
      'INSERT INTO invoices (user_id, amount, status, description, due_date) VALUES (?, ?, ?, ?, ?)',
      [userId, amount, status, description, dueDate]
    );
    return result.insertId;
  },

  async updateStatus(id, status) {
    await pool.execute('UPDATE invoices SET status = ? WHERE id = ?', [status, id]);
  }
};
