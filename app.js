const express = require('express');
const app = express();
const morgan =require('morgan');
const helmet = require('helmet');
const createError = require('http-errors');
const cors = require('cors');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const swaggerUi=require('swagger-ui-express');

require('./helpers/mongodb_init')
require('dotenv').config()

//logs the request info
app.use(morgan('dev'))
//protect the request info
app.use(helmet())
//parse json request body
app.use(express.json())
//cors enable
app.use(cors())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/api/user', require('./routes/user.route'))

//send back a 404 error for any unknown api request
app.use(async (req, res, next)=>{
    next(createError.NotFound())
})
// handel the error
app.use((err, req, res , next)=>{
res.status(err.status || 500)
res.send({
    error:{
        status: err.status || 500,
        message: err.message
    }
})
})

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}` )
})