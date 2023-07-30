/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries

  await knex('userRoles').insert([
    { id: 1, role: 'admin', userId: 1 },
    { id: 2, role: 'member', userId: 1 },
  ])
}
