// const LocationModel =  require('../models/locationModel');

// exports.getAllLocations = async (req, res) => {
//   try {
//     const locations = await LocationModel.find();
//     res.status(200).json({status: true, data: locations});
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// exports.getLocationById = async (req, res) => {
//   const { locationId } = req.params;
//   try {
//     const location = await LocationModel.findById(locationId);
//     if (!location) {
//       return res.status(404).json({ error: 'Location not found' });
//     }
//     res.status(200).json({status: true, data: location});
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// exports.createLocation = async (req, res) => {
//   const { name, latitude, longitude } = req.body;
//   try {
//     const newLocation = await LocationModel.create({ name, latitude, longitude });
//     res.status(200).json({ status: true, data: newLocation });
//   } catch (error) {
//     if (error.name === 'ValidationError') {
//       // Handle validation error
//       const validationErrors = Object.values(error.errors).map((err) => err.message);
//       return res.status(400).json({ error: 'Validation error', details: validationErrors });
//     }
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };


// exports.updateLocation = async (req, res) => {
//   const { locationId } = req.params;
//   const { name, latitude, longitude } = req.body;
//   try {
//     const location = await LocationModel.findByIdAndUpdate(
//       locationId,
//       { name, latitude, longitude },
//       { new: true }
//     );
//     if (!location) {
//       return res.status(404).json({ error: 'Location not found' });
//     }
//     res.json(location);
//   } catch (error) {
//     res.status(400).json({ error: 'Invalid data' });
//   }
// };

// exports.deleteLocation = async (req, res) => {
//   const { locationId } = req.params;
//   try {
//     const location = await LocationModel.findByIdAndDelete(locationId);
//     if (!location) {
//       return res.status(404).json({ error: 'Location not found' });
//     }
//     res.json({ message: 'Location deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

const LocationModel = require('../models/locationModel');

exports.getAllLocations = async (req, res) => {
  try {
    const locations = await LocationModel.find();
    res.status(200).json({ status: true, data: locations });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getLocationById = async (req, res) => {
  const { locationId } = req.params;
  try {
    const location = await LocationModel.findById(locationId);
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }
    res.status(200).json({ status: true, data: location });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createLocation = async (req, res) => {
  const { name, latitude, longitude } = req.body;
  console.log(name,latitude,longitude);
  // Check if required fields are present
  if (!name || !latitude || !longitude) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newLocation = new LocationModel({ name, latitude, longitude });
    await newLocation.save();
    res.status(200).json({ status: true, data: newLocation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.updateLocation = async (req, res) => {
  const { locationId } = req.params;
  const { name, latitude, longitude } = req.body;
  try {
    const location = await LocationModel.findByIdAndUpdate(
      locationId,
      { name, latitude, longitude },
      { new: true }
    );
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }
    res.json(location);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteLocation = async (req, res) => {
  const { locationId } = req.params;
  try {
    const location = await LocationModel.findByIdAndDelete(locationId);
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }
    res.json({ message: 'Location deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
