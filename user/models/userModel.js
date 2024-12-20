const mongoose = require('mongoose');

const userSchema = new mongoose.Schema9({
    name :{
        type: string,
        required: true
    },
    email :{
        type: string,
        required: true
    },
    password :{
        type: string,
        required: true
    },
});

module.exports = mongoose.model('user', userSchema);