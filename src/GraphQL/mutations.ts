import { gql } from '@apollo/client';

const UPDATE_USER_BY_ID = gql`
  mutation UpdateUserById(
    $searchKey: Int!
    $newName: String!
    $newEmail: String!
    $newAge: Int!
  ) {
    updateUserById(
      input: {
        id: $searchKey
        userPatch: { name: $newName, email: $newEmail, age: $newAge }
      }
    ) {
      user {
        id
        name
        email
        age
        profilepic
      }
    }
  }
`;

const DELETE_USER_BY_ID = gql`
  mutation DeleteUserById($id: Int!) {
    deleteUserById(input: { id: $id }) {
      deletedUserId
    }
  }
`;

const ADD_USER = gql`
  mutation AddUser(
    $name: String!
    $email: String!
    $age: Int!
    $profilepic: String!
  ) {
    createUser(
      input: {
        user: { name: $name, email: $email, age: $age, profilepic: $profilepic }
      }
    ) {
      user {
        id
        name
        email
        age
        profilepic
      }
    }
  }
`;

export { DELETE_USER_BY_ID, UPDATE_USER_BY_ID, ADD_USER };
