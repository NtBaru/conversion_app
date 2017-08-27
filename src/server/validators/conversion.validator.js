const Joi = require('joi');

module.exports = {
    isValidToConversion: isValidToConversion,
    isValidAfterConversion: isValidAfterConversion
};

const schemaToConversion = Joi.object().keys({
    src_currency: Joi.string().required(),
    dest_currency: Joi.string().required(),
    src_amount: Joi.number().positive().precision(5).required()
}).with('src_currency', 'dest_currency', 'amount').without('dest_amount', 'amount_usd', 'converted_at');

const schemaAfterConversion = Joi.object().keys({
    src_currency: Joi.string().required(),
    dest_currency: Joi.string().required(),
    src_amount: Joi.number().positive().precision(5).required(),
    dest_amount: Joi.number().positive().precision(5).required(),
    amount_usd: Joi.number().positive().precision(5).required(),
    converted_at: Joi.date().timestamp().required()
}).with('src_currency', 'dest_currency', 'amount', 'dest_amount', 'amount_usd', 'converted_at');

function isValidToConversion (conversion) {
    return Joi.validate(conversion, schemaToConversion);
}

function isValidAfterConversion (conversion) {
    return Joi.validate(conversion, schemaAfterConversion);
}
