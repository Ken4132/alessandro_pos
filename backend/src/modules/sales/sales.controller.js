const { pool } = require('../../config/db');

exports.createSale = async (req, res) => {
  const {
    cliente_id,
    usuario_id,
    total,
    tipo_pago
  } = req.body;

  try {

    const result = await pool.query(
      `INSERT INTO ventas
      (cliente_id, usuario_id, total, tipo_pago)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [cliente_id, usuario_id, total, tipo_pago]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSales = async (req, res) => {
  try {

    const result = await pool.query(`
      SELECT
        ventas.id,
        clientes.nombres,
        clientes.apellidos,
        ventas.total,
        ventas.tipo_pago,
        ventas.created_at

      FROM ventas

      INNER JOIN clientes
      ON ventas.cliente_id = clientes.id

      ORDER BY ventas.id DESC
    `);

    res.json(result.rows);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};