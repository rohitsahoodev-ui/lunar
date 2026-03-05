import pool from '../config/database.js';
import bcrypt from 'bcryptjs';

export const User = {
  async findByEmail(email) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },

  async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  },

  async create({ name, email, password, role = 'user' }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role]
    );
    return result.insertId;
  },

  async updateProfile(id, { name, email }) {
    await pool.execute('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
  }
};
