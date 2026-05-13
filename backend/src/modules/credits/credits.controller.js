const { pool } = require('../../config/db');

exports.createCredit = async (req, res) => {

  const {
    venta_id,
    monto_total,
    cuotas,
    interes,
    fecha_inicio,
    fecha_fin
  } = req.body;

  try {

    const result = await pool.query(
      `INSERT INTO creditos
      (
        venta_id,
        monto_total,
        saldo_pendiente,
        cuotas,
        interes,
        fecha_inicio,
        fecha_fin
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [
        venta_id,
        monto_total,
        monto_total,
        cuotas,
        interes,
        fecha_inicio,
        fecha_fin
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCredits = async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT
        creditos.id,
        clientes.nombres,
        clientes.apellidos,
        creditos.monto_total,
        creditos.saldo_pendiente,
        creditos.estado

      FROM creditos

      INNER JOIN ventas
      ON creditos.venta_id = ventas.id

      INNER JOIN clientes
      ON ventas.cliente_id = clientes.id

      ORDER BY creditos.id DESC
    `);

    res.json(result.rows);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLateCredits = async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT
        creditos.id,
        clientes.nombres,
        clientes.apellidos,
        clientes.telefono,
        creditos.saldo_pendiente,
        creditos.proximo_pago,

        CURRENT_DATE - creditos.proximo_pago
        AS dias_atraso

      FROM creditos

      INNER JOIN ventas
      ON creditos.venta_id = ventas.id

      INNER JOIN clientes
      ON ventas.cliente_id = clientes.id

      WHERE
        creditos.estado = 'activo'
        AND creditos.proximo_pago < CURRENT_DATE

      ORDER BY dias_atraso DESC
    `);

    res.json(result.rows);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getDashboardStats = async (req, res) => {

  try {

    const totalClientes = await pool.query(
      'SELECT COUNT(*) FROM clientes'
    );

    const totalCreditos = await pool.query(
      `SELECT COUNT(*) 
       FROM creditos
       WHERE estado = 'activo'`
    );

    const totalMorosos = await pool.query(
      `SELECT COUNT(*)
       FROM creditos
       WHERE estado = 'activo'
       AND proximo_pago < CURRENT_DATE`
    );

    const saldoPendiente = await pool.query(
      `SELECT COALESCE(
          SUM(saldo_pendiente), 0
       ) AS total
       FROM creditos
       WHERE estado = 'activo'`
    );

    res.json({

      clientes:
        totalClientes.rows[0].count,

      creditos:
        totalCreditos.rows[0].count,

      morosos:
        totalMorosos.rows[0].count,

      saldoPendiente:
        saldoPendiente.rows[0].total

    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });
  }
};