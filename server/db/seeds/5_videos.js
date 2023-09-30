/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('videos').insert([
    {
      videoId: 1,
      videoTitle: 'Stony Bay Saddle, Pikimai Zig Zag Track',
      videoUrl: 'https://www.youtube.com/watch?v=Sk-cG15rmfE',
    },
    {
      videoId: 2,
      videoTitle: 'The Gap via Foggy Peak & Castle Hill Peak',
      videoUrl: 'https://www.youtube.com/watch?v=nqlxGWavRto',
    },
  ])
}
