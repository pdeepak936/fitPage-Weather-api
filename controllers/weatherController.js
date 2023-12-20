const {
  getWeatherData,
  getWeatherDataHistory,
} = require("../services/externalApiService.js");
const LocationModel = require("../models/locationModel.js");
const WeatherDataModel = require("../models/weatherDataModel.js")

exports.getWeatherByLocationId = async (req, res) => {
  const { locationId } = req.params;

  try {
    const location = await LocationModel.findById(locationId);
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }

    const lat = location.latitude;
    const lon = location.longitude;

    const weatherData = await getWeatherData(lat, lon);

    // Save the weather data into a new collection or update an existing collection
    const savedWeatherData = await WeatherDataModel.create({
      locationId: locationId,
      data: weatherData,
      timestamp: new Date(),
    });

    res.status(200).send(savedWeatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

function getUnixTimestamp(daysAgo) {
  const currentDate = new Date();
  const timestamp = currentDate.getTime() - daysAgo * 24 * 60 * 60 * 1000;
  return Math.round(timestamp / 1000);
}

exports.weatherHistory = async (req, res) => {
  const { days, id } = req.query;

  if (!days || !id) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  let start, end;

  switch (parseInt(days)) {
    case 7:
      start = getUnixTimestamp(7);
      end = getUnixTimestamp(0);
      break;
    case 15:
      start = getUnixTimestamp(15);
      end = getUnixTimestamp(0);
      break;
    case 30:
      start = getUnixTimestamp(30);
      end = getUnixTimestamp(0);
      break;
    default:
      return res.status(400).json({ error: 'Invalid value for days parameter' });
  }

  try {
    const data = await LocationModel.findById(id);
    if (!data) {
      return res.status(404).json({ error: 'Location not found' });
    }

    const lat = data.latitude;
    const lon = data.longitude;
    const weatherDataHistory = await getWeatherDataHistory(lat, lon, start, end);
    res.json(weatherDataHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};