const User = require('../models/User')
const {GraphQLDateTime} = require('graphql-scalars')

const resolvers = {
    Date: GraphQLDateTime,
    Query:{
        async getUser(_, {pin}){
            const user = await User.findOne({pin: pin})
            return user
        },

        async getAllUsers(){
            const users = await User.find()
            return users
        }
    },
    Mutation:{
        async createUser(_,{pin, name}){
            console.log("backend:",parseInt(pin),name)

            const newUser = await User.create({
                pin: parseInt(pin),
                name: name
            })

            return newUser
        },

        async signInUser(_, {pin}){
            const user = await User.findOne({pin: pin})
            user.timeIn = new Date()
            await user.save()
        },

        async signOutUser(_, {pin, description}){
            const user = await User.findOne({pin: pin})
            user.timeOut = new Date()
            const diff = user.timeOut - user.timeIn
            const hours = diff / (1000 * 60 * 60)
            user.logs.push({
                date: user.timeIn.toDateString(),
                description: description,
                hours: hours
            })
            await user.save()
        }

    }
}

module.exports = resolvers