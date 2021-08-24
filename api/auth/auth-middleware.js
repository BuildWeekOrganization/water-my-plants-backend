const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('./secret')

const { findBy } = require('./auth-model')

const restricted = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    next({ status: 401, message: 'token required' })
  }

  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if (err) {
      next({ status: 401, message: 'token invalid' })
    } else {
      req.decodedToken = decodedToken
      next()
    }
  })
}

const checkUserBody = (req, res, next) => {
  const { username, password, phone_num } = req.body

  if (
    !username
    || typeof username !== 'string'
    || username === ''
    || username.length < 3
  ) {
    next({
      status: 422,
      message: 'username is required and must be more than 3 characters'
    })
  } else if (
    !password
    || typeof password !== 'string'
    || password === ''
    || password.length < 3
  ) {
    next({
      status: 422,
      message: 'password is required and must be more than 3 characters'
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

const checkUserUnique = async (req, res, next) => {
  const { username } = req.body
  const existing = await findBy({ username })

  if (existing) {
    next({ status: 422, message: 'username taken' })
  } else {
    next()
  }
}

const checkUserExists = async (req, res, next) => {
  const { username } = req.body
  const existing = await findBy({ username })

  if (!existing) {
    next({ status: 401, message: 'invalid credentials' })
  } else {
    req.user = existing
    next()
  }
}

module.exports = {
  restricted,
  checkUserBody,
  checkUserUnique,
  checkUserExists,
}