const {model,Schema} = require('mongoose')

const logSchema = new Schema({
    date:{
        type: String
    },
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
        validate:{
            validator: function(value){
                return /^[0-9]{4}$/.test(value.toString());
            },
            message: props => `${props.value} is not 4 numbers.`
        }
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