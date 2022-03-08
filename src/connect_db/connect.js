const mongoose = require("mongoose");

const connect = async() => {
    try{
        await mongoose.connect('mongodb://localhost:27017/wpr-quiz', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connect successfully!!!');
    }catch(err){
        console.log('Connect failure!!!');
    }
}

module.exports = {connect};