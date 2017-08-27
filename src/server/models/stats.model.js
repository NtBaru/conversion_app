const Bookshelf = require('../config/bookshelf.js');

module.exports = Bookshelf.Model.extend({
  tableName: 'stats'
});