/*******************************************************************************
 * Server Setup
 ******************************************************************************/
require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { pageNotFound, errorHandlerMiddleware } = require("./middlewares");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

/*******************************************************************************
 * Testing Get Route
 ******************************************************************************/
app.get("/", (req, res) => {
    res.send("Server!");
});

/*******************************************************************************
 * HandleRouting
 ******************************************************************************/
const router = require("./routes/route");
app.use("/", router);

/*******************************************************************************
 * Manage Unexpected Errors
 ******************************************************************************/
app.use(pageNotFound);
app.use(errorHandlerMiddleware);

/*******************************************************************************
 * Export App
 ******************************************************************************/
module.exports = app;
