const { gql } = require('apollo-server-express')

// Construct a schema, using GraphQL schema language

const typeDefs = gql`
    type User {
        pin: Int
        name: String
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