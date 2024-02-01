const { StatusCodes } = require("http-status-codes");
const axios = require("axios");
const { InternalServerError, BadRequestError } = require("../errors");
const apiKey = process.env.OPENWEATHER_API_KEY;

/**
 * Controller to handle get weather requests
 *
 * It takes cities array in request body and returns the weather as object
 */
const getWeather = async (req, res) => {
    /**
     * If apiKey is missing throw error
     */
    if (!apiKey) {
        throw new InternalServerError(
            "Something went wrong! Please try again some time later"
        );
    }

    const { cities } = req.body;

    /**
     * If cities or in wrong format not provided throw an error
     */
    if (!cities || !Array.isArray(cities)) {
        throw new BadRequestError("Please provide cities");
    }

    try {
        const weatherData = {};

        /**
         * Get the weather data from thrid part api
         */
        for (const city of cities) {
            const response = await axios.get(
                `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
            );

            weatherData[city] = `${response.data.main.temp}°C`;
        }

        /**
         * Send response back to the client
         */
        res.status(StatusCodes.OK).json({
            message: "Weather fetched successfully!",
            status: true,
            result: weatherData,
        });
    } catch (error) {
        /**
         * Incase request fails, throw a internal server error
         */
        throw new InternalServerError(
            "Unable to fetch weather. Please verify the city name or try again later."
        );
    }
};

module.exports = {
    getWeather,
};
