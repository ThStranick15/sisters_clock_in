const { gql } = require('apollo-server-express')

// Construct a schema, using GraphQL schema language

const typeDefs = gql`
    type User {
        pin: Int
        name: String
    }

    type Query {
        getUser(pin: String!): User
        getUsers: [User]
    }

    type Mutation {
        createUser(pin: Int!, name: String!): User
    }
`

module.exports = typeDefs