/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('album').del()
  await knex('album').insert([
    { albumId: 1, albumName: 'The Gap', tripDate: '2023-04-18' },
  ])
}
