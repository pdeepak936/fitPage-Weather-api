const express = require('express');
const {
  getAllLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation,
} = require('../controllers/locationController.js');

const router = express.Router();

router.get('/', getAllLocations);
router.get('/:locationId', getLocationById);
router.post('/', createLocation);
router.put('/:locationId', updateLocation);
router.delete('/:locationId', deleteLocation);

module.exports = router;
