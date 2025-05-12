const express = require('express');
const router = express.Router();
const { getContainerTypes, calculateLoad, saveLoadPlan } = require('../controllers/loadCalculatorController');

// Get Container Types
router.get('/containers', getContainerTypes);

// Calculate Load
router.post('/calculate', calculateLoad);

// Save Load Plan (Optional)
router.post('/save', saveLoadPlan);

module.exports = router;
