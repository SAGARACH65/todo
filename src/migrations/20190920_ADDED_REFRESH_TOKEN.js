exports.up = function (knex, Promise) {
  return knex.schema.table('users', function (t) {
    t.string('refreshToken').notNull().defaultTo('');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(t) {
      t.dropColumn('refreshToken');
  });
}
