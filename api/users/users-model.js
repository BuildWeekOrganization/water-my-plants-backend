const db = require('../data/db-config')

async function findAllUsers() {
    let results = await db('users')
    return results
}

module.exports = {
    findAllUsers,
}