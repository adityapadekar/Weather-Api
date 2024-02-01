import React, { useState } from "react";
import axios from "axios";
import "./../App.css";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { ContentTable } from "./ContentTable";

export const Content = () => {
    const [cities, setCities] = useState("");
    const [weatherResults, setWeatherResults] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [warnMessage, setWarnMessage] = useState("");

    const getWeather = async () => {
        setErrorMessage("");
        setWarnMessage("");
        if (!cities || cities.trim() === "") {
            setWarnMessage("Please provide a city!");
            return;
        }

        try {
            const response = await axios.post(
                `https://weather-api-tawny-two.vercel.app/getWeather`,
                {
                    cities: cities.split(",").map((city) => city.trim()),
                }
            );

            if (response.status === 200) {
                const data = response.data;
                setData(data);
            } else {
                setErrorMessage(
                    "Error fetching weather data. Check spelling or try again"
                );
            }
        } catch (error) {
            const errorMessage = error.response?.data.message
                ? error.response.data.message
                : "Something went wrong! Please try again";
            setErrorMessage(errorMessage);
        }
    };

    const setData = (data) => {
        const result = { ...data.result, ...weatherResults };
        setWeatherResults(result);
        setCities("");
    };

    const clearData = () => {
        setWeatherResults({});
        setCities("");
        setErrorMessage("");
        setWarnMessage("");
    };

    return (
        <div className="flex flex-col justify-center w-full">
            <div className="flex flex-col justify-center items-center w-full mt-2 p-4">
                <TextField
                    id="outlined-basic"
                    label="Enter cities (comma-separated)"
                    variant="outlined"
                    value={cities}
                    onChange={(e) => setCities(e.target.value)}
                    className="w-full sm:w-[80%] md:w-[60%]"
                />
                <div className="p-2 w-full flex justify-center">
                    <ButtonGroup
                        variant="contained"
                        aria-label="outlined primary button group"
                    >
                        <Button
                            variant="contained"
                            color="success"
                            onClick={getWeather}
                        >
                            Get Weather
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={clearData}
                        >
                            Clear
                        </Button>
                    </ButtonGroup>
                </div>
                <div className="w-full mt-2 sm:w-[80%] md:w-[60%]">
                    {errorMessage && (
                        <Alert severity="error">{errorMessage}</Alert>
                    )}
                    {warnMessage && (
                        <Alert severity="warning">{warnMessage}</Alert>
                    )}
                </div>
            </div>
            <div className="flex justify-center items-center w-full mt-2 p-4">
                {Object.keys(weatherResults).length > 0 && (
                    <ContentTable data={weatherResults} />
                )}
            </div>
        </div>
    );
};
