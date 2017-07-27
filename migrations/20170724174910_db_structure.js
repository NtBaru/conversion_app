
exports.up = function(knex, Promise) {
  return knex
    .schema
    .createTable( 'conversion', function( conversion_table ) {
        conversion_table.increments();

        conversion_table.string( 'src_currency', 50 ).notNullable();
        conversion_table.string( 'dest_currency', 50 ).notNullable();
        conversion_table.float( 'amount' ).notNullable();
        conversion_table.float( 'amount_usd' ).notNullable();

        conversion_table.timestamp( 'converted_at' ).notNullable();

    } )
};

exports.down = function(knex, Promise) {
  return knex
      .schema
      .dropTableIfExists('conversion');
};
