import { gql } from "@apollo/client";

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

const ALL_BOOKS = gql`
  query ($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
      id
    }
  }
`;
const GET_GENRES = gql`
  query {
    getGenres
  }
`;
const ADD_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
    }
  }
`;
const UPDATE_BIRTH = gql`
  mutation updateBirth($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;
const ME = gql`
  query {
    me {
      favoriteGenre
    }
  }
`;

const RECOMMEND = gql`
  query Query {
    recommend {
      title
      genres
      author {
        name
      }
    }
  }
`;
const BOOK_ADDED = gql`
  subscription {
    bookOnAdded {
      title
      author {
        name
      }
      published
      id
    }
  }
`;

export {
  ALL_AUTHORS,
  ALL_BOOKS,
  ADD_BOOK,
  UPDATE_BIRTH,
  LOGIN_MUTATION,
  GET_GENRES,
  ME,
  BOOK_ADDED,
  RECOMMEND,
};
