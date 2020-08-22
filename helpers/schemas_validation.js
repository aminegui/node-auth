const Joi = require('joi')

const userSchemaValidation = Joi.object({
    name : Joi.string().required().min(3).max(30),
    email: Joi.string().lowercase().email().required(),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8).max(16)
})

module.exports = {userSchemaValidation}