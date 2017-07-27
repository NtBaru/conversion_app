var statsService = require('../services/stats.service');

module.exports = function (server) {
    server.route({
        method: 'GET',
        path:'/stats',
        handler: function (request, reply) {

            statsService.getStats((error, result) => {
                if (error) {
                    return reply({ error: error.message }).code(error.code);
                }
                return reply(result);
            })
        }
    });
}