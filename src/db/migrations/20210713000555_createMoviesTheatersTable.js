
exports.up = function(knex) {
  return knex.schema.createTable("movies_theaters", (table) => {
      table.integer('movie_id').notNullable().references('movie_id').inTable('movies').onDelete('CASCADE').index();
      table.integer('theater_id').notNullable().references('theater_id').inTable('theaters').onDelete('CASCADE').index();
      table.boolean("is_showing");
      table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("movies_theaters");
};
