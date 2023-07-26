/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table('user', (table) => {
    table.string('resetPasswordToken')
    table.bigint('resetDate')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.table('user', (table) => {
    table.dropColumn('resetPasswordToken')
    table.dropColumn('resetDate')
  })
}
