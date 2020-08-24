const userService = require('../services')

module.exports = userController = {
    register : async (req, res, next)=>{
        try {
          const tokens = await userService.createUser(req.body)
          res.send(tokens)
        } catch (error) {
             if(error.isJoi===true){
                 error.status=422;
                 next(error)
                 }
                 next(error)
            }
        
     },
    getUsers : async(req, res, next)=>{
        try {
            const usersList = await userService.getUsers()
            res.send(usersList)
        } catch (error) {
            next(error)
        }
     },
    getUser: async(req, res, next)=>{
        try {
            const userById= await userService.getUser(req.params.userId)
            res.send(userById)
        } catch (error) {
            next(error)
        }
    }

}
