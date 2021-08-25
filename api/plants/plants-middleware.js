const db = require('./plants-model')
const Users = require('../users/users-model')

function checkPlantsPayload(req, res, next) {
    const { nickname, species, h2o_frequency, user_id } = req.body

    if (
        nickname === undefined || nickname.trim() === "" ||
        species === undefined || species.trim === "" ||
        h2o_frequency === undefined || h2o_frequency === "" ||
        user_id === undefined | user_id === ""
    ) {
        res.status(400).json({ message: 'plant info required' })
    } else {
        req.user = {
            nickname: nickname.trim(),
            species: nickname.trim(),
            h2o_frequency: h2o_frequency.trim(),
            user_id: user_id
        }
        next()
    }
}

async function checkPlantIdExists(req, res, next) {
    try {
        const plant = await db.getPlantById(req.params.plant_id)
        if (plant !== undefined) {
            req.plant = plant[0]
            next()
        } else {
            next({ status: 401, message: `${req.params.plant_id} doesn't exist` })
        }
    } catch (err) {
        next(err)
    }
}

async function checkPlantNicknameFree (req, res, next) {
    try {
        const plant = await db.getByNickname({ nickname: req.body.nickname })
        if (!plant.length) {
            next()
        } else {
            next({ status: 422, message: 'nickname already exists' })
        }
    } catch (err) {
        next(err)
    }
}

async function checkPlantUserIdExists(req, res, next) {
    try {
        const users = await Users.findByUserId(req.body.user_id)
        if (users !== undefined) {
            req.user = users[0]
            next()
        } else {
            next({ status: 401, message: `${req.body.user_id} doesn't exist`})
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    checkPlantsPayload,
    checkPlantIdExists,
    checkPlantNicknameFree,
    checkPlantUserIdExists,
}