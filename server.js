const dotenv = require('dotenv');
const mongoose = require('mongoose');



//Read all Variable from all File and Save to Nodejs
dotenv.config({path: '.env'});


mongoose.connect("mongodb+srv://david:6t3QcPpyUp6vG2Kt@biswalapp.qredw6o.mongodb.net/?retryWrites=true&w=majority" , {}).then(con => {
    console.log('DB connection Successful!');
});

const app = require('./app');
const port = process.env.PORT
app.listen(port, () => {
    console.log(`App is runing on port ${port}...`);
}); 