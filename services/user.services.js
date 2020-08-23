const {userSchemaValidation} = require('../helpers/schemas_validation')
const createError = require('http-errors')
const jwtManager = require('../helpers/jwt_helper')

const createUser = User => async reqBody=>{
    const ValidCredentials = await userSchemaValidation.validateAsync(reqBody)
    const userExist = await User.findOne({email: ValidCredentials.email})
    if(userExist) throw createError.Conflict(`${ValidCredentials.email} is already used`)
    const newUser = new User(ValidCredentials)
    const savedUser = await newUser.save()
    const accessToken = await jwtManager.signAccessToken(savedUser.id)
    const refreshToken = await jwtManager.signRefreshToken(savedUser.id)

    return({accessToken, refreshToken})
}

const getUsers = User => async()=> await User.find({})

const getUser = User=>async (userId)=> await User.findById(userId)

module.exports = User => { 
return {
    createUser: createUser(User),
    getUsers: getUsers(User),
    getUser: getUser(User)
}}