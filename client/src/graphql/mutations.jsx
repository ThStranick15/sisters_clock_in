import { gql } from "@apollo/client"

export const CREATE_USER = gql`
    mutation CreateUser($pin: Int!, $name: String!){
        createUser(pin: $pin, name: $name){
            pin
            name
        }
    }
`