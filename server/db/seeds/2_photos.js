/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {


  await knex('photos').insert([
    {
      photoId: 1,
      photoName:
        'https://res.cloudinary.com/dqngoafsr/image/upload/v1686882899/the%20gap/IMG_0792_sruhbx.heic',
      albumId: 1,
    },
    {
      photoId: 2,
      photoName:
        'https://res.cloudinary.com/dqngoafsr/image/upload/v1686882900/the%20gap/IMG_0862_m13zhh.heic',
      albumId: 1,
    },
  ])
}
