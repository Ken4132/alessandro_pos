const express = require('express');
const router = express.Router();

const salesController = require('./sales.controller');

router.post('/', salesController.createSale);
router.get('/', salesController.getSales);

module.exports = router;