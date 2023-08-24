import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { Button, Table } from "react-bootstrap";

function App() {
    const [cities, setCities] = useState("");
    const [weatherResults, setWeatherResults] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    const getWeather = async () => {
        // console.log("HIIII");
        try {
            const data = cities.split(",").map((city) => city.trim());
            console.log(data);
            const response = await axios.post(
                "http://localhost:8080/getWeather",
                {
                    cities: cities.split(",").map((city) => city.trim()),
                }
            );

            if (response.status === 200) {
                const data = response.data;
                setData(data);
                setErrorMessage("");
            } else {
                // setWeatherResults({});
                setErrorMessage(
                    "Error fetching weather data. Check spelling or try again"
                );
            }
        } catch (error) {
            console.error(error);
            // setWeatherResults({});
            setErrorMessage(
                "Error fetching weather data. Check spelling or try again"
            );
        }
    };

    const setData = (data) => {
        const result = { ...weatherResults, ...data.weather };
        setWeatherResults(result);
        setCities("");
    };

    const clearData = () => {
        setWeatherResults({});
        setCities("");
    };

    return (
        <div className="App">
            <div className="title">
                <h1 className="title-head">Weather App</h1>
            </div>
            <div className="input">
                <label className="input-label">
                    Enter city names(comma-separated) :
                </label>
                <input
                    type="text"
                    id="cityInput"
                    value={cities}
                    onChange={(e) => setCities(e.target.value)}
                    className="input-box"
                />
                <div className="btn-box">
                    <Button
                        variant="primary"
                        onClick={getWeather}
                        className="btn"
                    >
                        Get Weather
                    </Button>
                    <Button
                        variant="danger"
                        onClick={clearData}
                        className="btn"
                    >
                        Clear
                    </Button>
                </div>
            </div>
            <div className="result">
                {errorMessage && <p>{errorMessage}</p>}
                {Object.keys(weatherResults).length > 0 && (
                    <>
                        <div className="result-sub">
                            <div className="result-main">
                                <h3>Weather Results</h3>
                            </div>
                            <div>
                                <Table
                                    striped
                                    bordered
                                    hover
                                    variant="light"
                                    size="sm"
                                >
                                    <thead>
                                        <tr>
                                            <th>Sr.</th>
                                            <th>City</th>
                                            <th>Temperature</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(weatherResults).map(
                                            ([city, temperature], index) => (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        {city
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                            city.slice(1)}
                                                    </td>
                                                    <td>{temperature}</td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
