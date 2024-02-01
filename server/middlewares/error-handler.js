const { StatusCodes } = require("http-status-codes");

/**
 * Middleware to handle error thrown within the server as well as unexpected errors
 */
module.exports.errorHandlerMiddleware = async (err, req, res, next) => {
    /**
     * Custom error messages and status codes inialized
     */
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "Something went wrong, Please try again",
    };

    /**
     * Error response sent back to the client
     */
    return res
        .status(customError.statusCode)
        .json({ message: customError.message, status: false });
};
