const router = require('express').Router()

const { restricted } = require('../auth/auth-middleware')

router.get('/', restricted, (req, res, next) => {

})

router.get('/:user_id', restricted, (req, res, next) => {
  
})

router.get('/:user_id/plants', restricted, (req, res, next) => {
  
})

router.put('/:user_id', restricted, (req, res, next) => {
  
})

router.delete('/:user_id', restricted, (req, res, next) => {
  
})

module.exports = router