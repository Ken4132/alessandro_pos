const express = require('express');
const router = express.Router();

const paymentsController = require('./payments.controller');

router.post('/', paymentsController.createPayment);
router.get('/', paymentsController.getPayments);

module.exports = router;