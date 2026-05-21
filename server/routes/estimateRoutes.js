const express = require('express');
const router = express.Router();
const { getEstimate } = require('../controllers/estimateController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, getEstimate);

module.exports = router;