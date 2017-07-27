
exports.up = function(knex, Promise) {
  return knex
    .schema
    .table( 'conversion', function( conversion_table ) {
        conversion_table.renameColumn( 'amount', 'src_amount' );
        conversion_table.float( 'dest_amount' ).notNullable();
    })
};

exports.down = function(knex, Promise) {
  return knex
    .schema
    .table( 'conversion', function( conversion_table ) {
        conversion_table.renameColumn( 'src_amount', 'amount' );
        conversion_table.dropColumn( 'dest_amount' );
    })
};
