//db confix
const dbConfig = require(__dirname + '/db_config.json');

//configure knex instance
const knex = require('knex')(dbConfig);

//configure bookshelf
const Bookshelf = require('bookshelf')(knex);

module.exports = Bookshelf;