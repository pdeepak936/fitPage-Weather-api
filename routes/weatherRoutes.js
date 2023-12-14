const express = require('express');
const { getWeatherByLocationId, weatherHistory } = require('../controllers/weatherController.js');

const router = express.Router();

router.get('/:locationId', getWeatherByLocationId);
router.post('/history', weatherHistory);

module.exports = router;
