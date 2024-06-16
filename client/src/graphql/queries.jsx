import { gql } from "@apollo/client"

export const GET_USER = gql`
    query GetUser($pin: Int!){
        getUser(pin: $pin){
            pin
            name
        }
    }
`

export const GET_ALL_USERS = gql`
    query GetAllUsers{
        getAllUsers{
            pin
            name
        }
    }
`