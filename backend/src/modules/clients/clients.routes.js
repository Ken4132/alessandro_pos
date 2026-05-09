const express = require('express');
const router = express.Router();

const clientsController = require('./clients.controller');

router.post('/', clientsController.createClient);
router.get('/', clientsController.getClients);

module.exports = router;