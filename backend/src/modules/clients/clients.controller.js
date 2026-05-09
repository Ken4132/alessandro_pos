const { pool } = require('../../config/db');

exports.createClient = async (req, res) => {
  const { nombres, apellidos, dpi, telefono, direccion } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO clientes 
      (nombres, apellidos, dpi, telefono, direccion)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [nombres, apellidos, dpi, telefono, direccion]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getClients = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM clientes ORDER BY id DESC'
    );

    res.json(result.rows);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};