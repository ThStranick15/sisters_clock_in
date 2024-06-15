const {model,Schema} = require('mongoose')

const logSchema = new Schema({
    description:{
        type: String
    },
    hours:{
        type: Number
    }
})

const userSchema = new Schema({
    pin:{
        type: Number,
        required: true,
        unique: true,
        min:[4,'PIN must be 4 numbers'],
        max:[4,'PIN must be 4 numbers']
    },
    name:{
        type: String,
        required: true
    },
    logs: [logSchema],
    timeIn:{
        type: Date
    },
    timeOut:{
        type: Date
    }
})

const User = model('User', userSchema)

module.exports = User