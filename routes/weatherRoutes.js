const express = require('express');
const { getWeatherByLocationId, weatherHistory } = require('../controllers/weatherController.js');

const router = express.Router();

router.post('/getweather/:locationId', getWeatherByLocationId);
router.post('/getweather', weatherHistory);

module.exports = router;
