import {gql} from '@apollo/client';

export const CREATE_USER = gql `
    mutation CreateUser($userInfo: CreateUserInput!, $personInfo: CreatePersonInput!) {
        createUser(
            userInfo: $userInfo
            personInfo: $personInfo
        ) {
            person {
                _id
                username
                hemisphere
                island_title
            }
        }
    }
`;

export const LOG_IN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            person {
                _id
                username
                island_title
                hemisphere
                email
            }
        }
    }
`;

export const MARK_ITEM = gql`
    mutation MarkItem($userId: String!, $internalId: Int!) {
        markItem(userId: $userId, internalId: $internalId)
    }
`

export const UNMARK_ITEM = gql`
    mutation UnmarkItem($userId: String!, $internalId: Int!) {
        unmarkItem(userId: $userId, internalId: $internalId)
    }
`