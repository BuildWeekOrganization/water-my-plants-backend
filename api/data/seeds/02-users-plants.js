const users = [
  {
    username: 'foo',
    password: '1234',
    phone_num: '111-111-1111'
  },
  {
    username: 'bar',
    password: '5678',
    phone_num: '222-222-2222'
  },
]

const plants = [
  {
    nickname: 'Common Red Rose',
    species: 'Rosa',
    h2o_frequency: 3,
    image: 'https://www.gardeningknowhow.com/wp-content/uploads/2019/11/red-rose.jpg',
    // user_id: ,
  },
  {
    nickname: 'White Moth Orchid',
    species: 'Orchidaceae',
    h2o_frequency: 7,
    // user_id: ,
  },
  {
    nickname: 'Sunflower',
    species: 'Helianthus',
    h2o_frequency: 7,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Sunflower_sky_backdrop.jpg/1200px-Sunflower_sky_backdrop.jpg',
    // user_id: ,
  },
]

exports.seed = async function(knex) {
  await knex('users').insert(users)
  await knex('plants').insert(plants)
};
