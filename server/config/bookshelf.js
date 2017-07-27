//db confix
var dbConfig = require(__dirname + '/db_config.json');

//configure knex instance
var knex = require('knex')(dbConfig);

//configure bookshelf
var Bookshelf = require('bookshelf')(knex);

module.exports = Bookshelf;