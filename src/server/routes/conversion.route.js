const conversionService = require('../services/conversion.service');

module.exports = function (server) {
    server.route({
        method: 'POST',
        path:'/conversion',
        handler: function (request, reply) {

            conversionService.convert(request.payload, (error, result) => {
                if (error) {
                    return reply({ error: error.message }).code(error.code);
                }
                return reply(result);
            });

        }
    });

    server.route({
        method: 'GET',
        path: '/conversion/currencies',
        handler: function (request, reply) {
            return conversionService.getCurrencies((error, result) => {
                if (error) {
                    return reply({ error: error }).code(500);
                }
                return reply(result);
            });
        }
    });
};