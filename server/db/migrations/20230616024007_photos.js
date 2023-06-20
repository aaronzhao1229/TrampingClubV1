/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('photos', (table) => {
    table.increments('photoId').primary()
    table.string('photoUrl')
    table.integer('albumId').unsigned()
    table.foreign('albumId').references('album.albumId')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('photos')
}
