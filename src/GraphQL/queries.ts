import { gql } from '@apollo/client';

const GET_USER_BY_ID = gql`
  query GetUserById($searchKey: Int!) {
    userById(id: $searchKey) {
      id
      name
      email
      age
      profilepic
    }
  }
`;

const GET_USERS = gql`
  query {
    allUsers(orderBy: ID_DESC) {
      nodes {
        id
        name
        email
        age
      }
    }
  }
`;

export { GET_USER_BY_ID, GET_USERS };
