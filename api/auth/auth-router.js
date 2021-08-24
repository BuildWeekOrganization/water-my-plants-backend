const router = require('express').Router()
const bcrypt = require('bcryptjs')

const {
  checkUserBody,
  checkLoginBody,
  checkUserUnique,
  checkUserExists,
  restricted,
  only,
  buildToken,
} = require('./auth-middleware')

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

router.post('/login', checkLoginBody, checkUserExists, (req, res, next) => {
  if (bcrypt.compareSync(req.body.password, req.user.password)) {
    const token = buildToken(req.user)
    res.status(200).json({
      message: `welcome, ${req.user.username}`,
      token,
    })
  } else {
    next({ status: 401, message: 'invalid credentials' })
  }
})

module.exports = router