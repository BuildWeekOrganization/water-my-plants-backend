const router = require('express').Router()
const bcrypt = require('bcryptjs')

const { 
  restricted,
  checkIDExists,
} = require('../auth/auth-middleware')

const {
  checkUpdatedUserBody,
  checkUpdatedUserUnique,
  checkUpdatedPass
} = require('./users-middleware')

const User = require('./users-model')

router.get('/', restricted, (req, res, next) => {
  User.findAllUsers()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(next)
})

router.get('/:user_id', restricted, checkIDExists, (req, res, next) => {
  User.findByUserId(req.params.user_id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(next)
})

router.get('/:user_id/plants', restricted, checkIDExists, (req, res, next) => {
  User.findPlantsByUserId(req.params.user_id)
    .then(plants => {
      res.status(200).json(plants)
    })
    .catch(next)
})

router.put('/:user_id', restricted, checkIDExists, checkUpdatedUserBody, checkUpdatedUserUnique, (req, res, next) => {
  User.updateUser(req.params.user_id, req.body)
    .then(updated => {
      res.status(200).json(updated)
    })
    .catch(next)
})

router.put('/:user_id/updatepass', restricted, checkIDExists, checkUpdatedPass, (req, res, next) => {
  const { password } = req.body
  const hash = bcrypt.hashSync(password, 8)

  User.updateUserPass(req.params.user_id, { password: hash })
    .then(() => {
      res.status(200).json({
        message: `password successfully changed`
      })
    })
    .catch(next)
})

router.delete('/:user_id', restricted, checkIDExists, (req, res, next) => {
  User.deleteUser(req.params.user_id)
    .then(() => {
      res.status(200).json({
        message: `user with user_id ${req.params.user_id} successfully deleted`
      })
    })
    .catch(next)
})

module.exports = router