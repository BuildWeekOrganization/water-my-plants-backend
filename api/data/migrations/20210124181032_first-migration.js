exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('username', 200).notNullable().unique()
      users.string('password', 200).notNullable()
      users.string('phone_num', 16).notNullable()
      users.timestamps(false, true)
    })

    .createTable('plants', (plants) => {
      plants.increments('plant_id')
      plants.string('nickname', 200).notNullable().unique()
      plants.string('species', 200).notNullable()
      plants.integer('h2o_frequency').notNullable()
      plants.string('image', 500)
      plants.integer('user_id')
        .unsigned()
        .notNullable()
        .references('user_id').inTable('users')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT')
    })
}

exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists('plants')
    .dropTableIfExists('users')
}
