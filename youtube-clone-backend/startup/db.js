const mongoose = require('mongoose');
<<<<<<< HEAD
const config = require('config');
const { connect } = require('mongodb');

function connectDB(){
mongoose.connect(
    config.get('mongoURI'),
    { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => {
    console.log(`Could not connect to MongoDB. ERROR: ${err}`));
    process.exit(1);

});
}

module.exports = connectDB;
=======
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
>>>>>>> 09b0d44c1131e26456e721203e0df6bbc7535b6f
