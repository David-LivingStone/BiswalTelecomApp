const express = require('express');
const morgan = require('morgan');
const siteRouter = require('./routers/siteRouter')
const categoriesRouter = require('./routers/categoriesRouter')
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const spareReturnRouter = require('./routers/spareReturnRouter')
const spareRouter = require('./routers/spareRouter');
const userRouter = require('./routers/userRouter')
const ppmRouter = require('./routers/ppmRouter')



const app = express();




// Check the Environment in console
console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV ==='development'){
    app.use(morgan('dev'));
}


//Testing our Middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    //console.log(req.headers)
    next();
});

//Middleware for Post Request
app.use(express.json());


//Mount All Routers
app.use('/api/v1/site', siteRouter)
app.use('/api/v1', categoriesRouter)
app.use('/api/v1/spare', spareRouter)
app.use('/api/v1/return', spareReturnRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/ppm', ppmRouter)


// ROUTER MIDDLEWARE
app.all('*', (req, res, next) => {
    next(new AppError(`Can not find ${req.originalUrl} on this server!`))
});


module.exports = app;

