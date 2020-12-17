const mongoose = require('mongoose');
const config = require('congif');


function connectDB(){
mongoose.connect(
    config.get('mongoURI'), 
    { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> console.log('Connected to mongoDB...'))
.catch((err) => {
     console.log(`Could not connect to mongoDB. ERROR: ${err}`);
     process.exit(1);
    });

}



module.exports = connectDB;