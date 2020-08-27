const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const toJSON = require('./toJSON.plugin')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        lowercase:true,
        unique:true
    },
    password: {
        type: String,
        required:true,
        private: true
    }
})
userSchema.plugin(toJSON)
userSchema.pre('save', async function(next){
    try {
        if (this.isNew) {
          const salt = await bcrypt.genSalt(10)
          const hashedPassword = await bcrypt.hash(this.password, salt)
          this.password = hashedPassword
        }
        next()
      } catch (error) {
        next(error)
      }
})



module.exports = User = mongoose.model('user', userSchema)