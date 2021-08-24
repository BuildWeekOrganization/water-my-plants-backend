const router = require('express').Router()

const {
  checkUserBody,
  checkUserUnique,
  checkUserExists,
  restricted,
  only
} = require('./auth-middleware')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('./secret')

const User = require('./auth-model')

router.post('/register', checkUserBody, checkUserUnique, (req, res, next) => {
  const { username, password, phone_num } = req.body
  const hash = bcrypt.hashSync(password, 8)

  User.insertUser({ username, password: hash, phone_num })
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(next)
})

module.exports = router