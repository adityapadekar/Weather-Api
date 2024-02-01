const { StatusCodes } = require("http-status-codes");

/**
 * Handles request made to the server with invalid routes
 */
module.exports.pageNotFound = async (req, res, next) => {
    res.status(StatusCodes.NOT_FOUND).json({
        message: "Route does not exist",
        status: false,
    });
};
