
exports.up = function(knex) {
  return knex.schema.createTable("reviews", (table) => {
      table.increments("review_id").primary(); // sets review_id as primary key
      table.text("content");
      table.integer("score");
      table.integer('critic_id').notNullable().references('critic_id').inTable('critics').onDelete('CASCADE').index();
      table.integer('movie_id').notNullable().references('movie_id').inTable('movies').onDelete('CASCADE').index();
      table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("reviews");
};