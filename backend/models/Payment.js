import pool from '../config/database.js';

export const Payment = {
  async getByInvoiceId(invoiceId) {
    const [rows] = await pool.execute('SELECT * FROM payments WHERE invoice_id = ?', [invoiceId]);
    return rows;
  },

  async create({ invoiceId, amount, method, transactionId, status = 'completed' }) {
    const [result] = await pool.execute(
      'INSERT INTO payments (invoice_id, amount, method, transaction_id, status) VALUES (?, ?, ?, ?, ?)',
      [invoiceId, amount, method, transactionId, status]
    );
    return result.insertId;
  }
};
