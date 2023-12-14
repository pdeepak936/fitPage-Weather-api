const express = require('express');
const {
  getAllLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation,
} = require('../controllers/locationController.js');

const router = express.Router();

router.post('/getall-locations', getAllLocations);
router.post('/get-location/:locationId', getLocationById);
router.post('/createLocation', createLocation);
router.put('/updateLocation/:locationId', updateLocation);
router.delete('/deleteLocation/:locationId', deleteLocation);

module.exports = router;
