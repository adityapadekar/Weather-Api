require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");

const router = require("./routes/route");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", router);

const port = process.env.PORT || 8080;

const startServer = async () => {
    try {
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

startServer();