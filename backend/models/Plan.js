import pool from '../config/database.js';

export const Plan = {
  async getAll() {
    const [rows] = await pool.execute('SELECT * FROM plans');
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.execute('SELECT * FROM plans WHERE id = ?', [id]);
    return rows[0];
  },

  async create({ name, type, price, ram, cpu, disk, bandwidth, location }) {
    const [result] = await pool.execute(
      'INSERT INTO plans (name, type, price, ram, cpu, disk, bandwidth, location) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, type, price, ram, cpu, disk, bandwidth, location]
    );
    return result.insertId;
  },

  async update(id, data) {
    const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(data), id];
    await pool.execute(`UPDATE plans SET ${fields} WHERE id = ?`, values);
  }
};
