/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries

  await knex('programmes').insert([
    {
      programmeId: 1,
      programmeCategory: 'tramp',
      fileName:
        'd4abb5d40cab2eced7fab306461d61fa4b4c7c6a543e5b4bcc1254ea4cb7156a',
      title:
        'Lambda tramping programme from 8th October 2023 to 24th March 2024',
    },
    {
      programmeId: 2,
      programmeCategory: 'walk',
      fileName:
        'b370a84cbb4c604b8bce9c77c4a515228b00894225f2c3e6f3ea48c13e63fd4f',
      title:
        'Lambda latte walks programme from 1st October 2023 to 13th March 2024',
    },
  ])
}
