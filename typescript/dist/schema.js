export const typeDefs = `#graphql  
  type Author {
    id: ID!
    firstName: String!
    lastName: String!
  }
    
  type Book {
    id: ID!
    title: String!
    genre: String!
    publishedDate: String!
    author: String!
  }
  
  type Query {
    book(id: ID): Book!
    books: [Book!]
    author(id: ID): Author!
    authors: [Author!]
  }

  type Mutation {
    addAuthor(firstName: String, lastName: String): Author
    updateAuthor(id: ID, firstName: String, lastName: String): Author
    deleteAuthor(id: ID): Author
    addBook(title: String, genre: String, publishedDate: String, authorId: ID): Book
    updateBook(id: ID, title: String, genre: String, publishedDate: String, authorId: ID): Book
    deleteBook(id: ID): Book
  }
`;
