exports.seed = async (knex) => {
  await knex('programmes').del()
  await knex('videos').del()
  await knex('photos').del()
  await knex('album').del()
  await knex('userRoles').del()
  await knex('user').del()
}
