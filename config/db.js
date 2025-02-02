const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

 const connectDB = async () => {
    try {
        await mongoose.connect(db , {useNewUrlParser:true});
        console.log('Database Connected Successfully');
    } catch (err) {
        console.log('Failed To Connect');
        proccess.exit(1)
    }
}

module.exports = connectDB;

