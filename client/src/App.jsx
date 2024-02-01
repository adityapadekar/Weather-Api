import React from "react";
import "./App.css";
import { Content } from "./components/Content";
import { Navbar } from "./components/Navbar";

function App() {
    return (
        <>
            <div className="w-full h-screen flex justify-center bg-gradient-to-b from-cyan-200 to-blue-100">
                <div className="flex flex-col items-center w-full lg:w-[1150px]">
                    <Navbar />
                    <Content />
                </div>
            </div>
        </>
    );
}

export default App;
