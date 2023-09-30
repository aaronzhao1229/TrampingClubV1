/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries

  await knex('user').insert([
    {
      id: 1,
      username: 'test1234',
      password: '123456',
      email: 'test@test.email',
      refreshToken: 'abcdef',
    },
  ])
}
