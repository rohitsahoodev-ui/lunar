import pool from '../config/database.js';

export const Message = {
  async getByUserId(userId) {
    const [rows] = await pool.execute('SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC', [userId]);
    return rows;
  },

  async create({ userId, title, message, type = 'info' }) {
    await pool.execute(
      'INSERT INTO notifications (user_id, title, message, type) VALUES (?, ?, ?, ?)',
      [userId, title, message, type]
    );
  },

  async markAsRead(id) {
    await pool.execute('UPDATE notifications SET is_read = 1 WHERE id = ?', [id]);
  }
};
