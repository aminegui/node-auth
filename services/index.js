const User = require('../Models/user.model');
const userService = require('../services/user.services');



module.exports = userService(User)