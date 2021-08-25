const db = require('../data/db-config')

async function findAllUsers() {
  const results = await db('users').select('user_id', 'username')
  return results
}

async function findByUserId(user_id) {
  const [result] = await db('users')
    .select('user_id', 'username', 'phone_num')
    .where('user_id', user_id)
  return result
}

async function findPlantsByUserId(user_id) {
  const results = await db('plants').where('user_id', user_id)
  return results
}

async function updateUser(user_id, changes) {
  const [updated] = await db('users')
    .update(changes, ['user_id', 'username', 'phone_num'])
    .where('user_id', user_id)
  return updated
}

function updateUserPass(user_id, changedPass) {
  return db('users').update(changedPass).where('user_id', user_id)
}

function deleteUser(user_id) {
  return db('users').where('user_id', user_id).del()
}

module.exports = {
    findAllUsers,
    findByUserId,
    findPlantsByUserId,
    updateUser,
    updateUserPass,
    deleteUser,
}