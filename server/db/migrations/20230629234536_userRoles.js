/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('userRoles', (table) => {
    table.increments('id').primary()
    table.string('role')
    table.integer('userId').unsigned()
    table.foreign('userId').references('user.id')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('userRoles')
}
