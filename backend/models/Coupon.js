import pool from '../config/database.js';

export const Coupon = {
  async getByCode(code) {
    const [rows] = await pool.execute('SELECT * FROM coupons WHERE code = ? AND active = 1', [code]);
    return rows[0];
  },

  async create({ code, discount, type = 'percentage', expiresAt }) {
    const [result] = await pool.execute(
      'INSERT INTO coupons (code, discount, type, expires_at) VALUES (?, ?, ?, ?)',
      [code, discount, type, expiresAt]
    );
    return result.insertId;
  },

  async deactivate(id) {
    await pool.execute('UPDATE coupons SET active = 0 WHERE id = ?', [id]);
  }
};
