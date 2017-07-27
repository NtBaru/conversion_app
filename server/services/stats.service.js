const statsModel = require('../models/stats.model');

module.exports = {
    getStats: getStats
}

function getStats(next) {
    statsModel.forge().fetch().then(
        function (data) {
            return next(null, data);
        },
        function (error) {
            var err = new Error("Error during loading stats");
            err.code = 500;
            return next(err);
        }
    )
}
