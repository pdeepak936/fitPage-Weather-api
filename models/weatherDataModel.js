const mongoose = require('mongoose');

const weatherDataSchema = new mongoose.Schema({
  locationId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Location', 
    required: true 
  },
  data: { 
    type: Object, 
    required: true 
  },
  timestamp: { 
    type: Date, 
    required: true 
  },
});

const WeatherDataModel = mongoose.model('WeatherData', weatherDataSchema);

module.exports = WeatherDataModel;