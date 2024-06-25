const express = require('express') //Node.js framework
const app = express()
const db = require('./config/connection') //connection to mongoose/mongoDB

const PORT = process.env.PORT || 3600

const { ApolloServer } = require('apollo-server-express')

//pull resolvers & typeDefs
const typeDefs = require('./graphql/typeDefs')
const resolvers = require ('./graphql/resolvers')

//const job = require('./utils/schedule') //job to check at midnight whether users have signed out or not

async function startServer(){
    const server = new ApolloServer({typeDefs, resolvers}) //create Apollo server
    await server.start() //must call start before applying express

    server.applyMiddleware({app}) //attatches express to apollo

    app.listen(PORT,() => {
        console.log(`🚀 Express Server ready at`, PORT)
        console.log('GraphQL ready at', server.graphqlPath)
    })
}

startServer()