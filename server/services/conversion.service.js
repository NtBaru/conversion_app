const Wreck = require('wreck');
const conversionValidator = require('../validators/conversion.validator')
const conversionModel = require('../models/conversion.model');
const converterConfig = require('../config/converter_config.json');

module.exports = {
    convert: convert,
    getCurrencies: getCurrencies
}

function convert(conversion, next) {
    if (conversionValidator.isValidToConversion(conversion).error === null){

        const exchangeRatesRoute = converterConfig.latest+'?app_id='+converterConfig.app_id;
        Wreck.get(exchangeRatesRoute, (err, res, payload) => {
            if (err) { return next(err); }

            var exchange_rates = JSON.parse(payload);
            var src_to_base = exchange_rates.rates[conversion.src_currency];
            var base_to_dest = exchange_rates.rates[conversion.dest_currency];
            var base_to_USD = exchange_rates.rates['USD'];

            conversion.amount_usd = conversion.src_amount/src_to_base*base_to_USD;
            conversion.dest_amount = conversion.src_amount/src_to_base*base_to_dest;
            conversion.converted_at = new Date();

            if (conversionValidator.isValidAfterConversion(conversion).error === null){

                new conversionModel(conversion).save().then(
                    function (data) {
                        return next(null, data);
                    },
                    function (error) {
                        var err = new Error("Conversion was not proceed properly");
                        err.code = 500;
                        return next(err);
                    }
                )

            }
            else {
                var err = new Error("Conversion was not proceed properly");
                err.code = 500;
                return next(err);
            }

        })
    }
    else {
        var err = new Error("Oops, wrong attributes");
        err.code = 400;
        return next(err);
    }
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