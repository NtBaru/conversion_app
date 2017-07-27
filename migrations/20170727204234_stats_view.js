
exports.up = function(knex, Promise) {
  return knex.raw(
    "CREATE OR REPLACE VIEW stats AS " +
    "select" +
    "	(select sum(amount_usd)) AS total_amount," +
    "	(select count(id)) AS total_transfers," +
    "	(select c.dest_currency from public.conversion c GROUP BY c.dest_currency ORDER BY count(*) DESC LIMIT 1) AS top_currency" +
    "FROM public.conversion"
  )
};

exports.down = function(knex, Promise) {
  return knex.raw(
    "DROP VIEW stats"
  )
};
