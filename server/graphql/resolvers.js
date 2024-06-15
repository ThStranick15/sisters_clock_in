const User = require('../models/User')

const resolvers = {
    Query:{
        async getUser(_, {pin}){
            const user = await User.findOne({pin: pin})
            return user
        },

        async getUsers(){
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

        // async signInUser(_, {pin}){
        //     const user = await User.findOne({pin: pin})

        // },

        // async signOutUser(_, {pin}){
        //     const user = await User.findOne({pin: pin})
        // }

    }
}

module.exports = resolvers