const {model,Schema} = require('mongoose')

const logSchema = new Schema({
    description:{
        type: String,
        required: true
    },
    hours:{
        type: Number,
        required: true
    }
})

const userSchema = new Schema({
    pin:{
        type: Number,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    logs: [logSchema],
    timeIn:{
        type: Date,
        required: true
    },
    timeOut:{
        type: Date,
        required: true
    }
})

const User = model('User', userSchema)

module.exports = User