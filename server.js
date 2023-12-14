const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const cors = require('cors');
const morgan = require("morgan");
const mongoose = require('mongoose');
const router = express.Router();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));

mongoose.connect(process.env.MONGOOSE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Successfully Connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Real-time Weather Forecast API');
});

// Routes
const locationRoutes = require('./routes/locationRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
app.use('/locations', locationRoutes);
app.use('/weather', weatherRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
