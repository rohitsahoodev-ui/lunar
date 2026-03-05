import pool from '../config/database.js';

export const Ticket = {
  async getByUserId(userId) {
    const [rows] = await pool.execute('SELECT * FROM tickets WHERE user_id = ? ORDER BY updated_at DESC', [userId]);
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.execute('SELECT * FROM tickets WHERE id = ?', [id]);
    return rows[0];
  },

  async create({ userId, subject, category, priority, status = 'open' }) {
    const [result] = await pool.execute(
      'INSERT INTO tickets (user_id, subject, category, priority, status) VALUES (?, ?, ?, ?, ?)',
      [userId, subject, category, priority, status]
    );
    return result.insertId;
  },

  async addMessage({ ticketId, userId, message, isAdmin = false }) {
    await pool.execute(
      'INSERT INTO ticket_messages (ticket_id, user_id, message, is_admin) VALUES (?, ?, ?, ?)',
      [ticketId, userId, message, isAdmin]
    );
    await pool.execute('UPDATE tickets SET updated_at = CURRENT_TIMESTAMP WHERE id = ?', [ticketId]);
  },

  async getMessages(ticketId) {
    const [rows] = await pool.execute(
      'SELECT tm.*, u.name as user_name FROM ticket_messages tm JOIN users u ON tm.user_id = u.id WHERE tm.ticket_id = ? ORDER BY tm.created_at ASC',
      [ticketId]
    );
    return rows;
  }
};
