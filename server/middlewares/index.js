const { errorHandlerMiddleware } = require("./error-handler");
const { pageNotFound } = require("./page-not-found");

module.exports = {
    pageNotFound,
    errorHandlerMiddleware,
};
