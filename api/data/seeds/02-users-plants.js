const users = [
  {
    username: 'admin',
    password: '$2a$08$C0cPFWWn5qyvP7oyqFmvr.e9iPwfxvXSDWUSNwWtIpgLUzmzHTy7u',
    phone_num: '111-111-1111'
  },
  {
    username: 'matt',
    password: '$2a$08$2RQslbhtstf6Sc8/fXDNXer0beNwrxpMS2Wj9786Sr4k0jEmcIBke',
    phone_num: '222-222-2222'
  },
]

const plants = [
  {
    nickname: 'White Moth Orchid',
    species: 'Orchidaceae',
    h2o_frequency: 7,
    user_id: 1,
  },
  {
    nickname: 'Sunflower',
    species: 'Helianthus',
    h2o_frequency: 7,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Sunflower_sky_backdrop.jpg/1200px-Sunflower_sky_backdrop.jpg',
    user_id: 1,
  },
  {
    nickname: 'Common Red Rose',
    species: 'Rosa',
    h2o_frequency: 3,
    image: 'https://www.gardeningknowhow.com/wp-content/uploads/2019/11/red-rose.jpg',
    user_id: 2,
  },
]

exports.seed = async function(knex) {
  await knex('users').insert(users)
  await knex('plants').insert(plants)
};
