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

function getCurrencies(next) {
    Wreck.get(converterConfig.currencies, (err, res, payload) => {
        if (err) { return next(err); }

        var avaiableCurrencies = JSON.parse(payload);

        var currecies = Object.keys(avaiableCurrencies).map((shortcut) => {
            return {
                shortcut: shortcut,
                name: avaiableCurrencies[shortcut]
            }
        })

        return next(null, currecies);
    });
}