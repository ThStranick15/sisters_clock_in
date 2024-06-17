import { gql } from "@apollo/client"

export const CREATE_USER = gql`
    mutation CreateUser($pin: Int!, $name: String!){
        createUser(pin: $pin, name: $name){
            pin
            name
        }
    }
`

export const SIGN_IN_USER = gql`
    mutation signInUser($pin: Int!){
        signInUser(pin: $pin){
            pin
            name
        }
    }
`

export const SIGN_OUT_USER = gql`
    mutation signOutUser($pin: Int!, $description: String!){
        signOutUser(pin: $pin, description: $description){
            pin
            name
        }
    }
`