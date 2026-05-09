const { pool } = require('../../config/db');

exports.createPayment = async (req, res) => {

  const {
    credito_id,
    monto,
    metodo_pago,
    fecha_pago
  } = req.body;

  try {

    // guardar pago
    const paymentResult = await pool.query(
      `INSERT INTO pagos_credito
      (
        credito_id,
        monto,
        metodo_pago,
        fecha_pago
      )
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [
        credito_id,
        monto,
        metodo_pago,
        fecha_pago
      ]
    );

    // obtener saldo actual
    const creditResult = await pool.query(
      'SELECT saldo_pendiente FROM creditos WHERE id = $1',
      [credito_id]
    );

    const saldoActual = parseFloat(
      creditResult.rows[0].saldo_pendiente
    );

    const nuevoSaldo = saldoActual - parseFloat(monto);

    // actualizar saldo
    await pool.query(
      `UPDATE creditos
      SET saldo_pendiente = $1,
          estado = $2
      WHERE id = $3`,
      [
        nuevoSaldo <= 0 ? 0 : nuevoSaldo,
        nuevoSaldo <= 0 ? 'pagado' : 'activo',
        credito_id
      ]
    );

    res.status(201).json({
      message: 'Pago registrado',
      pago: paymentResult.rows[0],
      nuevoSaldo
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPayments = async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT
        pagos_credito.id,
        clientes.nombres,
        clientes.apellidos,
        pagos_credito.monto,
        pagos_credito.metodo_pago,
        pagos_credito.fecha_pago

      FROM pagos_credito

      INNER JOIN creditos
      ON pagos_credito.credito_id = creditos.id

      INNER JOIN ventas
      ON creditos.venta_id = ventas.id

      INNER JOIN clientes
      ON ventas.cliente_id = clientes.id

      ORDER BY pagos_credito.id DESC
    `);

    res.json(result.rows);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};