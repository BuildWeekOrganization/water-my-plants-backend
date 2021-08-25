const { findBy } = require('../auth/auth-model')

const checkUpdatedUserBody = (req, res, next) => {
  const { username, password, phone_num } = req.body

  if (password) {
    next({ status: 422, message: 'password cannot be updated here' })
  } else if (
    !username
    || typeof username !== 'string'
    || username === ''
    || username.length < 3
  ) {
    next({
      status: 422,
      message: 'username must be more than 3 characters'
    })
  } else if (
    !phone_num
    || typeof phone_num !== 'string'
    || phone_num === ''
    || phone_num.length < 8
    || phone_num.length > 16
  ) {
    next({
      status: 422,
      message: 'a valid phone number is required'
    }) 
  } else {
    next()
  }
}

const checkUpdatedUserUnique = async (req, res, next) => {
  const { user_id } = req.params
  const existing = await findBy({ user_id })

  if (req.body.username === existing.username) {
    next()
  } else {
    const { username } = req.body
    const existingUsername = await findBy({ username })

    if (existingUsername) {
      next({ status: 422, message: 'username taken' })
    } else {
      next()
    }
  }
}

const checkUpdatedPass = (req, res, next) => {
  const { password } = req.body

  if (
    !password
    || typeof password !== 'string'
    || password === ''
    || password.length < 3
  ) {
    next({
      status: 422,
      message: 'password must be more than 3 characters'
    }) 
  } else {
    next()
  }
}

module.exports = {
  checkUpdatedUserBody,
  checkUpdatedUserUnique,
  checkUpdatedPass
}