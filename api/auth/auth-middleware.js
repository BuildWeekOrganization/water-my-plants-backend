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

const only = username => (req, res, next) => {
  if (username === req.decodedToken.username) {
    next()
  } else {
    next({ status: 403, message: 'access denied' })
  }
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

const checkLoginBody = (req, res, next) => {
  const { username, password } = req.body

  if (!username || !password) {
    next({ status: 422, message: 'username and password required' })
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

const checkIDExists = async (req, res, next) => {
  const { user_id } = req.params
  const existing = await findBy({ user_id })

  if (!existing) {
    next({ status: 404, message: `user with user_id ${user_id} not found` })
  } else {
    next()
  }
}

const buildToken = (user) => {
  const payload = {
    subject: user.user_id,
    username: user.username,
  }
  const options = {
    expiresIn: '1d',
  }
  return jwt.sign(payload, JWT_SECRET, options)
}

module.exports = {
  restricted,
  only,
  checkUserBody,
  checkLoginBody,
  checkUserUnique,
  checkUserExists,
  checkIDExists,
  buildToken
}