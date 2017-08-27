import Hapi from 'hapi';
import webpack from 'webpack';
import inert from 'inert';
import config from '../../webpack.config.dev';
import HapiWebpackPlugin from 'hapi-webpack-plugin';

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

const compiler = webpack(config);
const hot = {};
const assets = {
  noInfo: true,
  publicPath: config.output.publicPath
};

server.register([
    inert,
    {
      register: HapiWebpackPlugin,
      options: {compiler, assets, hot}
    }], (err) => {

    if (err) {
        throw err;
    }

    require('./routes/conversion.route')(server);
    require('./routes/stats.route')(server);
    server.route({
        method: 'GET',
        path: '/{path*}',
        handler: function (request, reply) {
            reply.file('src/client/index.html');
        }
    });

    // Start the server
    server.start((err) => {

        if (err) {
            throw err;
        }
        /* eslint-disable no-console */
        console.log('Server running at:', server.info.uri);
    });
});