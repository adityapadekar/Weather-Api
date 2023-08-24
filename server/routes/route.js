const express = require("express");
const router = express.Router();
const { getWeather } = require("../controllers/getData");

router.route("/getWeather").post(getWeather);


// Checking

// router.route("/").get(async (req, res) => {
//     res.send("HIIII");
// });

module.exports = router;
