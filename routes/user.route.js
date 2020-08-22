const express = require('express')
const router = express.Router()
const User = require('../Models/user.model')
const {userSchemaValidation} = require('../helpers/schemas_validation')
const createError = require('http-errors')

//register new user
router.post('/register', async (req, res, next)=>{
   try {
       const ValidCredentials = await userSchemaValidation.validateAsync(req.body)
       const userExist = await User.findOne({email: ValidCredentials.email})
       if(userExist) throw createError.Conflict(`${ValidCredentials.email} is allready used`)
       const newUser = new User(ValidCredentials)
       const savedUser = await newUser.save()
       res.send(savedUser)
       
   } catch (error) {
        if(error.isJoi===true){
            error.status=422;
            next(error)
            }
            next(error)
       }
   
})

//return list of all users
router.get('/users', async (req, res, next)=>{
    try {
        
    } catch (error) {
        
    }
})

//find user by his id
router.get('/:userId', async (req, res, next)=>{
    try {
        
    } catch (error) {
        
    }
})


module.exports = router

