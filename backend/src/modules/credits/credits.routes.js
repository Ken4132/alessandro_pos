const express = require('express');
const router = express.Router();

const creditsController = require('./credits.controller');

router.post('/', creditsController.createCredit);
router.get('/', creditsController.getCredits);
router.get('/late', creditsController.getLateCredits);
router.get('/stats/dashboard', creditsController.getDashboardStats);

module.exports = router;