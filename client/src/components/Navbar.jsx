import React from "react";
import weather from "../assets/weather.svg";

export const Navbar = () => {
    return (
        <>
            <div className="flex justify-center items-center mt-4 w-full py-2 px-4">
                <img src={weather} alt="" />
                <h1 className="">Weather App</h1>
            </div>
        </>
    );
};
