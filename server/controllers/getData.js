const axios = require("axios");

const apiKey = process.env.OPENWEATHER_API_KEY;

const getWeather = async (req, res) => {
    try {
        const { cities } = req.body;
        const weatherData = {};

        // const weatherData = { mumbai: "20C", pune: "22C", nashik: "30C" };
        // console.log(cities);

        for (const city of cities) {
            const response = await axios.get(
                `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
            );
            // console.log(response);

            weatherData[city] = `${response.data.main.temp}°C`;
        }

        res.status(200).json({ weather: weatherData });
    } catch (error) {
        res.status(500).json({
            error: "An error occurred while fetching weather data.",
        });
    }
};

module.exports = {
    getWeather,
};
