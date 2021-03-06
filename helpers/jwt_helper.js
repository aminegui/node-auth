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
verifyAccessToken: (req, res, next)=>{
    if(!req.headers['authorization']) return next(createError.Unauthorized());
    const authInfo = req.headers['authorization'].split(' ');
    const token= authInfo[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, function(err, payload) {
        if(err){
            const message = err.name==='JsonWebTokenError'?'Unauthorized':err.message;
            return next(createError.InternalServerError(message))
        }
        req.payload = payload
        next()
      });
},
verifyRefreshToken: (refreshToken)=>{
    return new Promise((resolve, reject)=>{
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, function(err, payload) {
            if(err){
                const message = err.name==='JsonWebTokenError'?'Unauthorized':err.message;
                return reject(createError.InternalServerError(message))
            }
            const userId=payload.aud;
            return resolve(userId)
            })
          });

}
}