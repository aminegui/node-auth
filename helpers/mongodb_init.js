const mongoose = require('mongoose')
require('dotenv').config()


mongoose.connect(process.env.DB_URL, {
    dbName:process.env.DB_NAME,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then(()=>{console.log('mongodb is connected')})
.catch(err=>console.log(err))


mongoose.connection.on('connected', ()=>{
    console.log('mongoose is connected to data base')
})
mongoose.connection.on('error', err=>{
    console.log(err)
})
mongoose.connection.on('disconnected', () => {
    console.log('mongoose is disconnected');
  });
process.on('SIGINT', async ()=>{
    await mongoose.connection.close()
    process.exit(0)
})