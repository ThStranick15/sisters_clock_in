const { gql } = require('apollo-server-express')

// Construct a schema, using GraphQL schema language

const typeDefs = gql`
    scalar Date

    type Log{
        date: String
        description: String
        hours: Float
    }

    type User {
        pin: Int
        name: String
        logs: [Log]
        timeIn: Date
        timeOut: Date
    }

    type Query {
        getUser(pin: Int!): User
        getUsers: [User]
    }

    type Mutation {
        createUser(pin: Int!, name: String!): User
        signInUser(pin: Int!): User
        signOutUser(pin: Int!, description: String!): User
    }
`

module.exports = typeDefs