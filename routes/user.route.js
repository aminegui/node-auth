const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const jwtManager = require('../helpers/jwt_helper')

//register new user
router.post('/register', userController.register )

//return list of all users
router.get('/users', userController.getUsers)

//find user by his id
router.get('/:userId', userController.getUser)


module.exports = router

