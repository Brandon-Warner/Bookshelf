import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`;
const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
        title
        published
        author {
            name
        }
        genres
        id
    }
`;

export const ALL_BOOKS = gql`
    query {
        allBooks {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`;

export const NEW_BOOK = gql`
    mutation newBook($title: String!, $author: String!, $published: Int!, $genres: [String!]) {
        addBook(title: $title, author: $author, published: $published, genres: $genres) {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`;

export const ADD_BORN = gql`
    mutation addBorn($name: String!, $born: Int!) {
        editAuthor(name: $name, setBornTo: $born) {
            name
            born
        }
    }
`;

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`;

export const ME = gql`
    query {
        me {
            username
            favoriteGenre
        }
    }
`;

export const FAV_GENRE_BOOK = gql`
    query favGenreBook($genre: String) {
        allBooks(genre: $genre) {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`;

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`;

export const CREATE_USER = gql`
    mutation createUser($username: String!, $password: String!, $favoriteGenre: String!){
        createUser(username: $username, password: $password,  favoriteGenre: $favoriteGenre){
            username
            password
            favoriteGenre
        }
    }
`;
