const express = require("express");
const router = express.Router();
const { getWeather } = require("../controllers/get-weather");

/**
 * Post route to get the weather data from third party weather api
 */
router.route("/getWeather").post(getWeather);

module.exports = router;
