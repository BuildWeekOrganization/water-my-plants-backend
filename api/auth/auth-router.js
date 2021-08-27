const router = require('express').Router()
const bcrypt = require('bcryptjs')

const {
  checkUserBody,
  checkLoginBody,
  checkUserUnique,
  checkUserExists,
  checkIDExists,
  restricted,
  only,
  buildToken,
} = require('./auth-middleware')

const Auth = require('./auth-model')

router.post('/register', checkUserBody, checkUserUnique, (req, res, next) => {
  const { username, password, phone_num } = req.body
  const hash = bcrypt.hashSync(password, 8)

  Auth.insertUser({ username, password: hash, phone_num })
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(next)
})

router.post('/login', checkLoginBody, checkUserExists, (req, res, next) => {
  if (bcrypt.compareSync(req.body.password, req.user.password)) {
    const token = buildToken(req.user)
    res.status(200).json({
      user_id: req.user.user_id,
      message: `welcome, ${req.user.username}`,
      token,
    })
  } else {
    next({ status: 401, message: 'invalid credentials' })
  }
})

// admin ONLY - must login as admin to GET users
router.get('/users', restricted, only('admin'), (req, res, next) => {
  Auth.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(next)
})

router.get('/users/:user_id', restricted, only('admin'), checkIDExists, (req, res, next) => {
  const { user_id } = req.params

  Auth.findBy({ user_id })
    .then(user => {
      res.status(200).json(user)
    })
    .catch(next)
})

module.exports = router