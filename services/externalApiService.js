const axios = require("axios");

exports.getWeatherData = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.openWeatherMapApiKey}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

exports.getWeatherDataHistory = async (lat, lon, start, end) => {
  try {
    const response = await axios.get(
      `https://history.openweathermap.org/data/2.5/history/city?lat=${lat}&lon=${lon}&type=hour&start=${start}&end=${end}&appid=${process.env.openWeatherMapApiKey}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
