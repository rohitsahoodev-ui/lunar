import pool from '../config/database.js';

export const Node = {
  async getAll() {
    const [rows] = await pool.execute('SELECT * FROM nodes');
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.execute('SELECT * FROM nodes WHERE id = ?', [id]);
    return rows[0];
  },

  async create({ name, ip, location, cpu, ram, disk, bandwidth }) {
    const [result] = await pool.execute(
      'INSERT INTO nodes (name, ip, location, cpu, ram, disk, bandwidth) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, ip, location, cpu, ram, disk, bandwidth]
    );
    return result.insertId;
  },

  async update(id, data) {
    const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(data), id];
    await pool.execute(`UPDATE nodes SET ${fields} WHERE id = ?`, values);
  }
};
