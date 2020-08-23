const jwt = require('jsonwebtoken')
const createError = require('http-errors')
require('dotenv').config()


module.exports = jwtManager = {
 signAccessToken: (userId)=>{
     return new Promise((resolve, reject)=>{
         const secret = process.env.ACCESS_TOKEN_KEY;
         const payload = {}
         const options = {
            expiresIn:'1h',
            audience:userId,
            issuer:'google.com'
         }
         jwt.sign(payload, secret, options, function(err, accessToken) {
            if(err) {
                reject (createError.InternalServerError());
                return
            }
          resolve(accessToken)
          });
     })
 },
 signRefreshToken:(userId)=>{
    return new Promise((resolve, reject)=>{
        const secret = process.env.REFRESH_TOKEN_KEY;
        const payload = {}
        const options = {
           expiresIn:'1y',
           audience:userId,
           issuer:'google.com'
        }
        jwt.sign(payload, secret, options, function(err, refreshToken) {
           if(err) {
               reject (createError.InternalServerError());
               return
           }
         resolve(refreshToken)
         });
    })
},
}