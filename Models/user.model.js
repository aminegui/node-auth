const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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
        required:true
    }
})

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

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
      // remove these props when object is serialized
      delete ret._id;
      delete ret.password;
  }
});


module.exports = User = mongoose.model('user', userSchema)