const db = require('../data/db-config')

function find() {
  return db('users')
}

async function findBy(filter) {
  const [result] = await db('users').where(filter)
  return result
}

async function insertUser(user) {
  // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
  // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
  // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
  const [newUser] = await db('users').insert(user, ['user_id', 'username', 'phone_num'])
  return newUser // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
}

module.exports = {
  find,
  findBy,
  insertUser,
}