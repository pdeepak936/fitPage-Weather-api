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

    res.json(savedWeatherData);
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
  const { days, id } = req.body;

  const start = getUnixTimestamp(days);
  const end = getUnixTimestamp(0);

  try {
    const location = await LocationModel.findById(id);
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }

    const lat = location.latitude;
    const lon = location.longitude;

    const weatherDataHistory = await getWeatherDataHistory(lat, lon, start, end);

    // Save the historical weather data into a new collection
    const savedWeatherHistory = await WeatherHistoryModel.create({
      locationId: id,
      data: weatherDataHistory,
      timestamp: new Date(),
    });

    res.json(savedWeatherHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error", error });
  }
};