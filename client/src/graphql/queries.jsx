import { gql } from "@apollo/client"

export const GET_USER = gql`
    query GetUser($userPin: Int){
        getUser(userPin: $userPin){
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